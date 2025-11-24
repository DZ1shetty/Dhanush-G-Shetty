import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const letter = { 
  hidden: { y: 20, opacity: 0, filter: "blur(10px)" }, 
  show: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.4, ease: "easeOut" } } 
};

export default function AnimatedHeroText({ text = '', className = '', smoothMode = false }) {
  const shouldReduce = useReducedMotion();
  if (smoothMode) return (
    <h1 className={`text-4xl md:text-6xl font-extrabold ${className}`}>{text}</h1>
  );

  if (shouldReduce) {
    return (
      <h1 className={`text-4xl md:text-6xl font-extrabold ${className}`}>{text}</h1>
    );
  }

  return (
    <div className="relative inline-block">
      <motion.h1
        variants={container}
        initial="hidden"
        animate="show"
        className={`text-4xl md:text-6xl font-extrabold leading-tight tracking-tight ${className}`}
      >
        {text.split('').map((char, i) => (
          <motion.span 
            key={String(i)} 
            variants={letter} 
            className="inline-block hover:text-cyan-400 transition-colors duration-300"
            whileHover={{ scale: 1.2, rotate: Math.random() * 10 - 5 }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.h1>
      
      {/* Glitch Shadow Layer */}
      <motion.h1
        className={`absolute top-0 left-0 text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-cyan-500/30 pointer-events-none select-none mix-blend-screen ${className}`}
        animate={{ 
          x: [0, -2, 2, -1, 0],
          opacity: [0, 0.5, 0, 0.3, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
      >
        {text}
      </motion.h1>
    </div>
  );
}
