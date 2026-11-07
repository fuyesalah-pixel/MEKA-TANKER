export default function PartnersMarquee({ items = [] }) {
  if (!items.length) return null;
  const track = [...items, ...items];

  return (
    <div className="partners" aria-label="Partners">
      <div className="partners__track">
        {track.map((item, index) => (
          <div className="partners__item" key={`${item.id}-${index}`}>
            {item.logo ? <img src={item.logo} alt={item.name} loading="lazy" /> : <span>{item.name}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
