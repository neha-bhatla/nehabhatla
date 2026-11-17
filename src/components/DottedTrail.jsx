import { useEffect, useRef, useState } from 'react';
import './DottedTrail.css';

const CONTENT = '.hero-layout > *, .section-heading, .experience-layout, .project-grid, .case-caption, .skills-heading, .skill-badges, .education-card, .game-copy, .game-console, .contact-copy, .note-card';

export default function DottedTrail() {
  const container = useRef(null);
  const [layout, setLayout] = useState({ width: 1, height: 1, path: '' });

  useEffect(() => {
    const main = container.current.parentElement;
    const sections = [...main.querySelectorAll(':scope > section')];
    let frame;
    const measure = () => {
      const mainRect = main.getBoundingClientRect();
      const width = main.clientWidth;
      const mobile = width < 760;
      const bounds = sections.map(section => {
        const rects = [...section.querySelectorAll(CONTENT)].map(element => element.getBoundingClientRect());
        return rects.length ? {
          top: Math.min(...rects.map(rect => rect.top)) - mainRect.top,
          bottom: Math.max(...rects.map(rect => rect.bottom)) - mainRect.top,
          left: Math.min(...rects.map(rect => rect.left)) - mainRect.left,
          right: Math.max(...rects.map(rect => rect.right)) - mainRect.left,
        } : null;
      }).filter(Boolean);
      if (!bounds.length) return;

      const clearance = mobile ? 14 : 24;
      const left = Math.max(8, Math.min(...bounds.map(bound => bound.left)) - clearance);
      const right = Math.min(width - 8, Math.max(...bounds.map(bound => bound.right)) + clearance);
      const sway = Math.max(0, Math.min(mobile ? 3 : 20, left - 8, width - right - 8));
      const padding = mobile ? 12 : 18;
      let x = right;
      let y = Math.max(12, bounds[0].top - padding);
      let path = `M ${x} ${y}`;

      const followSide = endY => {
        const span = Math.max(0, endY - y);
        const bow = x === left ? x - sway : x + sway;
        path += ` C ${bow} ${y + span / 3}, ${bow} ${y + span * 2 / 3}, ${x} ${y + span}`;
        y += span;
      };

      bounds.forEach((bound, index) => {
        const next = bounds[index + 1];
        const gapStart = bound.bottom + padding;
        const gapEnd = next ? next.top - padding : gapStart;
        followSide(gapStart);
        // Sweep across only when there is a real gap between the content blocks.
        if (next && gapEnd - gapStart >= 32) {
          const nextX = x === right ? left : right;
          const turn = (gapEnd - gapStart) * .45;
          path += ` C ${x} ${gapStart + turn}, ${nextX} ${gapEnd - turn}, ${nextX} ${gapEnd}`;
          x = nextX;
          y = gapEnd;
        }
      });
      setLayout({ width, height: main.offsetHeight, path });
    };
    const queueMeasure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(queueMeasure);
    observer.observe(main);
    sections.forEach(section => observer.observe(section));
    window.addEventListener('resize', queueMeasure);
    document.fonts?.addEventListener('loadingdone', queueMeasure);
    measure();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', queueMeasure);
      document.fonts?.removeEventListener('loadingdone', queueMeasure);
    };
  }, []);

  return <div ref={container} className="dotted-trail" aria-hidden="true">
    <svg width={layout.width} height={layout.height} viewBox={`0 0 ${layout.width} ${layout.height}`} focusable="false">
      <path d={layout.path} className="dotted-trail-route" />
    </svg>
  </div>;
}
