import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { formatCapacity, formatPrice, useLang } from '../lib/i18n.jsx';
import { useOrder } from '../lib/order.jsx';

export default function ProductCard({ product, categoryLabel = '' }) {
  const { lang, t, pick } = useLang();
  const { openOrder } = useOrder();
  const name = pick(product.nameEn, product.nameAm);
  const badge = pick(product.badgeEn, product.badgeAm);

  return (
    <article className="p-card">
      <Link to={`/product/${product.slug}`} className="p-card__media">
        <div className="plate">
          <img src={product.image} alt={name} loading="lazy" decoding="async" />
        </div>
        {badge ? <span className="p-card__badge">{badge}</span> : null}
        <span className="p-card__hover">
          {t('prod.details')} <ArrowUpRight size={14} strokeWidth={2} />
        </span>
      </Link>

      <div className="p-card__body">
        <div className="p-card__meta">
          <span>{categoryLabel}</span>
          <span className="dot" aria-hidden="true" />
          <span>{formatCapacity(product.capacity, lang)}</span>
        </div>
        <h3 className="p-card__title">
          <Link to={`/product/${product.slug}`}>{name}</Link>
        </h3>
        <div className="p-card__foot">
          <span className={`price ${product.price ? '' : 'price--quote'}`.trim()}>
            {formatPrice(product.price, lang)}
          </span>
          <button type="button" className="btn btn--tiny" onClick={() => openOrder(product)}>
            {t('prod.configure')}
          </button>
        </div>
      </div>
    </article>
  );
}
