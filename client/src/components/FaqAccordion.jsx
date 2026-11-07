import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useLang } from '../lib/i18n.jsx';
import Reveal, { ease } from './Reveal.jsx';

export default function FaqAccordion({ items = [] }) {
  const { pick } = useLang();
  const [openId, setOpenId] = useState(items[0]?.id ?? null);

  if (!items.length) return null;

  return (
    <div className="faq">
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        return (
          <Reveal key={item.id} delay={index * 0.04} className={`faq__item ${isOpen ? 'is-open' : ''}`.trim()}>
            <button
              type="button"
              className="faq__q"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
            >
              <span className="faq__index">{String(index + 1).padStart(2, '0')}</span>
              <span className="faq__text">{pick(item.questionEn, item.questionAm)}</span>
              <span className="faq__plus" aria-hidden="true">
                <Plus size={18} strokeWidth={1.8} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  className="faq__a"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <p>{pick(item.answerEn, item.answerAm)}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </Reveal>
        );
      })}
    </div>
  );
}
