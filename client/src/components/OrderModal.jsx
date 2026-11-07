import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, X } from 'lucide-react';
import { api } from '../lib/api.js';
import { useLang, formatPrice, formatCapacity } from '../lib/i18n.jsx';
import { useOrder } from '../lib/order.jsx';
import { ease } from './Reveal.jsx';

const empty = {
  customerName: '',
  phone: '',
  email: '',
  address: '',
  productId: '',
  quantity: 1,
  notes: '',
};

export default function OrderModal() {
  const { open, product, closeOrder } = useOrder();
  const { t, lang, pick } = useLang();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [reference, setReference] = useState('');

  useEffect(() => {
    if (!open) return;
    setStatus('idle');
    setError('');
    setReference('');
    setForm({ ...empty, productId: product ? String(product.id) : '' });
    api
      .get('/products')
      .then(setProducts)
      .catch(() => setProducts([]));
  }, [open, product]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') closeOrder();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, closeOrder]);

  const set = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const selected = products.find((item) => String(item.id) === String(form.productId));

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    if (form.customerName.trim().length < 2 || form.phone.replace(/\D/g, '').length < 9) {
      setError(t('order.err'));
      return;
    }
    setStatus('loading');
    try {
      const result = await api.post('/orders', {
        ...form,
        productId: form.productId ? Number(form.productId) : null,
        quantity: Number(form.quantity) || 1,
      });
      setReference(result.reference);
      setStatus('done');
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeOrder();
          }}
        >
          <motion.div
            className="modal__panel order-panel"
            role="dialog"
            aria-modal="true"
            aria-label={t('order.title')}
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.5, ease }}
          >
            <button type="button" className="modal__close" onClick={closeOrder} aria-label={t('order.close')}>
              <X size={20} strokeWidth={1.8} />
            </button>

            {status === 'done' ? (
              <div className="order-done">
                <motion.span
                  className="order-done__icon"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease }}
                >
                  <Check size={26} strokeWidth={2.2} />
                </motion.span>
                <h3>{t('order.successTitle')}</h3>
                <p>{t('order.successText')}</p>
                <div className="order-done__ref">
                  <span>{t('order.reference')}</span>
                  <strong>{reference}</strong>
                </div>
                <button type="button" className="btn btn--primary" onClick={closeOrder}>
                  {t('order.close')}
                </button>
              </div>
            ) : (
              <>
                <header className="order-panel__head">
                  <span className="eyebrow">
                    <span className="eyebrow__line" aria-hidden="true" />
                    Meka Water Tanker
                  </span>
                  <h3 className="h3">{t('order.title')}</h3>
                  <p>{t('order.lede')}</p>
                </header>

                <form className="order-form" onSubmit={submit}>
                  <div className="field field--full">
                    <label htmlFor="order-product">{t('order.product')}</label>
                    <select id="order-product" value={form.productId} onChange={set('productId')}>
                      <option value="">{t('order.productPlaceholder')}</option>
                      {products.map((item) => (
                        <option key={item.id} value={item.id}>
                          {pick(item.nameEn, item.nameAm)} — {formatCapacity(item.capacity, lang)} ·{' '}
                          {formatPrice(item.price, lang)}
                        </option>
                      ))}
                    </select>
                    {selected ? (
                      <span className="field__hint">
                        {formatCapacity(selected.capacity, lang)} · {formatPrice(selected.price, lang)}
                      </span>
                    ) : null}
                  </div>

                  <div className="field">
                    <label htmlFor="order-name">
                      {t('order.name')} <span>*</span>
                    </label>
                    <input id="order-name" value={form.customerName} onChange={set('customerName')} required />
                  </div>

                  <div className="field">
                    <label htmlFor="order-phone">
                      {t('order.phone')} <span>*</span>
                    </label>
                    <input id="order-phone" type="tel" value={form.phone} onChange={set('phone')} required />
                  </div>

                  <div className="field">
                    <label htmlFor="order-email">{t('order.email')}</label>
                    <input id="order-email" type="email" value={form.email} onChange={set('email')} />
                  </div>

                  <div className="field">
                    <label htmlFor="order-qty">{t('order.quantity')}</label>
                    <input
                      id="order-qty"
                      type="number"
                      min="1"
                      max="999"
                      value={form.quantity}
                      onChange={set('quantity')}
                    />
                  </div>

                  <div className="field field--full">
                    <label htmlFor="order-address">{t('order.address')}</label>
                    <input id="order-address" value={form.address} onChange={set('address')} />
                  </div>

                  <div className="field field--full">
                    <label htmlFor="order-notes">{t('order.notes')}</label>
                    <textarea
                      id="order-notes"
                      rows="3"
                      value={form.notes}
                      onChange={set('notes')}
                      placeholder={t('order.notesPlaceholder')}
                    />
                  </div>

                  {error ? <p className="form-error field--full">{error}</p> : null}

                  <div className="order-form__foot field--full">
                    <button type="submit" className="btn btn--primary" disabled={status === 'loading'}>
                      {status === 'loading' ? t('order.submitting') : t('order.submit')}
                      <ArrowRight size={17} strokeWidth={2} />
                    </button>
                    <button type="button" className="btn btn--ghost" onClick={closeOrder}>
                      {t('order.close')}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
