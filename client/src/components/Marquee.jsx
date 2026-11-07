export default function Marquee({ items, className = '', speed = 40, separator = '·' }) {
  const track = [...items, ...items];
  return (
    <div className={`marquee ${className}`.trim()} aria-hidden="true">
      <div className="marquee__track" style={{ animationDuration: `${speed}s` }}>
        {track.map((item, index) => (
          <span className="marquee__item" key={`${item}-${index}`}>
            {item}
            <span className="marquee__sep">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
