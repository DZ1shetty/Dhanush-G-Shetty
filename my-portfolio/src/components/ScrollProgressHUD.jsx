import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const NAV_SECTIONS = [
  { id: "home", label: "Home" },
  { id: "journey", label: "Journey" },
  { id: "internships", label: "Internships" },
  { id: "projects", label: "Projects" },
  { id: "certificate", label: "Certificate" },
  { id: "contact", label: "Contact" }
];

const ScrollProgressHUD = ({ activeNav, handleNavClick, smoothMode = false }) => {
  const { scrollYProgress } = useScroll();
  
  // Create a spring animation for the scroll progress to make it super smooth
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate height scale for vertical tracker line
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {/* 1. Horizontal Scroll Progress Bar (sitting exactly under header at top-16) */}
      <motion.div
        className="fixed top-16 left-0 right-0 h-[2.5px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 z-[80] origin-left shadow-[0_1px_10px_rgba(34,211,238,0.6)]"
        style={{ scaleX: smoothMode ? scrollYProgress : scaleX }}
      />

      {/* 2. Cyber HUD Side Scroll Navigator (Right Margin, hidden on mobile) */}
      <div 
        className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 z-50 hidden lg:flex select-none"
        aria-label="Scroll navigation monitor"
      >
        {/* Top Label */}
        <div className="text-[9px] font-mono text-cyan-500/60 tracking-[0.2em] rotate-90 translate-y-[-15px] select-none uppercase">
          NAV_TRACKER
        </div>

        {/* Vertical Track Line Container */}
        <div className="relative w-[1px] h-48 bg-white/10 flex items-center justify-center rounded-full">
          {/* Fills dynamically based on scroll progress */}
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full origin-top"
            style={{ 
              height: '100%',
              scaleY: smoothMode ? scrollYProgress : scaleY
            }}
          />

          {/* Section Dots mapped along the track line */}
          <div className="absolute inset-y-0 flex flex-col justify-between items-center py-1">
            {NAV_SECTIONS.map((section, idx) => {
              const isActive = activeNav === section.id;
              const formattedIndex = (idx + 1).toString().padStart(2, '0');

              return (
                <div
                  key={section.id}
                  className="relative flex items-center justify-center w-6 h-6 cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={() => handleNavClick(section.id)}
                >
                  {/* Interactive Dot */}
                  <motion.div
                    className={`w-2 h-2 rounded-full border transition-all duration-300 ${
                      isActive
                        ? 'bg-cyan-400 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] scale-125'
                        : 'bg-black/60 border-white/20 hover:border-cyan-400/50 hover:scale-110'
                    }`}
                  />

                  {/* Ring highlight when hovered or active */}
                  {isActive && !smoothMode && (
                    <motion.div
                      layoutId="activeSideNavRing"
                      className="absolute w-4 h-4 rounded-full border border-cyan-400/40 pointer-events-none"
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    />
                  )}

                  {/* Code-style tooltip on hover (reveals to the left) */}
                  {hoveredIdx === idx && (
                    <motion.div
                      initial={{ opacity: 0, x: -10, scale: 0.95 }}
                      animate={{ opacity: 1, x: -20, scale: 1 }}
                      className="absolute right-0 pr-2 py-1 px-3 bg-black/80 backdrop-blur-md border border-cyan-500/30 rounded-md shadow-lg pointer-events-none flex items-center gap-2 whitespace-nowrap"
                    >
                      <span className="text-[10px] font-mono text-cyan-400">[{formattedIndex}]</span>
                      <span className="text-[10px] font-mono font-bold tracking-wider text-slate-100 uppercase">
                        {section.label}
                      </span>
                      {isActive && (
                        <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                      )}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom index indicator */}
        <div className="text-[10px] font-mono text-slate-500/80 tracking-wider pt-2">
          LN_{ (NAV_SECTIONS.findIndex(s => s.id === activeNav) + 1).toString().padStart(2, '0') }
        </div>
      </div>
    </>
  );
};

export default ScrollProgressHUD;
