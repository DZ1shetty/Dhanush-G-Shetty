import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ZoomIn, ShieldCheck } from 'lucide-react';
import './ScrollFormationGrid.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollFormationGrid = ({ certs = [], onImageClick = () => {}, smoothMode = false }) => {
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const itemRefs = useRef([]);

  // Clear references array on each render
  itemRefs.current = [];

  useGSAP(() => {
    // Only run layout pinning and animations on desktop screens when ECO Mode is off
    const isMobile = window.innerWidth < 1024;
    if (isMobile || smoothMode || certs.length === 0) {
      // Clean up any active ScrollTrigger instances on this element
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === containerRef.current) t.kill();
      });
      return;
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center-=50px',
        end: '+=140%',
        pin: true,
        scrub: 0.3,
        invalidateOnRefresh: true,
      }
    });

    // Animate grid items flying in and rotating from different random positions
    timeline.fromTo(itemRefs.current, {
      y: (index) => {
        // Vary the depth so they fly in staggered vertically
        return (index % 2 === 0 ? 1 : 1.4) * window.innerHeight * 0.9;
      },
      x: (index) => {
        // Scatter items left/center/right
        return (index % 3 === 0 ? -120 : index % 3 === 1 ? 0 : 120);
      },
      rotationX: (index) => {
        // Fly in with tilt
        return index % 2 === 0 ? -45 : 45;
      },
      rotationY: (index) => {
        return index % 3 === 0 ? -30 : index % 3 === 1 ? 0 : 30;
      },
      rotationZ: (index) => {
        // Random tilt angle
        return (index % 2 === 0 ? 1 : -1) * (8 + (index % 12));
      },
      scale: 0.5,
      opacity: 0,
    }, {
      x: 0,
      y: 0,
      z: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      scale: 1,
      opacity: 1,
      stagger: {
        amount: 0.45,
        from: 'center'
      },
      ease: 'power3.out'
    });

    return () => {
      // Clean up scroll trigger instances
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === containerRef.current) t.kill();
      });
    };
  }, { scope: containerRef, dependencies: [certs, smoothMode] });

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 1024 : false;
  const useFallback = isMobile || smoothMode;

  return (
    <div 
      ref={containerRef} 
      className={`scroll-formation-wrapper ${useFallback ? 'fallback-mode' : 'pinned-mode'}`}
    >
      <div 
        ref={gridRef} 
        className="scroll-grid"
      >
        {certs.map((cert, idx) => {
          // Assign items to one of the 18 pre-defined grid cells
          const posClass = useFallback ? '' : `pos-${(idx % 18) + 1}`;

          return (
            <div
              key={`${cert.title}-${idx}`}
              ref={el => { if (el) itemRefs.current.push(el); }}
              className={`scroll-grid-item ${posClass} group`}
            >
              <div className="scroll-grid-item-inner">
                {/* Header info */}
                <div className="scroll-cert-header">
                  <div className="scroll-cert-status">
                    <span className="scroll-cert-dot" />
                    <span>VERIFIED</span>
                  </div>
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </div>

                {/* Certificate image display */}
                <div className="scroll-cert-image-container">
                  <img 
                    src={cert.src} 
                    alt={cert.title} 
                    className="scroll-cert-image" 
                    loading="lazy" 
                  />
                  
                  {/* Glowing Laser Scanline (disabled in Eco Mode) */}
                  {!smoothMode && <div className="scroll-cert-scanline" />}
                  
                  {/* Hover Inspect Overlay */}
                  <div 
                    className="scroll-cert-overlay"
                    onClick={() => onImageClick(idx)}
                  >
                    <button className="scroll-cert-btn">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>INSPECT</span>
                    </button>
                  </div>
                </div>

                {/* Certificate Title */}
                <h4 className="scroll-cert-title" title={cert.title}>
                  {cert.title}
                </h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollFormationGrid;
