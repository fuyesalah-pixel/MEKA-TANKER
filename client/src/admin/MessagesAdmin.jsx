import { useEffect, useMemo, useState } from 'react';
import { Mail, Phone, Search } from 'lucide-react';
import { api } from '../lib/api.js';
import { ConfirmButton, EmptyState, Notice, StatusPill, shortDateTime } from './ui.jsx';

export default function MessagesAdmin() {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [notice, setNotice] = useState(null);
  const [error, setError] = useState('');

  const load = () => api.adminGet('/messages').then(setMessages).catch((err) => setError(err.message));
  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return messages.filter((message) => {
      const matchesStatus = filter === 'all' || message.status === filter;
      const matchesQuery =
        !needle ||
        [message.name, message.email, message.phone, message.message].join(' ').toLowerCase().includes(needle);
      return matchesStatus && matchesQuery;
    });
  }, [messages, filter, query]);

  const update = async (message, status) => {
    try {
      await api.adminPut(`/messages/${message.id}`, { status });
      setMessages((prev) => prev.map((item) => (item.id === message.id ? { ...item, status } : item)));
      setNotice('Enquiry updated.');
    } catch (err) {
      setError(err.message);
    }
  };

  const remove = async (message) => {
    try {
      await api.adminDelete(`/messages/${message.id}`);
      setMessages((prev) => prev.filter((item) => item.id !== message.id));
      setNotice('Enquiry deleted.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="ad-page">
      <header className="ad-page__head">
        <div>
          <span className="ad-page__eyebrow">Inbox</span>
          <h1>Enquiries</h1>
          <p>{messages.filter((message) => message.status === 'new').length} unread contact messages.</p>
        </div>
      </header>

      <Notice text={notice} onClose={() => setNotice(null)} />
      <Notice text={error} tone="error" onClose={() => setError('')} />

      <div className="ad-toolbar">
        <div className="ad-search">
          <Search size={15} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search enquiries" />
        </div>
        <div className="chips">
          {['all', 'new', 'read', 'replied'].map((status) => (
            <button
              type="button"
              key={status}
              className={`chip ${filter === status ? 'is-active' : ''}`.trim()}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {filtered.length ? (
        <div className="ad-msg-grid">
          {filtered.map((message) => (
            <article key={message.id} className={`ad-msg ${message.status === 'new' ? 'is-new' : ''}`.trim()}>
              <header>
                <div>
                  <strong>{message.name}</strong>
                  <small>{shortDateTime(message.createdAt)}</small>
                </div>
                <StatusPill status={message.status} />
              </header>
              <h4>{message.subject}</h4>
              <p>{message.message}</p>
              <div className="ad-msg__meta">
                {message.phone ? (
                  <a href={`tel:${message.phone}`}>
                    <Phone size={13} /> {message.phone}
                  </a>
                ) : null}
                {message.email ? (
                  <a href={`mailto:${message.email}`}>
                    <Mail size={13} /> {message.email}
                  </a>
                ) : null}
              </div>
              <footer>
                <select
                  className="ad-status-select"
                  value={message.status}
                  onChange={(event) => update(message, event.target.value)}
                >
                  {['new', 'read', 'replied'].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                {message.email ? (
                  <a
                    className="ad-btn ad-btn--ghost"
                    href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject)}`}
                    onClick={() => update(message, 'replied')}
                  >
                    Reply
                  </a>
                ) : null}
                <ConfirmButton onConfirm={() => remove(message)} />
              </footer>
            </article>
          ))}
        </div>
      ) : (
        <div className="ad-panel">
          <EmptyState title="Inbox is clear" text="New enquiries from the contact form land here." />
        </div>
      )}
    </div>
  );
}
