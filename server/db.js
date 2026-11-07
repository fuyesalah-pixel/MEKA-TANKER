import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

// Vercel's Postgres integration exposes POSTGRES_URL; DATABASE_URL stays the
// local/.env name. Remote providers need TLS, localhost does not.
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
const isRemote = Boolean(connectionString) && !/(localhost|127\.0\.0\.1)/.test(connectionString);
const serverless = Boolean(process.env.VERCEL);

if (!connectionString) {
  console.warn('[db] DATABASE_URL (or POSTGRES_URL) is not set — database calls will fail.');
}

export const pool = new Pool({
  connectionString,
  // Serverless instances are short lived; a small pool avoids exhausting the
  // provider's connection limit when many functions run at once.
  max: serverless ? 3 : 10,
  idleTimeoutMillis: serverless ? 5_000 : 30_000,
  allowExitOnIdle: serverless,
  ssl: isRemote ? { rejectUnauthorized: false } : undefined,
});

pool.on('error', (err) => {
  console.error('[db] unexpected idle client error:', err.message);
});

export const query = (text, params) => pool.query(text, params);

export const json = (value, fallback) => {
  if (value === undefined || value === null || value === '') return fallback;
  return typeof value === 'string' ? value : JSON.stringify(value);
};
