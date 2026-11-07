import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Droplets, ShieldCheck, Truck, Wrench } from 'lucide-react';
import { useLang } from '../lib/i18n.jsx';
import { useSite } from '../lib/site.jsx';
import { useOrder } from '../lib/order.jsx';
import { useFetch } from '../lib/useFetch.js';
import Reveal, { Stagger, StaggerItem, ease } from '../components/Reveal.jsx';
import SectionHead from '../components/SectionHead.jsx';
import Marquee from '../components/Marquee.jsx';
import ProductCard from '../components/ProductCard.jsx';
import Testimonials from '../components/Testimonials.jsx';
import PartnersMarquee from '../components/PartnersMarquee.jsx';
import FaqAccordion from '../components/FaqAccordion.jsx';
import PageFade from '../components/PageFade.jsx';
import WaterBackdrop from '../components/WaterBackdrop.jsx';

const fallbackStats = [
  { value: '10', suffix: 'yr', labelEn: 'Written warranty', labelAm: 'የፃፍ ዋስትና' },
  { value: '25,000', suffix: 'L', labelEn: 'Largest capacity', labelAm: 'ከፍተኛ አቅም' },
  { value: '5,000', suffix: '+', labelEn: 'Tanks installed', labelAm: 'የተገጠሙ ታንከሮች' },
  { value: '48', suffix: 'hr', labelEn: 'City delivery', labelAm: 'በከተማ ውስጥ አቅርቦት' },
];

export default function Home() {
  const { t, pick } = useLang();
  const { settings, categories } = useSite();
  const { openOrder } = useOrder();
  const reduce = useReducedMotion();
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40]);

  const { data: featured } = useFetch('/products?featured=true');
  const { data: allProducts } = useFetch('/products');
  const { data: testimonials } = useFetch('/testimonials');
  const { data: faqs } = useFetch('/faqs');
  const { data: partners } = useFetch('/partners');

  const stats = settings.stats?.length ? settings.stats : fallbackStats;
  const categoryName = (slug) => {
    const found = categories.find((category) => category.slug === slug);
    return found ? pick(found.nameEn, found.nameAm) : slug;
  };

  let showcase = (featured || []).slice(0, 4);
  if (showcase.length < 4 && allProducts?.length) {
    const ids = new Set(showcase.map((item) => item.id));
    showcase = [...showcase, ...allProducts.filter((item) => !ids.has(item.id))].slice(0, 4);
  }

  const marqueeItems = [
    t('marquee.1'),
    t('marquee.2'),
    t('marquee.3'),
    t('marquee.4'),
    t('marquee.5'),
    t('marquee.6'),
  ];

  const why = [
    { icon: ShieldCheck, title: t('why.f1.title'), text: t('why.f1.text') },
    { icon: Droplets, title: t('why.f2.title'), text: t('why.f2.text') },
    { icon: Truck, title: t('why.f3.title'), text: t('why.f3.text') },
    { icon: Wrench, title: t('why.f4.title'), text: t('why.f4.text') },
  ];

  const steps = [
    { title: t('craft.s1.title'), text: t('craft.s1.text') },
    { title: t('craft.s2.title'), text: t('craft.s2.text') },
    { title: t('craft.s3.title'), text: t('craft.s3.text') },
    { title: t('craft.s4.title'), text: t('craft.s4.text') },
  ];

  useEffect(() => {
    document.title = pick(
      'Meka Water Tanker — Water, held to a higher standard.',
      'መካ የውሀ ታንከር — እኛ እያለን ውሀ አይጠማዎትም።'
    );
  }, [pick]);

  return (
    <PageFade>
      {/* ---------------------------------------------------------------- hero */}
      <section className="hero" ref={heroRef}>
        <div className="hero__bg" aria-hidden="true">
          <span className="orb orb--a" />
          <span className="orb orb--b" />
          <span className="orb orb--c" />
          <span className="hero__grid" />
          <span className="hero__ring hero__ring--1" />
          <span className="hero__ring hero__ring--2" />
          <WaterBackdrop />
        </div>

        <div className="container hero__inner">
          <motion.div className="hero__copy" style={{ y: copyY }}>
            <motion.span
              className="hero__eyebrow"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              <span className="pulse" aria-hidden="true" />
              {t('hero.eyebrow')}
            </motion.span>

            <motion.h1
              className="hero__title"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.08 }}
            >
              {t('hero.title1')}{' '}
              <em className="serif">{t('hero.title2')}</em>
            </motion.h1>

            <motion.p
              className="hero__lede"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.18 }}
            >
              {t('hero.lede')}
            </motion.p>

            <motion.div
              className="hero__cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.26 }}
            >
              <Link to="/collection" className="btn btn--primary">
                {t('hero.explore')} <ArrowRight size={17} strokeWidth={2} />
              </Link>
              <button type="button" className="btn btn--ghost" onClick={() => openOrder()}>
                {t('hero.talk')} <ArrowUpRight size={17} strokeWidth={2} />
              </button>
            </motion.div>

            <motion.dl
              className="hero__stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              {stats.map((stat) => (
                <div key={stat.labelEn} className="hero__stat">
                  <dt>{pick(stat.labelEn, stat.labelAm)}</dt>
                  <dd>
                    {stat.value}
                    <span>{stat.suffix}</span>
                  </dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          <motion.div
            className="hero__visual"
            style={{ y: visualY }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease, delay: 0.1 }}
          >
            <div className="hero__frame">
              <img
                src="/images/strong last.jpg"
                alt={pick(
                  'A Meka tank standing in rain and sun — built for all seasons',
                  'የመካ ታንከር በዝናብ እና በፀሐይ ውስጥ — ለሁሉም ወቅት የተሰራ'
                )}
                fetchpriority="high"
              />
              <span className="hero__frame-glow" aria-hidden="true" />
            </div>

            <motion.div
              className="hero__badge hero__badge--tl"
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.6 }}
            >
              <ShieldCheck size={18} strokeWidth={1.7} />
              <div>
                <strong>{t('hero.card2.title')}</strong>
                <span>{t('hero.card2.text')}</span>
              </div>
            </motion.div>

            <motion.div
              className="hero__badge hero__badge--br"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.72 }}
            >
              <Droplets size={18} strokeWidth={1.7} />
              <div>
                <strong>{t('hero.card1.title')}</strong>
                <span>{t('hero.card1.text')}</span>
              </div>
            </motion.div>

            <span className="hero__watermark" aria-hidden="true">
              መካ
            </span>
          </motion.div>
        </div>

        <div className="container hero__foot">
          <span className="hero__scroll">
            <ArrowDownRight size={15} strokeWidth={1.6} />
            {t('hero.scroll')}
          </span>
          <span className="hero__since">{pick('Lideta · Addis Ababa', 'ልደታ · አዲስ አበባ')}</span>
        </div>
      </section>

      {/* ------------------------------------------------------------- marquee */}
      <Marquee items={marqueeItems} speed={46} />

      {/* --------------------------------------------------------- collections */}
      <section className="section" id="collection">
        <div className="container">
          <SectionHead
            eyebrow={t('coll.eyebrow')}
            title={t('coll.title')}
            lede={t('coll.lede')}
            action={
              <Link to="/collection" className="link-arrow">
                {t('prod.all')} <ArrowUpRight size={15} strokeWidth={2} />
              </Link>
            }
          />

          <Stagger className="coll-grid">
            {categories.map((category, index) => (
              <StaggerItem key={category.slug} className="coll-card">
                <Link to={`/collection?line=${category.slug}`} className="coll-card__link">
                  <div className="coll-card__media">
                    <img
                      src={category.image}
                      alt={pick(category.nameEn, category.nameAm)}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="coll-card__veil" aria-hidden="true" />
                  </div>
                  <span className="coll-card__index">0{index + 1}</span>
                  <div className="coll-card__body">
                    <h3>{pick(category.nameEn, category.nameAm)}</h3>
                    <p>{pick(category.taglineEn, category.taglineAm)}</p>
                    <span className="coll-card__cta">
                      {t('coll.view')} <ArrowUpRight size={15} strokeWidth={2} />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ------------------------------------------------------------ products */}
      <section className="section section--products">
        <div className="container">
          <SectionHead
            eyebrow={t('prod.eyebrow')}
            title={t('prod.title')}
            lede={t('prod.lede')}
            align="left"
            action={
              <Link to="/collection" className="link-arrow">
                {t('prod.all')} <ArrowUpRight size={15} strokeWidth={2} />
              </Link>
            }
          />

          <div className="product-grid">
            {showcase.length
              ? showcase.map((product, index) => (
                  <Reveal key={product.id} delay={index * 0.06}>
                    <ProductCard product={product} categoryLabel={categoryName(product.category)} />
                  </Reveal>
                ))
              : Array.from({ length: 4 }).map((_, index) => (
                  <div className="p-card p-card--skeleton" key={index}>
                    <div className="plate skeleton" />
                    <div className="p-card__body">
                      <span className="skeleton skeleton--line" />
                      <span className="skeleton skeleton--line short" />
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- craft */}
      <section className="section section--craft" id="craft">
        <div className="container craft">
          <div className="craft__media">
            <Reveal className="craft__frame">
              <img
                src="/images/our goal.jpg"
                alt={pick('The Meka workshop', 'የመካ ወርክሾፕ')}
                loading="lazy"
              />
            </Reveal>
            <Reveal delay={0.12} className="craft__quote">
              <p>{t('craft.quote')}</p>
              <span>{t('craft.quoteBy')}</span>
            </Reveal>
          </div>

          <div className="craft__copy">
            <SectionHead eyebrow={t('craft.eyebrow')} title={t('craft.title')} lede={t('craft.lede')} />
            <Stagger className="steps">
              {steps.map((step, index) => (
                <StaggerItem key={step.title} className="step">
                  <span className="step__num">0{index + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.2}>
              <Link to="/craft" className="link-arrow">
                {pick('Inside the workshop', 'ወርክሾፉን ይጎብኙ')} <ArrowUpRight size={15} strokeWidth={2} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- why */}
      <section className="section section--why">
        <div className="container">
          <SectionHead eyebrow={t('why.eyebrow')} title={t('why.title')} />
          <Stagger className="bento">
            {why.map((item, index) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title} className={`bento__card bento__card--${index + 1}`}>
                  <span className="bento__icon">
                    <Icon size={20} strokeWidth={1.6} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* -------------------------------------------------------- testimonials */}
      <section className="section section--paper">
        <div className="container">
          <SectionHead
            eyebrow={t('test.eyebrow')}
            title={t('test.title')}
            lede={t('test.lede')}
            align="center"
          />
          <Testimonials items={testimonials || []} />
        </div>
      </section>

      {/* ------------------------------------------------------------ partners */}
      <section className="section section--partners">
        <div className="container">
          <p className="partners__eyebrow">{t('partners.eyebrow')}</p>
        </div>
        <PartnersMarquee items={partners || []} />
      </section>

      {/* ----------------------------------------------------------------- faq */}
      <section className="section" id="faq">
        <div className="container faq-layout">
          <div className="faq-layout__head">
            <SectionHead eyebrow={t('faq.eyebrow')} title={t('faq.title')} lede={t('faq.lede')} />
            <Reveal delay={0.15}>
              <a href={`tel:${settings.contact.phone}`} className="faq-layout__phone">
                <span>{pick('Still have a question?', 'አሁንም ጥያቄ አለዎት?')}</span>
                <strong>{settings.contact.phone}</strong>
              </a>
            </Reveal>
          </div>
          <FaqAccordion items={faqs || []} />
        </div>
      </section>

      {/* ----------------------------------------------------------------- cta */}
      <section className="section cta-section">
        <div className="container">
          <Reveal className="cta">
            <span className="cta__glow" aria-hidden="true" />
            <div className="cta__copy">
              <span className="eyebrow">
                <span className="eyebrow__line" aria-hidden="true" />
                {pick('Order · Survey · Install', 'ትዕዛዝ · ምርመራ · ገጠማ')}
              </span>
              <h2 className="h2">{t('cta.title')}</h2>
              <p>{t('cta.lede')}</p>
            </div>
            <div className="cta__actions">
              <button type="button" className="btn btn--primary" onClick={() => openOrder()}>
                {t('nav.order')} <ArrowRight size={17} strokeWidth={2} />
              </button>
              <Link to="/contact" className="btn btn--ghost">
                {t('cta.form')} <ArrowUpRight size={17} strokeWidth={2} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageFade>
  );
}
