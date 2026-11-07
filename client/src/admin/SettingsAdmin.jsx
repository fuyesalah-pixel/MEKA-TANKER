import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import { Field, Notice } from './ui.jsx';

export default function SettingsAdmin() {
  const [brand, setBrand] = useState(null);
  const [contact, setContact] = useState(null);
  const [socials, setSocials] = useState(null);
  const [stats, setStats] = useState([]);
  const [notice, setNotice] = useState(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .adminGet('/settings')
      .then((data) => {
        setBrand(data.brand || {});
        setContact(data.contact || {});
        setSocials(data.socials || {});
        setStats(data.stats || []);
      })
      .catch((err) => setError(err.message));
  }, []);

  const saveAll = async () => {
    setSaving(true);
    setError('');
    try {
      await Promise.all([
        api.adminPut('/settings/brand', { value: brand }),
        api.adminPut('/settings/contact', { value: contact }),
        api.adminPut('/settings/socials', { value: socials }),
        api.adminPut('/settings/stats', { value: stats }),
      ]);
      setNotice('Settings saved. The site updates on next load.');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!brand || !contact || !socials) {
    return (
      <div className="ad-page">
        <div className="ad-skeletons">
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="ad-skeleton" key={index} />
          ))}
        </div>
      </div>
    );
  }

  const updateStat = (index, key) => (event) => {
    setStats((prev) =>
      prev.map((stat, i) => (i === index ? { ...stat, [key]: event.target.value } : stat))
    );
  };

  return (
    <div className="ad-page">
      <header className="ad-page__head">
        <div>
          <span className="ad-page__eyebrow">Configuration</span>
          <h1>Site settings</h1>
          <p>Brand copy, contact details and the numbers shown on the homepage.</p>
        </div>
        <button type="button" className="btn btn--primary btn--sm" onClick={saveAll} disabled={saving}>
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </header>

      <Notice text={notice} onClose={() => setNotice(null)} />
      <Notice text={error} tone="error" onClose={() => setError('')} />

      <div className="ad-panel ad-panel--form">
        <header className="ad-panel__head">
          <h2>Brand</h2>
        </header>
        <div className="ad-form">
          <Field label="Name (English)">
            <input value={brand.nameEn || ''} onChange={(event) => setBrand({ ...brand, nameEn: event.target.value })} />
          </Field>
          <Field label="Name (Amharic)">
            <input value={brand.nameAm || ''} onChange={(event) => setBrand({ ...brand, nameAm: event.target.value })} />
          </Field>
          <Field label="Tagline (English)" full>
            <input value={brand.taglineEn || ''} onChange={(event) => setBrand({ ...brand, taglineEn: event.target.value })} />
          </Field>
          <Field label="Tagline (Amharic)" full>
            <input value={brand.taglineAm || ''} onChange={(event) => setBrand({ ...brand, taglineAm: event.target.value })} />
          </Field>
        </div>
      </div>

      <div className="ad-panel ad-panel--form">
        <header className="ad-panel__head">
          <h2>Contact</h2>
        </header>
        <div className="ad-form">
          <Field label="Primary phone">
            <input value={contact.phone || ''} onChange={(event) => setContact({ ...contact, phone: event.target.value })} />
          </Field>
          <Field label="Second phone">
            <input value={contact.phoneAlt || ''} onChange={(event) => setContact({ ...contact, phoneAlt: event.target.value })} />
          </Field>
          <Field label="WhatsApp / Telegram number">
            <input value={contact.whatsapp || ''} onChange={(event) => setContact({ ...contact, whatsapp: event.target.value })} />
          </Field>
          <Field label="Email">
            <input value={contact.email || ''} onChange={(event) => setContact({ ...contact, email: event.target.value })} />
          </Field>
          <Field label="Address (English)" full>
            <input value={contact.addressEn || ''} onChange={(event) => setContact({ ...contact, addressEn: event.target.value })} />
          </Field>
          <Field label="Address (Amharic)" full>
            <input value={contact.addressAm || ''} onChange={(event) => setContact({ ...contact, addressAm: event.target.value })} />
          </Field>
          <Field label="Opening hours (English)" full>
            <input value={contact.hoursEn || ''} onChange={(event) => setContact({ ...contact, hoursEn: event.target.value })} />
          </Field>
          <Field label="Opening hours (Amharic)" full>
            <input value={contact.hoursAm || ''} onChange={(event) => setContact({ ...contact, hoursAm: event.target.value })} />
          </Field>
        </div>
      </div>

      <div className="ad-panel ad-panel--form">
        <header className="ad-panel__head">
          <h2>Social links</h2>
        </header>
        <div className="ad-form">
          {['telegram', 'facebook', 'instagram', 'tiktok', 'youtube'].map((key) => (
            <Field key={key} label={key.charAt(0).toUpperCase() + key.slice(1)}>
              <input
                value={socials[key] || ''}
                onChange={(event) => setSocials({ ...socials, [key]: event.target.value })}
                placeholder="https://"
              />
            </Field>
          ))}
        </div>
      </div>

      <div className="ad-panel ad-panel--form">
        <header className="ad-panel__head">
          <h2>Homepage numbers</h2>
          <button
            type="button"
            className="ad-btn ad-btn--ghost"
            onClick={() => setStats([...stats, { value: '', suffix: '', labelEn: '', labelAm: '' }])}
          >
            Add stat
          </button>
        </header>
        <div className="ad-stats-editor">
          {stats.map((stat, index) => (
            <div className="ad-stat-row" key={index}>
              <input value={stat.value || ''} onChange={updateStat(index, 'value')} placeholder="10" />
              <input value={stat.suffix || ''} onChange={updateStat(index, 'suffix')} placeholder="yr" />
              <input value={stat.labelEn || ''} onChange={updateStat(index, 'labelEn')} placeholder="Written warranty" />
              <input value={stat.labelAm || ''} onChange={updateStat(index, 'labelAm')} placeholder="የፃፍ ዋስትና" />
              <button
                type="button"
                className="ad-btn ad-btn--danger-ghost"
                onClick={() => setStats(stats.filter((_, i) => i !== index))}
              >
                Remove
              </button>
            </div>
          ))}
          {!stats.length ? <p className="ad-muted">No stats — the homepage falls back to defaults.</p> : null}
        </div>
        <div className="ad-panel__foot">
          <button type="button" className="btn btn--primary btn--sm" onClick={saveAll} disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
