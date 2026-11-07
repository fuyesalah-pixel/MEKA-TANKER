import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { api } from '../lib/api.js';
import { ease } from '../components/Reveal.jsx';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('mekatankertech@gmail.com');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setStatus('loading');
    try {
      const data = await api.post('/admin/login', { email, password });
      onLogin(data.token, data.admin);
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  };

  return (
    <div className="ad-login">
      <aside className="ad-login__brand">
        <div className="ad-login__brand-bg" aria-hidden="true">
          <img src="/images/blue%20back%20ground%20logo.png" alt="" />
        </div>
        <div className="ad-login__brand-copy">
          <span className="ad-login__wordmark">MEKA</span>
          <p className="serif">Water, held to a higher standard.</p>
          <span className="ad-login__meta">Control room · Lideta, Addis Ababa</span>
        </div>
      </aside>

      <main className="ad-login__panel">
        <motion.div
          className="ad-login__card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="eyebrow">
            <span className="eyebrow__line" aria-hidden="true" />
            Admin
          </span>
          <h1>Welcome back.</h1>
          <p className="ad-login__lede">Sign in to manage the catalogue, orders and enquiries.</p>

          <form onSubmit={submit} className="ad-login__form">
            <label className="ad-field">
              <span className="ad-field__label">Email</span>
              <span className="ad-input-icon">
                <Mail size={16} strokeWidth={1.7} />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoComplete="username"
                />
              </span>
            </label>

            <label className="ad-field">
              <span className="ad-field__label">Password</span>
              <span className="ad-input-icon">
                <Lock size={16} strokeWidth={1.7} />
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                />
                <button type="button" className="ad-input-icon__btn" onClick={() => setShow((s) => !s)} aria-label="Toggle password">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </span>
            </label>

            {error ? <p className="form-error">{error}</p> : null}

            <button type="submit" className="btn btn--primary ad-login__submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Signing in…' : 'Sign in'}
              <ArrowRight size={17} />
            </button>
          </form>

          <p className="ad-login__hint">
            Admin account — <strong>mekatankertech@gmail.com</strong> · <strong>Mekaokra1</strong>
          </p>
        </motion.div>
      </main>
    </div>
  );
}
