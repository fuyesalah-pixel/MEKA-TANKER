import app from '../server/app.js';

// Vercel treats this file as a Node function at /api. Custom rewrites in
// vercel.json forward every /api/* request here with its original path intact,
// so Express keeps routing on /api/products, /api/admin/login, and so on.
export default app;
