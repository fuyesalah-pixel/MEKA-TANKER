import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, FileText, Inbox, Mail, Package } from 'lucide-react';
import { api } from '../lib/api.js';
import { EmptyState, StatusPill, money, shortDateTime } from './ui.jsx';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .adminGet('/stats')
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <EmptyState title="Could not load the dashboard" text={error} />;
  if (!data) {
    return (
      <div className="ad-skeletons">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="ad-skeleton" key={index} />
        ))}
      </div>
    );
  }

  const { totals, trend, recentOrders, recentMessages } = data;
  const max = Math.max(...trend.map((point) => point.value), 1);

  const cards = [
    { label: 'Open orders', value: totals.new_orders, total: totals.orders, icon: FileText, to: '/admin/orders' },
    { label: 'New enquiries', value: totals.new_messages, total: totals.messages, icon: Inbox, to: '/admin/messages' },
    { label: 'Products', value: totals.products, total: `${totals.hidden_products} hidden`, icon: Package, to: '/admin/products' },
    { label: 'Subscribers', value: totals.subscribers, total: 'newsletter', icon: Mail, to: '/admin/subscribers' },
  ];

  return (
    <div className="ad-page">
      <header className="ad-page__head">
        <div>
          <span className="ad-page__eyebrow">Overview</span>
          <h1>Good to see you.</h1>
          <p>Everything happening at the workshop today.</p>
        </div>
        <Link to="/admin/products" className="btn btn--primary btn--sm">
          Manage products <ArrowUpRight size={15} />
        </Link>
      </header>

      <div className="ad-stats">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link to={card.to} key={card.label} className="ad-stat">
              <span className="ad-stat__icon">
                <Icon size={18} strokeWidth={1.7} />
              </span>
              <span className="ad-stat__value">{card.value}</span>
              <span className="ad-stat__label">{card.label}</span>
              <span className="ad-stat__meta">{card.total}</span>
              <ArrowUpRight className="ad-stat__arrow" size={15} />
            </Link>
          );
        })}
      </div>

      <div className="ad-panels">
        <section className="ad-panel">
          <header>
            <h2>Orders · last 7 days</h2>
            <Link to="/admin/orders">All orders</Link>
          </header>
          <div className="ad-chart">
            {trend.map((point) => (
              <div className="ad-chart__col" key={point.label}>
                <span className="ad-chart__value">{point.value || ''}</span>
                <div className="ad-chart__bar-wrap">
                  <div
                    className="ad-chart__bar"
                    style={{ height: `${Math.max((point.value / max) * 100, 4)}%` }}
                  />
                </div>
                <span className="ad-chart__label">{point.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="ad-panel">
          <header>
            <h2>Latest enquiries</h2>
            <Link to="/admin/messages">Open inbox</Link>
          </header>
          {recentMessages.length ? (
            <ul className="ad-mini-list">
              {recentMessages.map((message) => (
                <li key={message.id}>
                  <div>
                    <strong>{message.name}</strong>
                    <span>{message.subject}</span>
                  </div>
                  <StatusPill status={message.status} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title="No enquiries yet" text="New messages from the contact page land here." />
          )}
        </section>
      </div>

      <section className="ad-panel">
        <header>
          <h2>Recent orders</h2>
          <Link to="/admin/orders">See all</Link>
        </header>
        {recentOrders.length ? (
          <div className="ad-table-wrap">
            <table className="ad-table">
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Customer</th>
                  <th>Model</th>
                  <th>Qty</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="ad-mono">{order.reference}</td>
                    <td>
                      <strong>{order.customerName}</strong>
                      <small>{order.phone}</small>
                    </td>
                    <td>{order.productName || '—'}</td>
                    <td>{order.quantity}</td>
                    <td>
                      <StatusPill status={order.status} />
                    </td>
                    <td>{shortDateTime(order.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState title="No orders yet" text="Orders placed from the site will appear here." />
        )}
      </section>
    </div>
  );
}
