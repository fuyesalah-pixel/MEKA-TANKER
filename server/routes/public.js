import { Router } from 'express';
import { query } from '../db.js';

export const router = Router();

export const productOut = (r) => ({
  id: r.id,
  slug: r.slug,
  category: r.category_slug,
  nameEn: r.name_en,
  nameAm: r.name_am,
  capacity: r.capacity_l,
  price: Number(r.price_etb),
  descriptionEn: r.description_en,
  descriptionAm: r.description_am,
  featuresEn: r.features_en || [],
  featuresAm: r.features_am || [],
  image: r.image,
  gallery: r.gallery || [],
  badgeEn: r.badge_en,
  badgeAm: r.badge_am,
  inStock: r.in_stock,
  featured: r.featured,
  isActive: r.is_active,
  sortOrder: r.sort_order,
});

export const categoryOut = (r) => ({
  id: r.id,
  slug: r.slug,
  nameEn: r.name_en,
  nameAm: r.name_am,
  taglineEn: r.tagline_en,
  taglineAm: r.tagline_am,
  image: r.image,
  sortOrder: r.sort_order,
});

router.get('/health', async (_req, res) => {
  try {
    await query('SELECT 1');
    res.json({ ok: true, database: 'connected' });
  } catch (err) {
    res.status(503).json({ ok: false, error: err.message });
  }
});

router.get('/categories', async (_req, res, next) => {
  try {
    const { rows } = await query('SELECT * FROM categories ORDER BY sort_order, id');
    res.json(rows.map(categoryOut));
  } catch (err) {
    next(err);
  }
});

router.get('/products', async (req, res, next) => {
  try {
    const { category, q, featured } = req.query;
    const clauses = ['is_active = TRUE'];
    const params = [];
    if (category && category !== 'all') {
      params.push(category);
      clauses.push(`category_slug = $${params.length}`);
    }
    if (featured === 'true') clauses.push('featured = TRUE');
    if (q) {
      params.push(`%${String(q).toLowerCase()}%`);
      clauses.push(
        `(LOWER(name_en) LIKE $${params.length} OR LOWER(name_am) LIKE $${params.length} OR LOWER(slug) LIKE $${params.length})`
      );
    }
    const { rows } = await query(
      `SELECT * FROM products WHERE ${clauses.join(' AND ')} ORDER BY sort_order, id`,
      params
    );
    res.json(rows.map(productOut));
  } catch (err) {
    next(err);
  }
});

router.get('/products/:slug', async (req, res, next) => {
  try {
    const { rows } = await query('SELECT * FROM products WHERE slug = $1 AND is_active = TRUE', [
      req.params.slug,
    ]);
    if (!rows.length) return res.status(404).json({ error: 'Product not found' });
    res.json(productOut(rows[0]));
  } catch (err) {
    next(err);
  }
});

router.get('/testimonials', async (_req, res, next) => {
  try {
    const { rows } = await query(
      'SELECT * FROM testimonials WHERE is_active = TRUE ORDER BY sort_order, id'
    );
    res.json(
      rows.map((r) => ({
        id: r.id,
        name: r.name,
        location: r.location,
        quoteEn: r.quote_en,
        quoteAm: r.quote_am,
        avatar: r.avatar,
        rating: r.rating,
      }))
    );
  } catch (err) {
    next(err);
  }
});

router.get('/faqs', async (_req, res, next) => {
  try {
    const { rows } = await query('SELECT * FROM faqs WHERE is_active = TRUE ORDER BY sort_order, id');
    res.json(rows.map((r) => ({ id: r.id, questionEn: r.question_en, questionAm: r.question_am, answerEn: r.answer_en, answerAm: r.answer_am })));
  } catch (err) {
    next(err);
  }
});

router.get('/partners', async (_req, res, next) => {
  try {
    const { rows } = await query('SELECT * FROM partners WHERE is_active = TRUE ORDER BY sort_order, id');
    res.json(rows.map((r) => ({ id: r.id, name: r.name, logo: r.logo, url: r.url })));
  } catch (err) {
    next(err);
  }
});

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

function clean(value, max = 2000) {
  return String(value ?? '').trim().slice(0, max);
}

router.post('/orders', async (req, res, next) => {
  try {
    const body = req.body || {};
    const customerName = clean(body.customerName, 120);
    const phone = clean(body.phone, 40);
    if (customerName.length < 2) return res.status(400).json({ error: 'Please provide your full name.' });
    if (phone.replace(/\D/g, '').length < 9) {
      return res.status(400).json({ error: 'Please provide a valid phone number.' });
    }

    let product = null;
    if (body.productId) {
      const { rows } = await query('SELECT * FROM products WHERE id = $1', [Number(body.productId)]);
      product = rows[0] || null;
    }

    const reference = `MKT-${Date.now().toString(36).toUpperCase()}`;
    const quantity = Math.max(1, Math.min(999, Number(body.quantity) || 1));

    const { rows } = await query(
      `INSERT INTO orders
        (reference, customer_name, phone, email, address, product_id, product_name, category_slug, capacity_l, quantity, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       RETURNING reference, created_at`,
      [
        reference,
        customerName,
        phone,
        clean(body.email, 160),
        clean(body.address, 240),
        product ? product.id : null,
        product ? product.name_en : clean(body.productName, 160),
        product ? product.category_slug : clean(body.category, 60),
        product ? product.capacity_l : Number(body.capacity) || null,
        quantity,
        clean(body.notes, 1200),
      ]
    );

    res.status(201).json({ reference: rows[0].reference, createdAt: rows[0].created_at });
  } catch (err) {
    next(err);
  }
});

router.post('/contact', async (req, res, next) => {
  try {
    const body = req.body || {};
    const name = clean(body.name, 120);
    const message = clean(body.message, 4000);
    if (name.length < 2) return res.status(400).json({ error: 'Please provide your name.' });
    if (message.length < 5) return res.status(400).json({ error: 'Please write a short message.' });

    await query(
      'INSERT INTO messages (name, phone, email, subject, message) VALUES ($1,$2,$3,$4,$5)',
      [name, clean(body.phone, 40), clean(body.email, 160), clean(body.subject, 120) || 'General enquiry', message]
    );
    res.status(201).json({ ok: true });
  } catch (err) {
    next(err);
  }
});

router.post('/subscribe', async (req, res, next) => {
  try {
    const email = clean(req.body?.email, 160).toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }
    await query(
      'INSERT INTO subscribers (email) VALUES ($1) ON CONFLICT (email) DO UPDATE SET is_active = TRUE',
      [email]
    );
    res.status(201).json({ ok: true });
  } catch (err) {
    next(err);
  }
});
