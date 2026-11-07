import { useEffect, useRef } from 'react';

const drops = Array.from({ length: 7 }, (_, index) => ({
  x: `${6 + index * 13}%`,
  size: `${4 + (index % 3) * 2}px`,
  delay: `${index * 1.6}s`,
  duration: `${8 + (index % 4) * 1.5}s`,
}));

/**
 * Decorative water layer for the hero. Everything here is transform/opacity
 * driven so the browser can composite it on the GPU — no animated SVG filters,
 * which re-rasterise their region every frame and stutter on mid-range laptops.
 */
export default function WaterBackdrop() {
  const layer = useRef(null);

  useEffect(() => {
    const host = layer.current;
    const hero = host?.closest('.hero');
    if (!host || !hero) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;

    const onDown = (event) => {
      // Let links and controls keep their own feedback.
      if (event.target.closest?.('a, button, input, textarea, select, label')) return;
      const rect = host.getBoundingClientRect();
      const drop = document.createElement('span');
      drop.className = 'water-ripple';
      drop.style.left = `${event.clientX - rect.left}px`;
      drop.style.top = `${event.clientY - rect.top}px`;
      host.appendChild(drop);
      drop.addEventListener('animationend', () => drop.remove(), { once: true });
    };

    hero.addEventListener('pointerdown', onDown);
    return () => hero.removeEventListener('pointerdown', onDown);
  }, []);

  return (
    <div className="water" aria-hidden="true">
      <span className="water__caustic water__caustic--a" />
      <span className="water__caustic water__caustic--b" />

      <div className="water__drops">
        {drops.map((drop, index) => (
          <span
            key={index}
            className="water-drop"
            style={{ '--x': drop.x, '--s': drop.size, '--d': drop.delay, '--t': drop.duration }}
          />
        ))}
      </div>

      <svg className="water__surface" viewBox="0 0 2880 220" preserveAspectRatio="none" focusable="false">
        <path
          className="water__wave water__wave--back"
          d="M0,120 C240,80 480,160 720,120 C960,80 1200,160 1440,120 C1680,80 1920,160 2160,120 C2400,80 2640,160 2880,120 L2880,220 L0,220 Z"
        />
        <path
          className="water__wave water__wave--mid"
          d="M0,144 C240,112 480,172 720,144 C960,112 1200,172 1440,144 C1680,112 1920,172 2160,144 C2400,112 2640,172 2880,144 L2880,220 L0,220 Z"
        />
        <path
          className="water__wave water__wave--front"
          d="M0,168 C240,148 480,188 720,168 C960,148 1200,188 1440,168 C1680,148 1920,188 2160,168 C2400,148 2640,188 2880,168 L2880,220 L0,220 Z"
        />
      </svg>

      <div className="water__ripples" ref={layer} />
    </div>
  );
}
