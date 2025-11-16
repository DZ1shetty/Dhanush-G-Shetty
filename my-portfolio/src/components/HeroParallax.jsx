import React, { useRef, useEffect } from 'react';
import './HeroParallax.css';

export default function HeroParallax({ children, className = '', maxOffset = 18 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // early exit for reduced motion or coarse input devices
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (isReduced || isCoarse) return;

    const handler = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      // normalized ratio -1..1
      const rx = (x / (rect.width / 2));
      const ry = (y / (rect.height / 2));
      el.style.setProperty('--mx', `${rx * maxOffset}`);
      el.style.setProperty('--my', `${ry * maxOffset}`);
    };

    const reset = () => { el.style.setProperty('--mx', '0'); el.style.setProperty('--my', '0'); };
    el.addEventListener('mousemove', handler);
    el.addEventListener('mouseleave', reset);

    return () => {
      el.removeEventListener('mousemove', handler);
      el.removeEventListener('mouseleave', reset);
    };
  }, [maxOffset]);

  return (
    <div ref={ref} className={`hero-parallax relative ${className}`}>
      {children}
    </div>
  );
}
