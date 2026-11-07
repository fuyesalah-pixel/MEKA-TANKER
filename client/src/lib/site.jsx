import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api } from './api.js';

const SiteContext = createContext(null);

const fallbackSettings = {
  brand: {
    nameEn: 'Meka Water Tanker',
    nameAm: 'መካ የውሀ ታንከር',
    taglineEn: 'Water, held to a higher standard.',
    taglineAm: 'እኛ እያለን ውሀ አይጠማዎትም።',
  },
  contact: {
    phone: '+251909911551',
    phoneAlt: '',
    whatsapp: '+251909911551',
    email: 'info@mekatanker.com',
    addressEn: 'Lideta, Addis Ababa, Ethiopia',
    addressAm: 'ልደታ፣ አዲስ አበባ፣ ኢትዮጵያ',
    hoursEn: 'Mon – Sat · 8:00 AM – 6:00 PM',
    hoursAm: 'ሰኞ – ቅዳሜ · ከጠዋቱ 2:00 – ከሰዓት 12:00',
  },
  socials: {},
  stats: [],
};

export function SiteProvider({ children }) {
  const [settings, setSettings] = useState(fallbackSettings);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const [nextSettings, nextCategories] = await Promise.all([
        api.get('/settings'),
        api.get('/categories'),
      ]);
      setSettings({
        ...fallbackSettings,
        ...nextSettings,
        brand: { ...fallbackSettings.brand, ...(nextSettings.brand || {}) },
        contact: { ...fallbackSettings.contact, ...(nextSettings.contact || {}) },
        socials: nextSettings.socials || {},
      });
      setCategories(nextCategories);
    } catch {
      /* keep fallbacks so the site still renders */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const value = useMemo(
    () => ({ settings, categories, loading, reload: load }),
    [settings, categories, loading, load]
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used inside SiteProvider');
  return ctx;
}
