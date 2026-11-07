import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { router as publicRouter } from './routes/public.js';
import { router as adminRouter } from './routes/admin.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const root = path.resolve(__dirname, '..');

export const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use(cors({ origin: true }));
app.use(express.json({ limit: '1mb' }));

app.use('/images', express.static(path.join(root, 'images'), { maxAge: '7d', fallthrough: true }));
app.use('/api/admin', adminRouter);
app.use('/api', publicRouter);

// Only for self-hosted production (`npm start`). On Vercel the CDN serves
// dist/ and the SPA fallback, so this branch is skipped (dist isn't bundled
// into the serverless function).
const distIndex = path.join(root, 'dist', 'index.html');
if (fs.existsSync(distIndex)) {
  app.use(express.static(path.dirname(distIndex), { maxAge: '1h', index: false }));
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(distIndex);
  });
}

app.use((req, res) => {
  res.status(404).json({ error: `No route for ${req.method} ${req.originalUrl}` });
});

app.use((err, _req, res, _next) => {
  console.error('[api]', err);
  const message =
    err.code === '23505'
      ? 'That record already exists (duplicate slug or email).'
      : err.code === '23503'
        ? 'Related record is missing or still in use.'
        : 'Something went wrong on our side. Please try again.';
  res.status(500).json({ error: message });
});

export default app;
