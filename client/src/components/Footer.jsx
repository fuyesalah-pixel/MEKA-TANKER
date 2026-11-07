import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Facebook, Instagram, Send, Youtube } from 'lucide-react';
import { api } from '../lib/api.js';
import { useLang } from '../lib/i18n.jsx';
import { useSite } from '../lib/site.jsx';
import { useOrder } from '../lib/order.jsx';

const LOGO = '/images/white%20background%20logo.png';

export default function Footer() {
  const { t, pick, lang } = useLang();
  const { settings, categories } = useSite();
  const { openOrder } = useOrder();
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle');

  const submit = async (event) => {
    event.preventDefault();
    setState('loading');
    try {
      await api.post('/subscribe', { email });
      setState('done');
      setEmail('');
    } catch {
      setState('error');
    }
  };

  const socials = settings.socials || {};

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">
              <img src={LOGO} alt="Meka Water Tanker" loading="lazy" />
            </div>
            <p className="footer__about">{t('footer.about')}</p>
            <div className="footer__socials">
              {socials.telegram ? (
                <a href={socials.telegram} target="_blank" rel="noreferrer" aria-label="Telegram">
                  <Send size={17} strokeWidth={1.7} />
                </a>
              ) : null}
              {socials.facebook ? (
                <a href={socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                  <Facebook size={17} strokeWidth={1.7} />
                </a>
              ) : null}
              {socials.instagram ? (
                <a href={socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                  <Instagram size={17} strokeWidth={1.7} />
                </a>
              ) : null}
              {socials.youtube ? (
                <a href={socials.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
                  <Youtube size={17} strokeWidth={1.7} />
                </a>
              ) : null}
            </div>
          </div>

          <div className="footer__col">
            <h4>{t('footer.explore')}</h4>
            <Link to="/collection">{t('nav.collection')}</Link>
            {categories.slice(0, 4).map((category) => (
              <Link key={category.slug} to={`/collection?line=${category.slug}`}>
                {pick(category.nameEn, category.nameAm)}
              </Link>
            ))}
            <Link to="/craft">{t('nav.craft')}</Link>
          </div>

          <div className="footer__col">
            <h4>{t('footer.contact')}</h4>
            <a href={`tel:${settings.contact.phone}`}>{settings.contact.phone}</a>
            {settings.contact.phoneAlt ? <a href={`tel:${settings.contact.phoneAlt}`}>{settings.contact.phoneAlt}</a> : null}
            <a href={`mailto:${settings.contact.email}`}>{settings.contact.email}</a>
            <span className="footer__muted">{pick(settings.contact.addressEn, settings.contact.addressAm)}</span>
            <span className="footer__muted">{pick(settings.contact.hoursEn, settings.contact.hoursAm)}</span>
          </div>

          <div className="footer__col footer__col--news">
            <h4>{t('footer.newsletter')}</h4>
            <p className="footer__muted">{t('footer.newsletterText')}</p>
            <form className="subscribe" onSubmit={submit}>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (state !== 'loading') setState('idle');
                }}
                placeholder={t('footer.emailPlaceholder')}
                aria-label={t('footer.emailPlaceholder')}
              />
              <button type="submit" disabled={state === 'loading'} aria-label={t('footer.subscribe')}>
                <ArrowUpRight size={18} strokeWidth={2} />
              </button>
            </form>
            {state === 'done' ? <p className="subscribe__note is-ok">{t('footer.subscribed')}</p> : null}
            {state === 'error' ? (
              <p className="subscribe__note is-error">
                {lang === 'am' ? 'እባክዎ እንደገና ይሞክሩ።' : 'Please try again.'}
              </p>
            ) : null}
            <button type="button" className="footer__order" onClick={() => openOrder()}>
              {t('nav.order')} <ArrowUpRight size={15} />
            </button>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} {pick('Meka Water Tanker', 'መካ የውሀ ታንከር')}. {t('footer.rights')}
          </span>
          <span className="footer__made">
            <span className="status-dot" aria-hidden="true" /> {t('footer.made')}
          </span>
          <Link to="/admin" className="footer__admin">
            {lang === 'am' ? 'የአስተዳደር መግቢያ' : 'Admin login'} <ArrowUpRight size={12} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
