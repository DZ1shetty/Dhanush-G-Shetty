import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Simple, professional first-load overlay that
// signals when it is finished via `onDone`.
const Preloader = ({ onDone, isActive }) => {
  useEffect(() => {
    if (!isActive) return;

    const timer = setTimeout(() => {
      onDone?.();
    }, 500); // 0.5s — fast, snappy

    return () => clearTimeout(timer);
  }, [isActive, onDone]);

  const statuses = [
    'INITIALIZING',
    'SYNCHRONIZING',
    'LOADING_ASSETS',
    'GETTING_READY'
  ];

  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const t = setInterval(() => setStatusIndex((s) => (s + 1) % statuses.length), 220);
    return () => clearInterval(t);
  }, [isActive]);

  const currentStatus = statuses[statusIndex];

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/95"
        >
          <div className="flex flex-col items-center gap-4">
            {/* Shimmer headline (matches site vibe) */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 shadow-[0_0_18px_rgba(34,211,238,0.12)] animate-pulse" />
            </div>

            {/* micro-status + animated dots */}
            <div className="flex items-center gap-3 text-sm font-mono tracking-[0.18em] text-cyan-400/80 uppercase">
              <span className="text-slate-300">{currentStatus.replace('_',' ')}</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 preloader-dot" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 preloader-dot delay-200" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 preloader-dot delay-400" />
              </span>
            </div>
            <div className="w-40 h-[2px] bg-slate-800 overflow-hidden rounded-full">
              <div className="h-full w-1/2 bg-cyan-400/90 preloader-bar-moving" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
