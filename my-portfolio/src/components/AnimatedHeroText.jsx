import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const letter = { hidden: { y: 18, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.35 } } };

export default function AnimatedHeroText({ text = '', className = '' }) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return (
      <h1 className={`text-4xl md:text-5xl font-extrabold ${className}`}>{text}</h1>
    );
  }

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="show"
      className={`text-4xl md:text-5xl font-extrabold leading-tight ${className}`}
    >
      {text.split('').map((char, i) => (
        <motion.span key={String(i)} variants={letter} className="inline-block">
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.h1>
  );
}
