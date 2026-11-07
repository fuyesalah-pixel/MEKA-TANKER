import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import { seed } from './seed.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { Client } = pg;

const url = new URL(process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/meka_tanker');
const dbName = url.pathname.replace(/^\//, '') || 'meka_tanker';

const adminUrl = new URL(url.toString());
adminUrl.pathname = '/postgres';

const admin = new Client({ connectionString: adminUrl.toString() });
await admin.connect();
const { rows } = await admin.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbName]);
if (rows.length === 0) {
  // Identifier cannot be parameterised; dbName comes from the operator's own .env.
  await admin.query(`CREATE DATABASE "${dbName.replace(/"/g, '""')}"`);
  console.log(`[db] created database ${dbName}`);
} else {
  console.log(`[db] database ${dbName} already exists`);
}
await admin.end();

const app = new Client({ connectionString: url.toString() });
await app.connect();
const schema = await fs.readFile(path.join(__dirname, 'schema.sql'), 'utf8');
await app.query(schema);
console.log('[db] schema applied');
await app.end();

await seed();

const { pool } = await import('./db.js');
const { rows: counts } = await pool.query(
  'SELECT (SELECT COUNT(*)::int FROM products) AS products, (SELECT COUNT(*)::int FROM categories) AS categories'
);
console.log(`[db] ready — ${counts[0].categories} collections, ${counts[0].products} products`);
await pool.end();
process.exit(0);
