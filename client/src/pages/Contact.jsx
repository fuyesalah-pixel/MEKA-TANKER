import { useEffect, useState } from 'react';
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { api } from '../lib/api.js';
import { useLang } from '../lib/i18n.jsx';
import { useSite } from '../lib/site.jsx';
import PageFade from '../components/PageFade.jsx';
import Reveal from '../components/Reveal.jsx';

const emptyForm = { name: '', phone: '', email: '', subject: '', message: '' };

export default function Contact() {
  const { t, pick } = useLang();
  const { settings } = useSite();
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = `${t('page.contact.eyebrow')} — Meka Water Tanker`;
  }, [t]);

  const set = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    if (form.name.trim().length < 2 || form.message.trim().length < 5) {
      setError(t('order.err'));
      return;
    }
    setStatus('loading');
    try {
      await api.post('/contact', form);
      setStatus('done');
      setForm(emptyForm);
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  };

  const details = [
    {
      icon: Phone,
      label: t('page.contact.call'),
      value: settings.contact.phone,
      href: `tel:${settings.contact.phone}`,
    },
    {
      icon: Mail,
      label: t('page.contact.email'),
      value: settings.contact.email,
      href: `mailto:${settings.contact.email}`,
    },
    {
      icon: MapPin,
      label: t('page.contact.visit'),
      value: pick(settings.contact.addressEn, settings.contact.addressAm),
    },
    {
      icon: Clock,
      label: t('page.contact.hours'),
      value: t('page.contact.hoursValue'),
    },
  ];

  return (
    <PageFade>
      <section className="page-hero">
        <div className="page-hero__bg" aria-hidden="true">
          <span className="orb orb--a" />
          <span className="orb orb--c" />
        </div>
        <div className="container page-hero__inner">
          <Reveal className="eyebrow">
            <span className="eyebrow__line" aria-hidden="true" />
            {t('page.contact.eyebrow')}
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="h1">{t('page.contact.title')}</h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lede">{t('page.contact.lede')}</p>
          </Reveal>
        </div>
      </section>

      <section className="section section--flush">
        <div className="container contact-grid">
          <div className="contact-info">
            <Reveal className="contact-info__card">
              <h2 className="h3">{pick('The workshop', 'ወርክሾፉ')}</h2>
              <ul className="contact-list">
                {details.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <>
                      <span className="contact-list__icon">
                        <Icon size={17} strokeWidth={1.7} />
                      </span>
                      <span className="contact-list__text">
                        <small>{item.label}</small>
                        <strong>{item.value}</strong>
                      </span>
                    </>
                  );
                  return (
                    <li key={item.label}>
                      {item.href ? (
                        <a href={item.href} className="contact-list__row">
                          {content}
                        </a>
                      ) : (
                        <div className="contact-list__row">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="contact-info__foot">
                <a
                  href={settings.socials?.telegram || `tel:${settings.contact.phone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--ghost btn--sm"
                >
                  <Send size={15} strokeWidth={1.7} /> {t('page.contact.whatsapp')}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="contact-visit">
              <div className="contact-visit__map" aria-hidden="true">
                <span className="contact-visit__pin" />
                <span className="contact-visit__ring" />
              </div>
              <div>
                <strong>{pick('Lideta, Addis Ababa', 'ልደታ፣ አዲስ አበባ')}</strong>
                <p>
                  {pick(
                    'Turn off the main road at Lideta and follow the signs to the Meka yard. Parking available.',
                    'ከልደታ ዋና መንገድ በመታጠፍ የመካ ወርክሾፕ ምልክቶችን ይከተሉ። የመኪና ማቆሚያ አለ።'
                  )}
                </p>
              </div>
            </Reveal>
          </div>

          <div className="contact-form-wrap">
            <Reveal className="contact-form-card">
              <header>
                <h2 className="h3">{t('page.contact.formTitle')}</h2>
                <p>{t('page.contact.formText')}</p>
              </header>

              {status === 'done' ? (
                <div className="contact-success">
                  <p>{t('page.contact.success')}</p>
                  <button type="button" className="btn btn--ghost btn--sm" onClick={() => setStatus('idle')}>
                    {t('page.contact.another')}
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={submit}>
                  <div className="field">
                    <label htmlFor="c-name">
                      {t('page.contact.name')} <span>*</span>
                    </label>
                    <input id="c-name" value={form.name} onChange={set('name')} required />
                  </div>
                  <div className="field">
                    <label htmlFor="c-phone">{t('page.contact.phone')}</label>
                    <input id="c-phone" type="tel" value={form.phone} onChange={set('phone')} />
                  </div>
                  <div className="field">
                    <label htmlFor="c-email">{t('page.contact.emailField')}</label>
                    <input id="c-email" type="email" value={form.email} onChange={set('email')} />
                  </div>
                  <div className="field">
                    <label htmlFor="c-subject">{t('page.contact.subject')}</label>
                    <input id="c-subject" value={form.subject} onChange={set('subject')} />
                  </div>
                  <div className="field field--full">
                    <label htmlFor="c-message">
                      {t('page.contact.message')} <span>*</span>
                    </label>
                    <textarea id="c-message" rows="5" value={form.message} onChange={set('message')} required />
                  </div>
                  {error ? <p className="form-error field--full">{error}</p> : null}
                  <div className="field--full">
                    <button type="submit" className="btn btn--primary" disabled={status === 'loading'}>
                      {status === 'loading' ? t('page.contact.sending') : t('page.contact.send')}
                      <Send size={16} strokeWidth={1.8} />
                    </button>
                  </div>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </PageFade>
  );
}
