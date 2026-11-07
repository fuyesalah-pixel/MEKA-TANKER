import jwt from 'jsonwebtoken';

if (!process.env.JWT_SECRET && process.env.VERCEL) {
  throw new Error(
    'JWT_SECRET is not set. Add it in Vercel → Project → Settings → Environment Variables before deploying.'
  );
}

const SECRET = process.env.JWT_SECRET || 'meka-tanker-local-dev-secret-change-me';

export function signToken(admin) {
  return jwt.sign({ id: admin.id, email: admin.email, name: admin.name }, SECRET, {
    expiresIn: '12h',
  });
}

export function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Authentication required' });
  try {
    req.admin = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Session expired — please sign in again' });
  }
}
