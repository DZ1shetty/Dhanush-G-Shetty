import React, { useRef, useEffect } from 'react';
import './HeroParallax.css';

export default function HeroParallax({ children, className = '', maxOffset = 25, smoothMode = false }) {
  const ref = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const grid = gridRef.current;
    if (!el || !grid) return;

    if (smoothMode) {
      el.style.setProperty('--mx', '0');
      el.style.setProperty('--my', '0');
      grid.style.transform = 'translate(0px, 0px)';
      return;
    }

    if (typeof window === 'undefined') return;

    // early exit for reduced motion or coarse input devices
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (isReduced || isCoarse) return;

    let rafId = null;
    const handler = (e) => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        // normalized ratio -1..1
        const rx = (x / (rect.width / 2));
        const ry = (y / (rect.height / 2));
        
        el.style.setProperty('--mx', `${rx * maxOffset}`);
        el.style.setProperty('--my', `${ry * maxOffset}`);
        
        // Inverse movement for background grid for depth
        grid.style.transform = `translate(${rx * -10}px, ${ry * -10}px)`;
        
        rafId = null;
      });
    };

    const reset = () => { 
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      el.style.setProperty('--mx', '0'); 
      el.style.setProperty('--my', '0');
      grid.style.transform = `translate(0px, 0px)`;
    };
    
    el.addEventListener('mousemove', handler);
    el.addEventListener('mouseleave', reset);

    return () => {
      el.removeEventListener('mousemove', handler);
      el.removeEventListener('mouseleave', reset);
    };
  }, [maxOffset, smoothMode]);

  return (
    <div ref={ref} className={`hero-parallax relative overflow-hidden ${className}`}>
      {/* Cyber Grid Background */}
      <div 
        ref={gridRef}
        className="absolute inset-[-10%] w-[120%] h-[120%] opacity-20 pointer-events-none transition-transform duration-100 ease-out"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
        }}
      />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-500 rounded-full animate-ping opacity-20" />
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-purple-500 rounded-full animate-ping opacity-30 delay-700" />
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
