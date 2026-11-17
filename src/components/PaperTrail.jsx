import { useEffect, useRef, useState } from 'react';
import './PaperTrail.css';

export default function PaperTrail() {
  const container = useRef(null);
  const route = useRef(null);
  const plane = useRef(null);
  const [layout, setLayout] = useState({ width: 1, height: 1, path: '' });

  useEffect(() => {
    const main = container.current.parentElement;
    let frame;
    const measure = () => {
      const width = main.clientWidth;
      const height = main.offsetHeight;
      const mainTop = main.getBoundingClientRect().top;
      const sections = [...main.querySelectorAll(':scope > section')];
      const mobile = width < 760;
      const edge = mobile ? 10 : Math.max(20, (width - 1040) / 2 - 38);
      const left = edge;
      const right = width - edge;
      const bounds = sections.map(section => {
        const rect = section.getBoundingClientRect();
        return { top: rect.top - mainTop, bottom: rect.bottom - mainTop };
      });
      if (!bounds.length) return;
      const outwardSway = mobile ? 8 : Math.min(72, edge - 4);
      const inwardSway = mobile ? 2 : Math.min(12, Math.max(0, Math.max(40, (width - 1040) / 2) - edge - 22));
      // Two soft bends replace each straight run down the side of a section.
      // Keep Y increasing so scroll position still maps smoothly onto the route.
      const windDown = (x, fromY, toY) => {
        const span = Math.max(0, toY - fromY);
        const direction = x === left ? -1 : 1;
        const outer = x + direction * outwardSway;
        const inner = x - direction * inwardSway;
        return ` C ${outer} ${fromY + span * .16}, ${outer} ${fromY + span * .34}, ${x} ${fromY + span * .5}`
          + ` C ${inner} ${fromY + span * .66}, ${inner} ${fromY + span * .84}, ${x} ${fromY + span}`;
      };
      let path = `M ${right - 48} 24 C ${right - 14} 24, ${right} 42, ${right} 76`;
      path += windDown(right, 76, bounds[0].bottom - 100);
      path += ` C ${right} ${bounds[0].bottom - 30}, ${left} ${bounds[0].bottom - 20}, ${left} ${bounds[0].bottom + 45}`;
      let currentX = left;
      let currentY = bounds[0].bottom + 45;
      // Cross the page in section padding, keeping the trail clear of the content.
      bounds.slice(1, -1).forEach((bound, index) => {
        const nextX = index % 2 === 0 ? right : left;
        path += windDown(currentX, currentY, Math.max(currentY, bound.bottom - 100));
        path += ` C ${currentX} ${bound.bottom - 30}, ${nextX} ${bound.bottom - 20}, ${nextX} ${bound.bottom + 45}`;
        currentX = nextX;
        currentY = bound.bottom + 45;
      });
      const last = bounds[bounds.length - 1];
      path += windDown(currentX, currentY, last.bottom - 70);
      path += ` Q ${currentX} ${last.bottom - 10}, ${currentX === left ? left + 65 : right - 65} ${last.bottom - 10}`;
      setLayout({ width, height, path });
    };
    const queueMeasure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(queueMeasure);
    observer.observe(main);
    main.querySelectorAll(':scope > section').forEach(section => observer.observe(section));
    window.addEventListener('resize', queueMeasure);
    measure();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', queueMeasure);
    };
  }, []);

  useEffect(() => {
    if (!layout.path) return;
    const main = container.current.parentElement;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const length = route.current.getTotalLength();
    let frame;
    const placePlane = () => {
      const path = route.current;
      // Find the point at the reader's position, rather than running a timed animation.
      const y = window.innerHeight * .58 - main.getBoundingClientRect().top;
      let low = 0;
      let high = length;
      if (!motion.matches) {
        for (let i = 0; i < 18; i += 1) {
          const middle = (low + high) / 2;
          if (path.getPointAtLength(middle).y < y) low = middle;
          else high = middle;
        }
      }
      const distance = motion.matches ? 0 : (low + high) / 2;
      const point = path.getPointAtLength(distance);
      const next = path.getPointAtLength(Math.min(length, distance + 2));
      const previous = path.getPointAtLength(Math.max(0, distance - 2));
      const angle = Math.atan2(next.y - previous.y, next.x - previous.x) * 180 / Math.PI;
      plane.current.setAttribute('transform', `translate(${point.x} ${point.y}) rotate(${angle}) scale(${layout.width < 760 ? .65 : 1})`);
    };
    const queuePlacement = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(placePlane);
    };
    placePlane();
    window.addEventListener('scroll', queuePlacement, { passive: true });
    window.addEventListener('resize', queuePlacement);
    motion.addEventListener('change', queuePlacement);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', queuePlacement);
      window.removeEventListener('resize', queuePlacement);
      motion.removeEventListener('change', queuePlacement);
    };
  }, [layout]);

  return <div ref={container} className="paper-trail" aria-hidden="true">
    <svg width={layout.width} height={layout.height} viewBox={`0 0 ${layout.width} ${layout.height}`} focusable="false">
      <path ref={route} d={layout.path} className="paper-trail-route" />
      {layout.path && <g ref={plane} className="paper-plane">
        <path d="M-17-12 19 0-17 12-9 0Z" fill="var(--card)" stroke="var(--red)" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M-17-12-5-3 19 0-9 0-17 12-5 3 19 0" fill="var(--blush)" stroke="var(--red)" strokeWidth="1.2" strokeLinejoin="round" />
      </g>}
    </svg>
  </div>;
}
