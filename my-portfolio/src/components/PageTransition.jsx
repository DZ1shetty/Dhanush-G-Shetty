import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const DISPLAY_DELAY = 1500;
const EXIT_DURATION = 400;

const PageTransition = ({ stage, targetSection, onCovered, onExited }) => {
  const coverTimerRef = useRef(null);
  const exitTimerRef = useRef(null);

  useEffect(() => {
    if (stage === 'entering') {
      coverTimerRef.current = setTimeout(() => {
        onCovered?.();
      }, DISPLAY_DELAY);
    } else {
      clearTimeout(coverTimerRef.current);
    }

    return () => clearTimeout(coverTimerRef.current);
  }, [stage, onCovered]);

  useEffect(() => {
    if (stage === 'exiting') {
      exitTimerRef.current = setTimeout(() => {
        onExited?.();
      }, EXIT_DURATION);
    } else {
      clearTimeout(exitTimerRef.current);
    }

    return () => clearTimeout(exitTimerRef.current);
  }, [stage, onExited]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center bg-black/40 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: stage === 'entering' ? 1 : 0 
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Ambient Background Glow */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-purple-900/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === 'entering' ? 1 : 0 }}
      />
      
      {/* Central Orb */}
      <motion.div 
        className="absolute w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: stage === 'entering' ? 1.2 : 0.8,
          opacity: stage === 'entering' ? 1 : 0
        }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Animated Line Top */}
        <motion.div 
          className="h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent"
          initial={{ width: 0, opacity: 0 }}
          animate={{ 
            width: stage === 'entering' ? '300px' : '0px',
            opacity: stage === 'entering' ? 1 : 0
          }}
          transition={{ duration: 0.8, ease: "circOut" }}
        />

        <div className="py-8 overflow-hidden relative px-12">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-white tracking-[0.2em] uppercase text-center drop-shadow-[0_0_25px_rgba(0,0,0,1)]"
            initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
            animate={{ 
              y: stage === 'entering' ? 0 : -20,
              opacity: stage === 'entering' ? 1 : 0,
              filter: stage === 'entering' ? "blur(0px)" : "blur(10px)"
            }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            {targetSection}
          </motion.h2>
          
          {/* Scanning Light Effect on Text */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
            initial={{ x: '-100%' }}
            animate={{ x: stage === 'entering' ? '200%' : '-100%' }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
          />
        </div>

        {/* Animated Line Bottom */}
        <motion.div 
          className="h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent"
          initial={{ width: 0, opacity: 0 }}
          animate={{ 
            width: stage === 'entering' ? '300px' : '0px',
            opacity: stage === 'entering' ? 1 : 0
          }}
          transition={{ duration: 0.8, ease: "circOut" }}
        />

        {/* Status Text */}
        <motion.div 
          className="mt-8 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: stage === 'entering' ? 1 : 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-xs text-blue-300 font-bold font-mono tracking-[0.3em] uppercase drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
            System Navigating
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PageTransition;
