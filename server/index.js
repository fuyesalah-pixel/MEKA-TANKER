import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { router as publicRouter } from './routes/public.js';
import { router as adminRouter } from './routes/admin.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const parsedPort = Number(process.env.PORT);
const PORT = Number.isInteger(parsedPort) && parsedPort > 0 ? parsedPort : 4000;

const app = express();
app.disable('x-powered-by');
app.use(cors({ origin: true }));
app.use(express.json({ limit: '1mb' }));

app.use('/images', express.static(path.join(root, 'images'), { maxAge: '7d', fallthrough: true }));
app.use('/api/admin', adminRouter);
app.use('/api', publicRouter);

const dist = path.join(root, 'dist');
if (fs.existsSync(dist)) {
  app.use(express.static(dist, { maxAge: '1h', index: false }));
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(dist, 'index.html'));
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

app.listen(PORT, () => {
  console.log(`[api] Meka Water Tanker API listening on http://127.0.0.1:${PORT}`);
});
