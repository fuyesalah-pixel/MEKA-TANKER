import { Star } from 'lucide-react';
import { useLang } from '../lib/i18n.jsx';
import { Stagger, StaggerItem } from './Reveal.jsx';

export default function Testimonials({ items = [] }) {
  const { pick } = useLang();
  if (!items.length) return null;

  return (
    <Stagger className="testimonials">
      {items.map((item) => (
        <StaggerItem key={item.id} className="testimonial">
          <div className="testimonial__stars" aria-label={`${item.rating} out of 5`}>
            {Array.from({ length: item.rating || 5 }).map((_, index) => (
              <Star key={index} size={13} strokeWidth={1.4} fill="currentColor" />
            ))}
          </div>
          <blockquote>“{pick(item.quoteEn, item.quoteAm)}”</blockquote>
          <figcaption className="testimonial__author">
            {item.avatar ? <img src={item.avatar} alt="" loading="lazy" /> : null}
            <span>
              <strong>{item.name}</strong>
              <small>{item.location}</small>
            </span>
          </figcaption>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
