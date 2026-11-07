import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { ease } from '../components/Reveal.jsx';

export function Drawer({ open, onClose, title, subtitle, children, footer }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="ad-drawer-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="ad-drawer-backdrop" onClick={onClose} />
          <motion.aside
            className="ad-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease }}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            <header className="ad-drawer__head">
              <div>
                <h3>{title}</h3>
                {subtitle ? <p>{subtitle}</p> : null}
              </div>
              <button type="button" className="ad-icon-btn" onClick={onClose} aria-label="Close">
                <X size={18} />
              </button>
            </header>
            <div className="ad-drawer__body">{children}</div>
            {footer ? <footer className="ad-drawer__foot">{footer}</footer> : null}
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function Field({ label, children, hint, full = false }) {
  return (
    <label className={`ad-field ${full ? 'ad-field--full' : ''}`.trim()}>
      <span className="ad-field__label">{label}</span>
      {children}
      {hint ? <small className="ad-field__hint">{hint}</small> : null}
    </label>
  );
}

export function Toggle({ label, checked, onChange }) {
  return (
    <label className="ad-toggle">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span className="ad-toggle__track" aria-hidden="true">
        <span className="ad-toggle__thumb" />
      </span>
      <span>{label}</span>
    </label>
  );
}

export function ConfirmButton({ onConfirm, children = 'Delete', className = 'ad-btn ad-btn--danger-ghost' }) {
  const [armed, setArmed] = useState(false);
  return (
    <button
      type="button"
      className={`${className} ${armed ? 'is-armed' : ''}`.trim()}
      onClick={() => {
        if (armed) {
          onConfirm();
          setArmed(false);
        } else {
          setArmed(true);
          setTimeout(() => setArmed(false), 3200);
        }
      }}
      onBlur={() => setArmed(false)}
    >
      {armed ? 'Confirm?' : children}
    </button>
  );
}

const statusLabels = {
  new: 'New',
  read: 'Read',
  replied: 'Replied',
  confirmed: 'Confirmed',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  active: 'Active',
};

export function StatusPill({ status }) {
  return <span className={`ad-status ad-status--${status}`}>{statusLabels[status] || status}</span>;
}

export function Notice({ text, tone = 'ok', onClose }) {
  if (!text) return null;
  return (
    <div className={`ad-notice ad-notice--${tone}`} role="status">
      <span>{text}</span>
      {onClose ? (
        <button type="button" onClick={onClose} aria-label="Dismiss">
          <X size={14} />
        </button>
      ) : null}
    </div>
  );
}

export function EmptyState({ title, text, action }) {
  return (
    <div className="ad-empty">
      <h4>{title}</h4>
      {text ? <p>{text}</p> : null}
      {action}
    </div>
  );
}

export const money = (value) =>
  Number(value) > 0 ? `ETB ${Number(value).toLocaleString('en-US')}` : 'On request';

export const shortDate = (value) =>
  value
    ? new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : '—';

export const shortDateTime = (value) =>
  value
    ? new Date(value).toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '—';
