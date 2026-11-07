import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { pool } from './db.js';
import {
  categoriesSeed,
  productsSeed,
  testimonialsSeed,
  faqsSeed,
  partnersSeed,
  settingsSeed,
} from './data/seedData.js';

export async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    for (const c of categoriesSeed) {
      await client.query(
        `INSERT INTO categories (slug, name_en, name_am, tagline_en, tagline_am, image, sort_order)
         VALUES ($1,$2,$3,$4,$5,$6,$7)
         ON CONFLICT (slug) DO UPDATE SET
           name_en = EXCLUDED.name_en, name_am = EXCLUDED.name_am,
           tagline_en = EXCLUDED.tagline_en, tagline_am = EXCLUDED.tagline_am,
           image = EXCLUDED.image, sort_order = EXCLUDED.sort_order`,
        [c.slug, c.name_en, c.name_am, c.tagline_en, c.tagline_am, c.image, c.sort_order]
      );
    }

    for (const p of productsSeed) {
      await client.query(
        `INSERT INTO products
          (category_slug, slug, name_en, name_am, capacity_l, price_etb, description_en, description_am,
           features_en, features_am, image, gallery, badge_en, badge_am, in_stock, featured, is_active, sort_order)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb,$10::jsonb,$11,$12::jsonb,$13,$14,$15,$16,$17,$18)
         ON CONFLICT (slug) DO UPDATE SET
           category_slug = EXCLUDED.category_slug,
           name_en = EXCLUDED.name_en, name_am = EXCLUDED.name_am,
           capacity_l = EXCLUDED.capacity_l, price_etb = EXCLUDED.price_etb,
           description_en = EXCLUDED.description_en, description_am = EXCLUDED.description_am,
           features_en = EXCLUDED.features_en, features_am = EXCLUDED.features_am,
           image = EXCLUDED.image, gallery = EXCLUDED.gallery,
           badge_en = EXCLUDED.badge_en, badge_am = EXCLUDED.badge_am,
           sort_order = EXCLUDED.sort_order`,
        [
          p.category_slug,
          p.slug,
          p.name_en,
          p.name_am,
          p.capacity_l,
          p.price_etb,
          p.description_en,
          p.description_am,
          JSON.stringify(p.features_en || []),
          JSON.stringify(p.features_am || []),
          p.image,
          JSON.stringify(p.gallery || []),
          p.badge_en || '',
          p.badge_am || '',
          p.in_stock,
          p.featured,
          p.is_active,
          p.sort_order,
        ]
      );
    }

    const { rows: tCount } = await client.query('SELECT COUNT(*)::int AS n FROM testimonials');
    if (tCount[0].n === 0) {
      for (const t of testimonialsSeed) {
        await client.query(
          `INSERT INTO testimonials (name, location, quote_en, quote_am, avatar, rating, sort_order)
           VALUES ($1,$2,$3,$4,$5,$6,$7)`,
          [t.name, t.location, t.quote_en, t.quote_am, t.avatar, t.rating, t.sort_order]
        );
      }
    }

    const { rows: fCount } = await client.query('SELECT COUNT(*)::int AS n FROM faqs');
    if (fCount[0].n === 0) {
      for (const f of faqsSeed) {
        await client.query(
          `INSERT INTO faqs (question_en, question_am, answer_en, answer_am, sort_order)
           VALUES ($1,$2,$3,$4,$5)`,
          [f.question_en, f.question_am, f.answer_en, f.answer_am, f.sort_order]
        );
      }
    }

    const { rows: pCount } = await client.query('SELECT COUNT(*)::int AS n FROM partners');
    if (pCount[0].n === 0) {
      for (const p of partnersSeed) {
        await client.query(
          `INSERT INTO partners (name, logo, url, sort_order) VALUES ($1,$2,$3,$4)`,
          [p.name, p.logo, p.url || '', p.sort_order]
        );
      }
    }

    for (const [key, value] of Object.entries(settingsSeed)) {
      await client.query(
        `INSERT INTO settings (key, value) VALUES ($1,$2::jsonb)
         ON CONFLICT (key) DO NOTHING`,
        [key, JSON.stringify(value)]
      );
    }

    const email = (process.env.ADMIN_EMAIL || 'mekatankertech@gmail.com').toLowerCase();
    const password = process.env.ADMIN_PASSWORD || 'Mekaokra1';
    const { rows: adminRows } = await client.query('SELECT id FROM admins WHERE email = $1', [email]);
    if (adminRows.length === 0) {
      const hash = await bcrypt.hash(password, 10);
      await client.query(
        'INSERT INTO admins (name, email, password_hash) VALUES ($1,$2,$3)',
        ['Meka Admin', email, hash]
      );
    }

    await client.query('COMMIT');
    console.log('[seed] content ready');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}
