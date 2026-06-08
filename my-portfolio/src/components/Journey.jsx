import React from 'react';
import { Building2, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const JourneyCard = ({ item, index, smoothMode = false }) => {
  // Index formatted as #01, #02, etc.
  const formattedIndex = (index + 1).toString().padStart(2, '0');

  const cardContent = (
    <div className="group relative bg-slate-950/30 hover:bg-slate-900/30 border border-white/5 hover:border-cyan-500/20 p-5 rounded-xl transition-all duration-300 w-full flex flex-col justify-between h-full hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
      <div className="flex flex-col gap-2">
        {/* Top bar with minimal indicator & date */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 select-none">
          <span>JOURNEY {formattedIndex}</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-600" />
            {item.date}
          </span>
        </div>

        {/* Institution Title */}
        <h3 className="text-lg font-heading font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors duration-200">
          {item.title}
        </h3>

        {/* Subtitle / Institution */}
        <div className="flex items-center gap-1.5 text-xs font-mono text-purple-400/80 mb-1 select-none">
          <Building2 className="w-3.5 h-3.5 text-slate-500" />
          <span>{item.institution}</span>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans font-light">
          {item.description}
        </p>
      </div>

      <div className="mt-5">
        {/* Footer info matching Project Card style */}
        <div className="flex items-center justify-between pt-3.5 border-t border-white/5 font-mono text-[10px] text-slate-600 select-none">
          <span>LOG_0{formattedIndex}</span>
          <span className="text-slate-400">{item.type.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );

  if (smoothMode) {
    return cardContent;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      className="h-full"
    >
      {cardContent}
    </motion.div>
  );
};

const Journey = ({ data, smoothMode = false }) => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid gap-8 md:grid-cols-2">
        {data.map((item, index) => (
          <JourneyCard key={`${item.title}-${index}`} item={item} index={index} smoothMode={smoothMode} />
        ))}
      </div>
    </div>
  );
};

export default Journey;
