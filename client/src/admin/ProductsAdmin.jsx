import { useEffect, useMemo, useState } from 'react';
import { Pencil, Plus, Search } from 'lucide-react';
import { api } from '../lib/api.js';
import { ConfirmButton, Drawer, EmptyState, Field, Notice, Toggle, money } from './ui.jsx';

const blank = {
  category_slug: 'fiber',
  slug: '',
  name_en: '',
  name_am: '',
  capacity_l: '',
  price_etb: '',
  description_en: '',
  description_am: '',
  features_en: '',
  features_am: '',
  image: '/images/fi1.png',
  gallery: '',
  badge_en: '',
  badge_am: '',
  in_stock: true,
  featured: false,
  is_active: true,
  sort_order: 0,
};

const linesToArray = (value) =>
  String(value || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

const arrayToLines = (value) => (Array.isArray(value) ? value.join('\n') : '');

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState('');
  const [line, setLine] = useState('all');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);
  const [error, setError] = useState('');

  const load = () => {
    Promise.all([api.adminGet('/products'), api.get('/categories')])
      .then(([list, cats]) => {
        setProducts(list);
        setCategories(cats);
      })
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesLine = line === 'all' || product.category === line;
      const needle = query.trim().toLowerCase();
      const matchesQuery =
        !needle ||
        [product.nameEn, product.nameAm, product.slug].join(' ').toLowerCase().includes(needle);
      return matchesLine && matchesQuery;
    });
  }, [products, line, query]);

  const startNew = () => {
    setEditing(null);
    setForm({ ...blank, category_slug: categories[0]?.slug || 'fiber' });
    setOpen(true);
  };

  const startEdit = (product) => {
    setEditing(product);
    setForm({
      category_slug: product.category,
      slug: product.slug,
      name_en: product.nameEn,
      name_am: product.nameAm,
      capacity_l: product.capacity ?? '',
      price_etb: product.price || '',
      description_en: product.descriptionEn,
      description_am: product.descriptionAm,
      features_en: arrayToLines(product.featuresEn),
      features_am: arrayToLines(product.featuresAm),
      image: product.image,
      gallery: (product.gallery || []).join('\n'),
      badge_en: product.badgeEn || '',
      badge_am: product.badgeAm || '',
      in_stock: product.inStock,
      featured: product.featured,
      is_active: product.isActive !== false,
      sort_order: product.sortOrder || 0,
    });
    setOpen(true);
  };

  const set = (key) => (event) =>
    setForm((prev) => ({ ...prev, [key]: event.target.type === 'checkbox' ? event.target.checked : event.target.value }));

  const save = async () => {
    setSaving(true);
    setError('');
    const payload = {
      category_slug: form.category_slug,
      slug: form.slug.trim(),
      name_en: form.name_en.trim(),
      name_am: form.name_am.trim(),
      capacity_l: form.capacity_l === '' ? null : Number(form.capacity_l),
      price_etb: Number(form.price_etb) || 0,
      description_en: form.description_en,
      description_am: form.description_am,
      features_en: linesToArray(form.features_en),
      features_am: linesToArray(form.features_am),
      image: form.image,
      gallery: linesToArray(form.gallery),
      badge_en: form.badge_en,
      badge_am: form.badge_am,
      in_stock: form.in_stock,
      featured: form.featured,
      is_active: form.is_active,
      sort_order: Number(form.sort_order) || 0,
    };
    if (!payload.slug || !payload.name_en) {
      setError('Slug and English name are required.');
      setSaving(false);
      return;
    }
    try {
      if (editing) await api.adminPut(`/products/${editing.id}`, payload);
      else await api.adminPost('/products', payload);
      setOpen(false);
      setNotice(editing ? 'Product updated.' : 'Product created.');
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (product) => {
    try {
      await api.adminDelete(`/products/${product.id}`);
      setNotice('Product deleted.');
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const categoryLabel = (slug) => categories.find((category) => category.slug === slug)?.nameEn || slug;

  return (
    <div className="ad-page">
      <header className="ad-page__head">
        <div>
          <span className="ad-page__eyebrow">Catalogue</span>
          <h1>Products</h1>
          <p>{products.length} models across {categories.length} lines.</p>
        </div>
        <button type="button" className="btn btn--primary btn--sm" onClick={startNew}>
          <Plus size={16} /> New product
        </button>
      </header>

      <Notice text={notice} onClose={() => setNotice(null)} />
      <Notice text={error} tone="error" onClose={() => setError('')} />

      <div className="ad-toolbar">
        <div className="ad-search">
          <Search size={15} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search models" />
        </div>
        <div className="chips">
          <button type="button" className={`chip ${line === 'all' ? 'is-active' : ''}`.trim()} onClick={() => setLine('all')}>
            All
          </button>
          {categories.map((category) => (
            <button
              type="button"
              key={category.slug}
              className={`chip ${line === category.slug ? 'is-active' : ''}`.trim()}
              onClick={() => setLine(category.slug)}
            >
              {category.nameEn}
            </button>
          ))}
        </div>
      </div>

      <div className="ad-panel">
        {filtered.length ? (
          <div className="ad-table-wrap">
            <table className="ad-table">
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Line</th>
                  <th>Capacity</th>
                  <th>Price</th>
                  <th>Visibility</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="ad-product">
                        <span className={`ad-product__thumb ${product.isActive ? '' : 'is-hidden'}`.trim()}>
                          <img src={product.image} alt="" loading="lazy" />
                        </span>
                        <div>
                          <strong>{product.nameEn}</strong>
                          <small>{product.slug}</small>
                        </div>
                      </div>
                    </td>
                    <td>{categoryLabel(product.category)}</td>
                    <td>{product.capacity ? `${product.capacity.toLocaleString()} L` : 'Custom'}</td>
                    <td>{money(product.price)}</td>
                    <td>
                      <div className="ad-flags">
                        {product.featured ? <span className="ad-flag">Featured</span> : null}
                        {product.isActive === false ? <span className="ad-flag ad-flag--muted">Hidden</span> : null}
                        {!product.inStock ? <span className="ad-flag ad-flag--muted">Made to order</span> : null}
                        {product.isActive !== false && product.inStock ? (
                          <span className="ad-flag ad-flag--ok">Live</span>
                        ) : null}
                      </div>
                    </td>
                    <td>
                      <div className="ad-row-actions">
                        <button type="button" className="ad-btn ad-btn--ghost" onClick={() => startEdit(product)}>
                          <Pencil size={14} /> Edit
                        </button>
                        <ConfirmButton onConfirm={() => remove(product)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState title="No models in this view" text="Adjust the filter or add a new product." />
        )}
      </div>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? 'Edit product' : 'New product'}
        subtitle={editing ? editing.slug : 'Add a model to the catalogue'}
        footer={
          <>
            <button type="button" className="btn btn--ghost" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="button" className="btn btn--primary" onClick={save} disabled={saving}>
              {saving ? 'Saving…' : 'Save product'}
            </button>
          </>
        }
      >
        <div className="ad-form">
          <Field label="Line">
            <select value={form.category_slug} onChange={set('category_slug')}>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.nameEn} / {category.nameAm}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Slug" hint="URL-safe, unique">
            <input value={form.slug} onChange={set('slug')} placeholder="fiber-2000" />
          </Field>
          <Field label="Name (English)">
            <input value={form.name_en} onChange={set('name_en')} />
          </Field>
          <Field label="Name (Amharic)">
            <input value={form.name_am} onChange={set('name_am')} />
          </Field>
          <Field label="Capacity (litres)" hint="Leave empty for custom builds">
            <input type="number" value={form.capacity_l} onChange={set('capacity_l')} />
          </Field>
          <Field label="Price (ETB)" hint="0 shows 'Price on request'">
            <input type="number" value={form.price_etb} onChange={set('price_etb')} />
          </Field>
          <Field label="Description (English)" full>
            <textarea rows="3" value={form.description_en} onChange={set('description_en')} />
          </Field>
          <Field label="Description (Amharic)" full>
            <textarea rows="3" value={form.description_am} onChange={set('description_am')} />
          </Field>
          <Field label="Features (English)" hint="One per line" full>
            <textarea rows="4" value={form.features_en} onChange={set('features_en')} />
          </Field>
          <Field label="Features (Amharic)" hint="One per line" full>
            <textarea rows="4" value={form.features_am} onChange={set('features_am')} />
          </Field>
          <Field label="Primary image path / URL">
            <input value={form.image} onChange={set('image')} />
          </Field>
          <Field label="Badge (English)">
            <input value={form.badge_en} onChange={set('badge_en')} placeholder="Best seller" />
          </Field>
          <Field label="Gallery images" hint="One path per line" full>
            <textarea rows="3" value={form.gallery} onChange={set('gallery')} />
          </Field>
          <Field label="Sort order">
            <input type="number" value={form.sort_order} onChange={set('sort_order')} />
          </Field>
          <Field label="Preview">
            <span className="ad-preview">
              {form.image ? <img src={form.image} alt="" /> : null}
            </span>
          </Field>
          <div className="ad-form__toggles ad-field--full">
            <Toggle label="In stock" checked={form.in_stock} onChange={(value) => setForm((p) => ({ ...p, in_stock: value }))} />
            <Toggle label="Featured" checked={form.featured} onChange={(value) => setForm((p) => ({ ...p, featured: value }))} />
            <Toggle label="Visible on site" checked={form.is_active} onChange={(value) => setForm((p) => ({ ...p, is_active: value }))} />
          </div>
          {error ? <p className="form-error ad-field--full">{error}</p> : null}
        </div>
      </Drawer>
    </div>
  );
}
