import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useLang } from '../lib/i18n.jsx';
import { useSite } from '../lib/site.jsx';
import { useFetch } from '../lib/useFetch.js';
import PageFade from '../components/PageFade.jsx';
import Reveal, { ease } from '../components/Reveal.jsx';
import ProductCard from '../components/ProductCard.jsx';

export default function Collection() {
  const { t, pick } = useLang();
  const { categories } = useSite();
  const [params, setParams] = useSearchParams();
  const line = params.get('line') || 'all';
  const [query, setQuery] = useState('');

  const { data: products, loading } = useFetch(`/products${line !== 'all' ? `?category=${line}` : ''}`);

  const filtered = useMemo(() => {
    if (!products) return [];
    const needle = query.trim().toLowerCase();
    if (!needle) return products;
    return products.filter((product) =>
      [product.nameEn, product.nameAm, String(product.capacity || '')]
        .join(' ')
        .toLowerCase()
        .includes(needle)
    );
  }, [products, query]);

  const activeCategory = categories.find((category) => category.slug === line);
  const categoryName = (slug) => {
    const found = categories.find((category) => category.slug === slug);
    return found ? pick(found.nameEn, found.nameAm) : '';
  };

  const setLine = (next) => {
    if (next === 'all') setParams({});
    else setParams({ line: next });
  };

  return (
    <PageFade>
      <section className="page-hero">
        <div className="page-hero__bg" aria-hidden="true">
          <span className="orb orb--a" />
        </div>
        <div className="container page-hero__inner">
          <Reveal className="eyebrow">
            <span className="eyebrow__line" aria-hidden="true" />
            {t('page.collection.eyebrow')}
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="h1">
              {activeCategory ? pick(activeCategory.nameEn, activeCategory.nameAm) : t('page.collection.title')}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lede">
              {activeCategory
                ? pick(activeCategory.taglineEn, activeCategory.taglineAm)
                : t('page.collection.lede')}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--flush">
        <div className="container">
          <div className="filters">
            <div className="chips" role="tablist" aria-label={t('page.collection.all')}>
              <button
                type="button"
                className={`chip ${line === 'all' ? 'is-active' : ''}`.trim()}
                onClick={() => setLine('all')}
                role="tab"
                aria-selected={line === 'all'}
              >
                {t('page.collection.all')}
              </button>
              {categories.map((category) => (
                <button
                  type="button"
                  key={category.slug}
                  className={`chip ${line === category.slug ? 'is-active' : ''}`.trim()}
                  onClick={() => setLine(category.slug)}
                  role="tab"
                  aria-selected={line === category.slug}
                >
                  {pick(category.nameEn, category.nameAm)}
                </button>
              ))}
            </div>

            <div className="search">
              <Search size={16} strokeWidth={1.8} />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t('page.collection.search')}
                aria-label={t('page.collection.search')}
              />
              {query ? (
                <button type="button" onClick={() => setQuery('')} aria-label={t('page.collection.reset')}>
                  <X size={15} strokeWidth={2} />
                </button>
              ) : null}
            </div>
          </div>

          <div className="results-bar">
            <span>
              {loading ? t('common.loading') : `${filtered.length} ${t('page.collection.count')}`}
            </span>
            <span className="results-bar__line" aria-hidden="true" />
          </div>

          {loading ? (
            <div className="product-grid">
              {Array.from({ length: 6 }).map((_, index) => (
                <div className="p-card p-card--skeleton" key={index}>
                  <div className="plate skeleton" />
                  <div className="p-card__body">
                    <span className="skeleton skeleton--line" />
                    <span className="skeleton skeleton--line short" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length ? (
            <motion.div
              className="product-grid"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
            >
              {filtered.map((product) => (
                <motion.div
                  key={product.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
                  }}
                >
                  <ProductCard product={product} categoryLabel={categoryName(product.category)} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="empty">
              <p>{t('page.collection.empty')}</p>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => {
                  setQuery('');
                  setLine('all');
                }}
              >
                {t('page.collection.reset')}
              </button>
            </div>
          )}
        </div>
      </section>
    </PageFade>
  );
}
