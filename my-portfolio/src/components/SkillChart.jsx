import React from 'react';
import { motion } from 'framer-motion';

const SkillChart = ({ percent = 0, size = 100, strokeWidth = 10, label = '' }) => {
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const dash = c * (1 - percent / 100);
  
  return (
    <div className="flex flex-col items-center group">
      <div className="relative">
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <motion.svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90 relative z-10">
          {/* Background Circle */}
          <circle cx={size/2} cy={size/2} r={r} stroke="#1f2937" strokeWidth={strokeWidth} fill="none" className="opacity-50" />
          
          {/* Progress Circle */}
          <motion.circle
            cx={size/2}
            cy={size/2}
            r={r}
            stroke="#06b6d4"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill="none"
            initial={{ strokeDashoffset: c }}
            whileInView={{ strokeDashoffset: dash }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{ strokeDasharray: c }}
            className="filter drop-shadow-[0_0_4px_rgba(6,182,212,0.5)]"
          />
        </motion.svg>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-white group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
            {percent}%
          </span>
        </div>
      </div>
      
      <div className="mt-3 text-sm text-slate-300 font-semibold tracking-wide group-hover:text-cyan-400 transition-colors duration-300" aria-hidden>
        {label}
      </div>
      <div className="sr-only">{label} {percent} percent</div>
    </div>
  );
};

export default SkillChart;
