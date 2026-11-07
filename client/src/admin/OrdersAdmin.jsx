import { useEffect, useMemo, useState } from 'react';
import { Phone, Search } from 'lucide-react';
import { api } from '../lib/api.js';
import { ConfirmButton, EmptyState, Notice, StatusPill, shortDateTime } from './ui.jsx';

const statuses = ['new', 'confirmed', 'delivered', 'cancelled'];

export default function OrdersAdmin() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [notice, setNotice] = useState(null);
  const [error, setError] = useState('');

  const load = () => api.adminGet('/orders').then(setOrders).catch((err) => setError(err.message));
  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return orders.filter((order) => {
      const matchesStatus = filter === 'all' || order.status === filter;
      const matchesQuery =
        !needle ||
        [order.reference, order.customerName, order.phone, order.productName]
          .join(' ')
          .toLowerCase()
          .includes(needle);
      return matchesStatus && matchesQuery;
    });
  }, [orders, filter, query]);

  const update = async (order, status) => {
    try {
      await api.adminPut(`/orders/${order.id}`, { status });
      setOrders((prev) => prev.map((item) => (item.id === order.id ? { ...item, status } : item)));
      setNotice(`${order.reference} marked ${status}.`);
    } catch (err) {
      setError(err.message);
    }
  };

  const remove = async (order) => {
    try {
      await api.adminDelete(`/orders/${order.id}`);
      setOrders((prev) => prev.filter((item) => item.id !== order.id));
      setNotice('Order deleted.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="ad-page">
      <header className="ad-page__head">
        <div>
          <span className="ad-page__eyebrow">Sales</span>
          <h1>Orders</h1>
          <p>{orders.filter((order) => order.status === 'new').length} new requests to confirm.</p>
        </div>
      </header>

      <Notice text={notice} onClose={() => setNotice(null)} />
      <Notice text={error} tone="error" onClose={() => setError('')} />

      <div className="ad-toolbar">
        <div className="ad-search">
          <Search size={15} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search reference, name, phone" />
        </div>
        <div className="chips">
          <button type="button" className={`chip ${filter === 'all' ? 'is-active' : ''}`.trim()} onClick={() => setFilter('all')}>
            All
          </button>
          {statuses.map((status) => (
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

      <div className="ad-panel">
        {filtered.length ? (
          <div className="ad-table-wrap">
            <table className="ad-table">
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Customer</th>
                  <th>Model</th>
                  <th>Qty</th>
                  <th>Status</th>
                  <th>Placed</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => (
                  <tr key={order.id}>
                    <td className="ad-mono">{order.reference}</td>
                    <td>
                      <strong>{order.customerName}</strong>
                      <small>
                        <a href={`tel:${order.phone}`}>
                          <Phone size={11} /> {order.phone}
                        </a>
                      </small>
                      {order.address ? <small className="ad-muted">{order.address}</small> : null}
                    </td>
                    <td>
                      {order.productName || '—'}
                      {order.capacity ? <small>{order.capacity.toLocaleString()} L</small> : null}
                      {order.notes ? <small className="ad-muted">“{order.notes}”</small> : null}
                    </td>
                    <td>{order.quantity}</td>
                    <td>
                      <select
                        className="ad-status-select"
                        value={order.status}
                        onChange={(event) => update(order, event.target.value)}
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <StatusPill status={order.status} />
                    </td>
                    <td>{shortDateTime(order.createdAt)}</td>
                    <td>
                      <ConfirmButton onConfirm={() => remove(order)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState title="No orders in this view" text="Orders submitted from the site appear here instantly." />
        )}
      </div>
    </div>
  );
}
