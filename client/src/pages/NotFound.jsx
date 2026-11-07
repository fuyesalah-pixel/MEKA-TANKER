import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '../lib/i18n.jsx';
import PageFade from '../components/PageFade.jsx';

export default function NotFound() {
  const { pick } = useLang();
  return (
    <PageFade>
      <div className="container empty" style={{ minHeight: '70vh', paddingTop: 160 }}>
        <span className="eyebrow">
          <span className="eyebrow__line" aria-hidden="true" />
          404
        </span>
        <h1 className="h1">{pick('Nowhere near the workshop.', 'ከወርክሾፉ ውጪ።')}</h1>
        <p className="lede">
          {pick(
            'That page has been moved or never existed. The collection is a better place to start.',
            'ይህ ገፅ ተንቀሳቅሷል ወይም አልነበረም። ከምርቶቻችን ይጀምሩ።'
          )}
        </p>
        <Link to="/" className="btn btn--primary">
          <ArrowLeft size={16} /> {pick('Back home', 'ወደ ዋና ገፅ')}
        </Link>
      </div>
    </PageFade>
  );
}
