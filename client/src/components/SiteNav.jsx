import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, Phone, X } from 'lucide-react';
import { useLang } from '../lib/i18n.jsx';
import { useSite } from '../lib/site.jsx';
import { useOrder } from '../lib/order.jsx';
import { ease } from './Reveal.jsx';

const LOGO = '/images/blue%20back%20ground%20logo.png';

export default function SiteNav() {
  const { t, lang, setLang, pick } = useLang();
  const { settings, categories } = useSite();
  const { openOrder } = useOrder();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/collection', label: t('nav.collection') },
    { to: '/craft', label: t('nav.craft') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <>
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`.trim()}>
        <div className="container nav__inner">
          <Link to="/" className="brand" aria-label="Meka Water Tanker — home">
            <span className="brand__mark">
              <img src={LOGO} alt="" width="44" height="44" />
            </span>
            <span className="brand__text">
              <strong>MEKA</strong>
              <small>{pick('Water Tanker', 'የውሀ ታንከር')}</small>
            </span>
          </Link>

          <nav className="nav__links" aria-label="Primary">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'} className="nav__link">
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav__actions">
            <div className="lang-switch" role="group" aria-label="Language">
              <button
                type="button"
                className={lang === 'en' ? 'is-active' : ''}
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
              >
                EN
              </button>
              <button
                type="button"
                className={lang === 'am' ? 'is-active' : ''}
                onClick={() => setLang('am')}
                aria-pressed={lang === 'am'}
              >
                አማ
              </button>
            </div>

            <a className="nav__phone" href={`tel:${settings.contact.phone}`}>
              <Phone size={15} strokeWidth={1.8} />
              <span>{settings.contact.phone}</span>
            </a>

            <button type="button" className="btn btn--primary btn--sm nav__cta" onClick={() => openOrder()}>
              {t('nav.order')}
              <ArrowUpRight size={16} strokeWidth={2} />
            </button>

            <button
              type="button"
              className="nav__burger"
              onClick={() => setOpen(true)}
              aria-label={t('nav.menu')}
              aria-expanded={open}
            >
              <Menu size={22} strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
          >
            <div className="mobile-menu__top container">
              <span className="brand__text">
                <strong>MEKA</strong>
                <small>{pick('Water Tanker', 'የውሀ ታንከር')}</small>
              </span>
              <button
                type="button"
                className="nav__burger"
                onClick={() => setOpen(false)}
                aria-label={t('nav.close')}
              >
                <X size={24} strokeWidth={1.6} />
              </button>
            </div>

            <nav className="mobile-menu__links container" aria-label="Mobile">
              {links.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + index * 0.06, duration: 0.6, ease }}
                >
                  <NavLink to={link.to} end={link.to === '/'} className="mobile-menu__link">
                    <span className="mobile-menu__index">0{index + 1}</span>
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.6, ease }}
                className="mobile-menu__collections"
              >
                {categories.map((category) => (
                  <Link key={category.slug} to={`/collection?line=${category.slug}`}>
                    {pick(category.nameEn, category.nameAm)}
                  </Link>
                ))}
              </motion.div>
            </nav>

            <div className="mobile-menu__foot container">
              <button type="button" className="btn btn--primary" onClick={() => { setOpen(false); openOrder(); }}>
                {t('nav.order')} <ArrowUpRight size={16} />
              </button>
              <a href={`tel:${settings.contact.phone}`} className="mobile-menu__phone">
                <Phone size={16} /> {settings.contact.phone}
              </a>
              <p className="mobile-menu__address">{pick(settings.contact.addressEn, settings.contact.addressAm)}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
