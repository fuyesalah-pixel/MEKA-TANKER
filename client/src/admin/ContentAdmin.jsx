import { useEffect, useState } from 'react';
import { Pencil, Plus } from 'lucide-react';
import { api } from '../lib/api.js';
import { ConfirmButton, Drawer, EmptyState, Field, Notice, Toggle } from './ui.jsx';

const configs = {
  testimonials: {
    label: 'Testimonials',
    endpoint: '/testimonials',
    blank: {
      name: '',
      location: '',
      quote_en: '',
      quote_am: '',
      avatar: '',
      rating: 5,
      is_active: true,
      sort_order: 0,
    },
    fields: [
      { key: 'name', label: 'Name' },
      { key: 'location', label: 'Location' },
      { key: 'avatar', label: 'Avatar image path' },
      { key: 'rating', label: 'Rating (1–5)', type: 'number' },
      { key: 'quote_en', label: 'Quote (English)', type: 'textarea', full: true },
      { key: 'quote_am', label: 'Quote (Amharic)', type: 'textarea', full: true },
      { key: 'sort_order', label: 'Sort order', type: 'number' },
    ],
    primary: (row) => row.name,
    secondary: (row) => row.location,
  },
  faqs: {
    label: 'FAQs',
    endpoint: '/faqs',
    blank: {
      question_en: '',
      question_am: '',
      answer_en: '',
      answer_am: '',
      is_active: true,
      sort_order: 0,
    },
    fields: [
      { key: 'question_en', label: 'Question (English)', full: true },
      { key: 'question_am', label: 'Question (Amharic)', full: true },
      { key: 'answer_en', label: 'Answer (English)', type: 'textarea', full: true },
      { key: 'answer_am', label: 'Answer (Amharic)', type: 'textarea', full: true },
      { key: 'sort_order', label: 'Sort order', type: 'number' },
    ],
    primary: (row) => row.question_en,
    secondary: (row) => row.question_am,
  },
  partners: {
    label: 'Partners',
    endpoint: '/partners',
    blank: { name: '', logo: '', url: '', is_active: true, sort_order: 0 },
    fields: [
      { key: 'name', label: 'Name' },
      { key: 'logo', label: 'Logo path' },
      { key: 'url', label: 'Website URL', full: true },
      { key: 'sort_order', label: 'Sort order', type: 'number' },
    ],
    primary: (row) => row.name,
    secondary: (row) => row.logo,
  },
};

const avatarOf = (key, row) =>
  key === 'partners' ? row.logo : key === 'testimonials' ? row.avatar : null;

function EntityPanel({ kind, onNotice }) {
  const config = configs[kind];
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(config.blank);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => api.adminGet(config.endpoint).then(setRows).catch((err) => setError(err.message));
  useEffect(() => {
    load();
  }, [config.endpoint]);

  const startNew = () => {
    setEditing(null);
    setForm({ ...config.blank });
    setOpen(true);
  };

  const startEdit = (row) => {
    setEditing(row);
    setForm({ ...config.blank, ...row });
    setOpen(true);
  };

  const set = (key) => (event) =>
    setForm((prev) => ({
      ...prev,
      [key]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    }));

  const save = async () => {
    setSaving(true);
    setError('');
    try {
      if (editing) await api.adminPut(`${config.endpoint}/${editing.id}`, form);
      else await api.adminPost(config.endpoint, form);
      setOpen(false);
      onNotice(`${config.label.slice(0, -1)} saved.`);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (row) => {
    try {
      await api.adminDelete(`${config.endpoint}/${row.id}`);
      onNotice('Item deleted.');
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="ad-panel">
        <header className="ad-panel__head">
          <h2>{config.label}</h2>
          <button type="button" className="ad-btn ad-btn--ghost" onClick={startNew}>
            <Plus size={14} /> Add
          </button>
        </header>
        {rows.length ? (
          <div className="ad-table-wrap">
            <table className="ad-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Status</th>
                  <th>Order</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const image = avatarOf(kind, row);
                  return (
                    <tr key={row.id}>
                      <td>
                        <div className="ad-product">
                          {image ? (
                            <span className="ad-product__thumb">
                              <img src={image} alt="" loading="lazy" />
                            </span>
                          ) : null}
                          <div>
                            <strong>{config.primary(row)}</strong>
                            <small>{config.secondary(row)}</small>
                          </div>
                        </div>
                      </td>
                      <td>{row.is_active === false ? 'Hidden' : 'Live'}</td>
                      <td>{row.sort_order ?? '—'}</td>
                      <td>
                        <div className="ad-row-actions">
                          <button type="button" className="ad-btn ad-btn--ghost" onClick={() => startEdit(row)}>
                            <Pencil size={14} /> Edit
                          </button>
                          <ConfirmButton onConfirm={() => remove(row)} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState title={`No ${config.label.toLowerCase()} yet`} />
        )}
      </div>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? `Edit ${config.label.slice(0, -1)}` : `New ${config.label.slice(0, -1)}`}
        footer={
          <>
            <button type="button" className="btn btn--ghost" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="button" className="btn btn--primary" onClick={save} disabled={saving}>
              {saving ? 'Saving…' : 'Save'}
            </button>
          </>
        }
      >
        <div className="ad-form">
          {config.fields.map((field) => (
            <Field key={field.key} label={field.label} full={field.full} hint={field.hint}>
              {field.type === 'textarea' ? (
                <textarea rows="3" value={form[field.key] ?? ''} onChange={set(field.key)} />
              ) : (
                <input
                  type={field.type === 'number' ? 'number' : 'text'}
                  value={form[field.key] ?? ''}
                  onChange={set(field.key)}
                />
              )}
            </Field>
          ))}
          <div className="ad-field--full">
            <Toggle
              label="Visible on site"
              checked={form.is_active !== false}
              onChange={(value) => setForm((prev) => ({ ...prev, is_active: value }))}
            />
          </div>
          {error ? <p className="form-error ad-field--full">{error}</p> : null}
        </div>
      </Drawer>
    </>
  );
}

export default function ContentAdmin() {
  const [tab, setTab] = useState('testimonials');
  const [notice, setNotice] = useState(null);

  return (
    <div className="ad-page">
      <header className="ad-page__head">
        <div>
          <span className="ad-page__eyebrow">Website</span>
          <h1>Content</h1>
          <p>Testimonials, FAQ answers and partner logos shown on the site.</p>
        </div>
      </header>

      <Notice text={notice} onClose={() => setNotice(null)} />

      <div className="ad-tabs">
        {Object.entries(configs).map(([key, config]) => (
          <button
            type="button"
            key={key}
            className={`ad-tab ${tab === key ? 'is-active' : ''}`.trim()}
            onClick={() => setTab(key)}
          >
            {config.label}
          </button>
        ))}
      </div>

      <EntityPanel key={tab} kind={tab} onNotice={setNotice} />
    </div>
  );
}
