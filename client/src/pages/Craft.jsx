import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Droplets, HardHat, Ruler, ShieldCheck, Truck } from 'lucide-react';
import { useLang } from '../lib/i18n.jsx';
import { useSite } from '../lib/site.jsx';
import PageFade from '../components/PageFade.jsx';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal.jsx';
import SectionHead from '../components/SectionHead.jsx';

export default function Craft() {
  const { t, pick } = useLang();
  const { settings } = useSite();

  useEffect(() => {
    document.title = `${t('page.craft.eyebrow')} — Meka Water Tanker`;
  }, [t]);

  const steps = [
    { title: t('craft.s1.title'), text: t('craft.s1.text') },
    { title: t('craft.s2.title'), text: t('craft.s2.text') },
    { title: t('craft.s3.title'), text: t('craft.s3.text') },
    { title: t('craft.s4.title'), text: t('craft.s4.text') },
  ];

  const values = [
    { icon: ShieldCheck, title: t('why.f1.title'), text: t('why.f1.text') },
    { icon: Droplets, title: t('why.f2.title'), text: t('why.f2.text') },
    { icon: Truck, title: t('why.f3.title'), text: t('why.f3.text') },
    { icon: HardHat, title: t('why.f4.title'), text: t('why.f4.text') },
  ];

  return (
    <PageFade>
      <section className="page-hero">
        <div className="page-hero__bg" aria-hidden="true">
          <span className="orb orb--a" />
          <span className="orb orb--b" />
        </div>
        <div className="container page-hero__inner">
          <Reveal className="eyebrow">
            <span className="eyebrow__line" aria-hidden="true" />
            {t('page.craft.eyebrow')}
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="h1">{t('page.craft.title')}</h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lede">{t('page.craft.lede')}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container craft">
          <Reveal className="craft__frame craft__frame--wide">
            <img src="/images/under grond.jpg" alt={pick('Underground tank installation', 'የመሬት ውስጥ ታንከር ገጠማ')} loading="lazy" />
          </Reveal>
          <div className="craft__copy">
            <SectionHead eyebrow={pick('Since day one', 'ከመጀመሪያው ቀን')} title={t('page.craft.storyTitle')} />
            <Reveal delay={0.1}>
              <p className="body-copy">{t('page.craft.story')}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="body-copy">{t('page.craft.story2')}</p>
            </Reveal>
            <Reveal delay={0.2} className="craft__signature">
              <span className="serif">Meka</span>
              <span>{pick('Lideta workshop · Addis Ababa', 'የልደታ ወርክሾፕ · አዲስ አበባ')}</span>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--craft">
        <div className="container">
          <SectionHead eyebrow={pick('Method', 'ዘዴ')} title={t('craft.title')} lede={t('craft.lede')} />
          <Stagger className="steps steps--grid">
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

          <Reveal delay={0.1} className="craft-banner">
            <img src="/images/strong last.jpg" alt={pick('Built for all seasons', 'ለሁሉም ወቅት የተሰራ')} loading="lazy" />
            <div className="craft-banner__overlay">
              <p className="serif">{pick('Built for all seasons.', 'ለሁሉም ወቅት የተሰራ።')}</p>
              <span>{pick('Sun, dust, cold nights — and everything between.', 'ፀሐይ፣ አቧራ፣ ቅዝቃዜ — እና መካከላቸው ያለው ሁሉ።')}</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <SectionHead eyebrow={pick('Principles', 'መርሆች')} title={t('page.craft.values')} align="center" />
          <Stagger className="bento bento--paper">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <StaggerItem key={value.title} className="bento__card">
                  <span className="bento__icon">
                    <Icon size={20} strokeWidth={1.6} />
                  </span>
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="wide-cta">
            <div>
              <Ruler size={22} strokeWidth={1.5} />
              <h2 className="h2">{pick('Measure twice. Build once.', 'ሁለት ጊዜ መለካት። አንድ ጊዜ መስራት።')}</h2>
              <p>
                {pick(
                  'Send us your site — roof, compound or basement — and we will recommend the right capacity before you spend a birr.',
                  'ቦታዎን ይንገሩን — ጣሪያ፣ ግቢ ወይም ምድር ቤት — ከመወጣትዎ በፊት ትክክለኛውን አቅም እንመክርዎታለን።'
                )}
              </p>
            </div>
            <div className="wide-cta__actions">
              <Link to="/contact" className="btn btn--primary">
                {t('cta.form')} <ArrowRight size={17} />
              </Link>
              <a href={`tel:${settings.contact.phone}`} className="btn btn--ghost">
                {settings.contact.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </PageFade>
  );
}
