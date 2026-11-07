import { useEffect, useMemo, useState } from 'react';
import { Download, Search } from 'lucide-react';
import { api } from '../lib/api.js';
import { ConfirmButton, EmptyState, Notice, shortDate } from './ui.jsx';

export default function SubscribersAdmin() {
  const [subscribers, setSubscribers] = useState([]);
  const [query, setQuery] = useState('');
  const [notice, setNotice] = useState(null);
  const [error, setError] = useState('');

  const load = () => api.adminGet('/subscribers').then(setSubscribers).catch((err) => setError(err.message));
  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return subscribers;
    return subscribers.filter((item) => item.email.toLowerCase().includes(needle));
  }, [subscribers, query]);

  const remove = async (item) => {
    try {
      await api.adminDelete(`/subscribers/${item.id}`);
      setSubscribers((prev) => prev.filter((entry) => entry.id !== item.id));
      setNotice('Subscriber removed.');
    } catch (err) {
      setError(err.message);
    }
  };

  const exportCsv = () => {
    const rows = ['email,subscribed'];
    subscribers.forEach((item) => rows.push(`${item.email},${item.created_at || item.createdAt || ''}`));
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'meka-subscribers.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="ad-page">
      <header className="ad-page__head">
        <div>
          <span className="ad-page__eyebrow">Marketing</span>
          <h1>Subscribers</h1>
          <p>{subscribers.length} people on the newsletter.</p>
        </div>
        <button type="button" className="btn btn--ghost btn--sm" onClick={exportCsv} disabled={!subscribers.length}>
          <Download size={15} /> Export CSV
        </button>
      </header>

      <Notice text={notice} onClose={() => setNotice(null)} />
      <Notice text={error} tone="error" onClose={() => setError('')} />

      <div className="ad-toolbar">
        <div className="ad-search">
          <Search size={15} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search email" />
        </div>
      </div>

      <div className="ad-panel">
        {filtered.length ? (
          <div className="ad-table-wrap">
            <table className="ad-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Subscribed</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id}>
                    <td className="ad-mono">{item.email}</td>
                    <td>{shortDate(item.created_at || item.createdAt)}</td>
                    <td>{item.is_active === false ? 'Inactive' : 'Active'}</td>
                    <td>
                      <ConfirmButton onConfirm={() => remove(item)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState title="No subscribers yet" text="The footer newsletter form feeds this list." />
        )}
      </div>
    </div>
  );
}
