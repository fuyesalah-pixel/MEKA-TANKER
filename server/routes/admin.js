import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { query } from '../db.js';
import { signToken, requireAdmin } from '../auth.js';
import { productOut } from './public.js';

export const router = Router();

router.post('/login', async (req, res, next) => {
  try {
    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = String(req.body?.password || '');
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });

    const { rows } = await query('SELECT * FROM admins WHERE email = $1', [email]);
    const admin = rows[0];
    if (!admin) return res.status(401).json({ error: 'Invalid email or password.' });

    const ok = await bcrypt.compare(password, admin.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid email or password.' });

    res.json({ token: signToken(admin), admin: { id: admin.id, name: admin.name, email: admin.email } });
  } catch (err) {
    next(err);
  }
});

router.use(requireAdmin);

router.get('/me', (req, res) => res.json({ admin: req.admin }));

router.get('/stats', async (_req, res, next) => {
  try {
    const [{ rows: totals }, { rows: byCategory }, { rows: recentOrders }, { rows: recentMessages }, { rows: trend }] =
      await Promise.all([
        query(`SELECT
          (SELECT COUNT(*)::int FROM products) AS products,
          (SELECT COUNT(*)::int FROM orders) AS orders,
          (SELECT COUNT(*)::int FROM orders WHERE status = 'new') AS new_orders,
          (SELECT COUNT(*)::int FROM messages) AS messages,
          (SELECT COUNT(*)::int FROM messages WHERE status = 'new') AS new_messages,
          (SELECT COUNT(*)::int FROM subscribers) AS subscribers,
          (SELECT COUNT(*)::int FROM products WHERE is_active = FALSE) AS hidden_products`),
        query(`SELECT category_slug AS category, COUNT(*)::int AS count FROM products GROUP BY category_slug`),
        query('SELECT * FROM orders ORDER BY created_at DESC LIMIT 6'),
        query('SELECT * FROM messages ORDER BY created_at DESC LIMIT 6'),
        query(`SELECT TO_CHAR(d.day, 'Dy') AS label, COALESCE(o.total, 0)::int AS value
               FROM generate_series(CURRENT_DATE - INTERVAL '6 days', CURRENT_DATE, INTERVAL '1 day') AS d(day)
               LEFT JOIN (
                 SELECT DATE_TRUNC('day', created_at) AS day, COUNT(*) AS total
                 FROM orders WHERE created_at >= CURRENT_DATE - INTERVAL '6 days'
                 GROUP BY 1
               ) o ON o.day = d.day
               ORDER BY d.day`),
      ]);

    res.json({
      totals: totals[0],
      byCategory,
      trend,
      recentOrders: recentOrders.map(orderOut),
      recentMessages: recentMessages.map(messageOut),
    });
  } catch (err) {
    next(err);
  }
});

export const orderOut = (r) => ({
  id: r.id,
  reference: r.reference,
  customerName: r.customer_name,
  phone: r.phone,
  email: r.email,
  address: r.address,
  productId: r.product_id,
  productName: r.product_name,
  category: r.category_slug,
  capacity: r.capacity_l,
  quantity: r.quantity,
  notes: r.notes,
  status: r.status,
  createdAt: r.created_at,
});

export const messageOut = (r) => ({
  id: r.id,
  name: r.name,
  phone: r.phone,
  email: r.email,
  subject: r.subject,
  message: r.message,
  status: r.status,
  createdAt: r.created_at,
});

/* ------------------------------ generic CRUD ------------------------------ */

const productFields = [
  'category_slug', 'slug', 'name_en', 'name_am', 'capacity_l', 'price_etb', 'description_en',
  'description_am', 'features_en', 'features_am', 'image', 'gallery', 'badge_en', 'badge_am',
  'in_stock', 'featured', 'is_active', 'sort_order',
];
const jsonFields = new Set(['features_en', 'features_am', 'gallery']);

function buildInsert(table, fields, body) {
  const cols = [];
  const values = [];

  for (const field of fields) {
    if (body[field] === undefined) continue;
    cols.push(field);
    values.push(jsonFields.has(field) ? JSON.stringify(body[field] ?? []) : body[field]);
  }
  const placeholders = cols.map((c, i) => (jsonFields.has(c) ? `$${i + 1}::jsonb` : `$${i + 1}`));
  return {
    text: `INSERT INTO ${table} (${cols.join(',')}) VALUES (${placeholders.join(',')}) RETURNING *`,
    values,
  };
}

function buildUpdate(table, fields, body, id, touch = false) {
  const sets = [];
  const values = [];
  for (const field of fields) {
    if (body[field] === undefined) continue;
    values.push(jsonFields.has(field) ? JSON.stringify(body[field] ?? []) : body[field]);
    sets.push(`${field} = $${values.length}${jsonFields.has(field) ? '::jsonb' : ''}`);
  }
  if (!sets.length) return null;
  if (touch) sets.push('updated_at = NOW()');
  values.push(id);
  return {
    text: `UPDATE ${table} SET ${sets.join(', ')} WHERE id = $${values.length} RETURNING *`,
    values,
  };
}

function crud(table, fields, { order = 'id DESC', mapper = (r) => r, touch = false } = {}) {
  const api = Router();

  api.get('/', async (_req, res, next) => {
    try {
      const { rows } = await query(`SELECT * FROM ${table} ORDER BY ${order}`);
      res.json(rows.map(mapper));
    } catch (err) {
      next(err);
    }
  });

  api.post('/', async (req, res, next) => {
    try {
      const { text, values } = buildInsert(table, fields, req.body || {});
      if (!values.length) return res.status(400).json({ error: 'Nothing to save.' });
      const { rows } = await query(text, values);
      res.status(201).json(mapper(rows[0]));
    } catch (err) {
      next(err);
    }
  });

  api.put('/:id', async (req, res, next) => {
    try {
      const statement = buildUpdate(table, fields, req.body || {}, Number(req.params.id), touch);
      if (!statement) return res.status(400).json({ error: 'Nothing to update.' });
      const { rows } = await query(statement.text, statement.values);
      if (!rows.length) return res.status(404).json({ error: 'Not found' });
      res.json(mapper(rows[0]));
    } catch (err) {
      next(err);
    }
  });

  api.delete('/:id', async (req, res, next) => {
    try {
      const { rowCount } = await query(`DELETE FROM ${table} WHERE id = $1`, [Number(req.params.id)]);
      if (!rowCount) return res.status(404).json({ error: 'Not found' });
      res.json({ ok: true });
    } catch (err) {
      next(err);
    }
  });

  return api;
}

router.use(
  '/products',
  crud('products', productFields, {
    order: 'sort_order ASC, id ASC',
    mapper: productOut,
    touch: true,
  })
);

router.use(
  '/orders',
  crud('orders', ['customer_name', 'phone', 'email', 'address', 'status', 'notes', 'quantity'], {
    order: 'created_at DESC',
    mapper: orderOut,
  })
);

router.use(
  '/messages',
  crud('messages', ['name', 'phone', 'email', 'subject', 'message', 'status'], {
    order: 'created_at DESC',
    mapper: messageOut,
  })
);

router.use(
  '/subscribers',
  crud('subscribers', ['email', 'is_active'], { order: 'created_at DESC' })
);

router.use(
  '/testimonials',
  crud(
    'testimonials',
    ['name', 'location', 'quote_en', 'quote_am', 'avatar', 'rating', 'is_active', 'sort_order'],
    { order: 'sort_order ASC, id ASC' }
  )
);

router.use(
  '/faqs',
  crud('faqs', ['question_en', 'question_am', 'answer_en', 'answer_am', 'is_active', 'sort_order'], {
    order: 'sort_order ASC, id ASC',
  })
);

router.use(
  '/partners',
  crud('partners', ['name', 'logo', 'url', 'is_active', 'sort_order'], {
    order: 'sort_order ASC, id ASC',
  })
);

router.get('/settings', async (_req, res, next) => {
  try {
    const { rows } = await query('SELECT key, value FROM settings');
    const out = {};
    for (const row of rows) out[row.key] = row.value;
    res.json(out);
  } catch (err) {
    next(err);
  }
});

router.put('/settings/:key', async (req, res, next) => {
  try {
    const { rows } = await query(
      `INSERT INTO settings (key, value) VALUES ($1, $2::jsonb)
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value RETURNING key, value`,
      [req.params.key, JSON.stringify(req.body?.value ?? {})]
    );
    res.json({ key: rows[0].key, value: rows[0].value });
  } catch (err) {
    next(err);
  }
});
