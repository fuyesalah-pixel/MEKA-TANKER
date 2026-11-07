import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Droplets, ShieldCheck, Truck } from 'lucide-react';
import { api } from '../lib/api.js';
import { formatCapacity, formatPrice, useLang } from '../lib/i18n.jsx';
import { useSite } from '../lib/site.jsx';
import { useOrder } from '../lib/order.jsx';
import PageFade from '../components/PageFade.jsx';
import Reveal, { ease } from '../components/Reveal.jsx';
import ProductCard from '../components/ProductCard.jsx';

export default function ProductDetail() {
  const { slug } = useParams();
  const { t, pick, lang } = useLang();
  const { categories } = useSite();
  const { openOrder } = useOrder();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError('');
    api
      .get(`/products/${slug}`)
      .then((data) => {
        if (!alive) return;
        setProduct(data);
        setActiveImage(data.gallery?.[0] || data.image);
        return api.get(`/products?category=${data.category}`);
      })
      .then((list) => {
        if (!alive || !list) return;
        setRelated(list.filter((item) => item.slug !== slug).slice(0, 3));
      })
      .catch((err) => alive && setError(err.message))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [slug]);

  const category = useMemo(
    () => categories.find((item) => item.slug === product?.category),
    [categories, product]
  );

  useEffect(() => {
    if (product) {
      document.title = `${pick(product.nameEn, product.nameAm)} — Meka Water Tanker`;
    }
  }, [product, pick]);

  if (loading) {
    return (
      <PageFade>
        <div className="container product-page">
          <div className="product-page__media">
            <div className="product-page__stage skeleton" style={{ aspectRatio: '1 / 1' }} />
          </div>
          <div className="product-page__info">
            <span className="skeleton skeleton--line" />
            <span className="skeleton skeleton--line short" />
            <span className="skeleton skeleton--block" />
          </div>
        </div>
      </PageFade>
    );
  }

  if (error || !product) {
    return (
      <PageFade>
        <div className="container empty" style={{ paddingTop: 160 }}>
          <h1 className="h2">{t('prodpage.notFound')}</h1>
          <Link to="/collection" className="btn btn--ghost">
            <ArrowLeft size={16} /> {t('prodpage.back')}
          </Link>
        </div>
      </PageFade>
    );
  }

  const name = pick(product.nameEn, product.nameAm);
  const features = (lang === 'am' ? product.featuresAm : product.featuresEn) || [];
  const gallery = product.gallery?.length ? product.gallery : [product.image];

  return (
    <PageFade>
      <div className="container product-page">
        <div className="product-page__media">
          <Link to="/collection" className="product-page__back">
            <ArrowLeft size={15} strokeWidth={1.8} /> {t('prodpage.back')}
          </Link>

          <motion.div
            className="product-page__stage"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <img src={activeImage} alt={name} />
            {product.badgeEn ? (
              <span className="product-page__badge">{pick(product.badgeEn, product.badgeAm)}</span>
            ) : null}
          </motion.div>

          {gallery.length > 1 ? (
            <div className="product-page__thumbs">
              {gallery.map((image) => (
                <button
                  type="button"
                  key={image}
                  className={`thumb ${image === activeImage ? 'is-active' : ''}`.trim()}
                  onClick={() => setActiveImage(image)}
                  aria-label={name}
                >
                  <img src={image} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="product-page__info">
          <Reveal className="eyebrow">
            <span className="eyebrow__line" aria-hidden="true" />
            {category ? pick(category.nameEn, category.nameAm) : product.category}
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="h1 product-page__title">{name}</h1>
          </Reveal>

          <Reveal delay={0.1} className="product-page__price-row">
            <span className="product-page__price">{formatPrice(product.price, lang)}</span>
            <span className={`pill ${product.inStock ? 'pill--ok' : 'pill--soft'}`.trim()}>
              {product.inStock ? t('prod.instock') : t('prod.madeorder')}
            </span>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="product-page__desc">{pick(product.descriptionEn, product.descriptionAm)}</p>
          </Reveal>

          <Reveal delay={0.18} className="product-page__actions">
            <button type="button" className="btn btn--primary" onClick={() => openOrder(product)}>
              {t('prodpage.order')} <ArrowRight size={17} strokeWidth={2} />
            </button>
            <Link to="/contact" className="btn btn--ghost">
              {t('prodpage.ask')}
            </Link>
          </Reveal>

          {features.length ? (
            <Reveal delay={0.22} className="product-page__features">
              <h3>{t('prodpage.features')}</h3>
              <ul>
                {features.map((feature) => (
                  <li key={feature}>
                    <Check size={15} strokeWidth={2.2} /> {feature}
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}

          <Reveal delay={0.26} className="specs">
            <div className="specs__row">
              <span>{t('prodpage.capacity')}</span>
              <strong>{formatCapacity(product.capacity, lang)}</strong>
            </div>
            <div className="specs__row">
              <span>{t('prodpage.category')}</span>
              <strong>{category ? pick(category.nameEn, category.nameAm) : product.category}</strong>
            </div>
            <div className="specs__row">
              <span>{t('prodpage.warranty')}</span>
              <strong>{t('prodpage.warrantyValue')}</strong>
            </div>
            <div className="specs__row">
              <span>{t('prodpage.install')}</span>
              <strong>{t('prodpage.installValue')}</strong>
            </div>
          </Reveal>

          <Reveal delay={0.3} className="assurance">
            <span>
              <ShieldCheck size={16} strokeWidth={1.7} /> {t('prodpage.warrantyValue')}
            </span>
            <span>
              <Droplets size={16} strokeWidth={1.7} /> {pick('Food-grade', 'ለምግብ ተስማሚ')}
            </span>
            <span>
              <Truck size={16} strokeWidth={1.7} /> {pick('Delivered & installed', 'ተጓጉዞ ይገጠማል')}
            </span>
          </Reveal>
        </div>
      </div>

      <section className="section custom-cta">
        <div className="container custom-cta__inner">
          <p>{t('prodpage.needHelp')}</p>
          <Link to="/contact" className="link-arrow">
            {t('prodpage.needHelpCta')} <ArrowRight size={15} strokeWidth={2} />
          </Link>
        </div>
      </section>

      {related.length ? (
        <section className="section section--flush">
          <div className="container">
            <h2 className="h3 section-sub">{t('prodpage.related')}</h2>
            <div className="product-grid">
              {related.map((item, index) => (
                <Reveal key={item.id} delay={index * 0.06}>
                  <ProductCard product={item} categoryLabel={category ? pick(category.nameEn, category.nameAm) : ''} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </PageFade>
  );
}
