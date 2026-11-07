import Reveal from './Reveal.jsx';

export default function SectionHead({
  eyebrow,
  title,
  lede,
  action = null,
  align = 'left',
  className = '',
}) {
  return (
    <div className={`section-head section-head--${align} ${className}`.trim()}>
      <div className="section-head__text">
        {eyebrow ? (
          <Reveal className="eyebrow" y={14}>
            <span className="eyebrow__line" aria-hidden="true" />
            {eyebrow}
          </Reveal>
        ) : null}
        <Reveal delay={0.06}>
          <h2 className="h2">{title}</h2>
        </Reveal>
        {lede ? (
          <Reveal delay={0.12}>
            <p className="lede">{lede}</p>
          </Reveal>
        ) : null}
      </div>
      {action ? (
        <Reveal delay={0.16} className="section-head__action">
          {action}
        </Reveal>
      ) : null}
    </div>
  );
}
