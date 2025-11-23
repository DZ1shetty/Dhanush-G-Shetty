import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, Building2, Calendar, Terminal } from 'lucide-react';

const JourneyCard = ({ item, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
      className={`flex flex-col md:flex-row items-center justify-between mb-24 w-full relative ${
        isEven ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Connector Line (Desktop) */}
      <div className={`hidden md:block absolute top-8 w-1/2 h-[2px] bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 ${isEven ? 'right-1/2' : 'left-1/2'}`}>
        <div className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)] ${isEven ? 'left-0' : 'right-0'}`} />
      </div>
      
      {/* Empty space for the other side */}
      <div className="hidden md:block w-5/12" />

      {/* Center Node */}
      <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 top-0 flex items-center justify-center w-16 h-16 z-10">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 border-dashed animate-[spin_10s_linear_infinite]" />
        {/* Inner Glow */}
        <div className="absolute inset-2 rounded-full bg-black border border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center">
          {item.type === 'Education' ? (
            <GraduationCap className="w-6 h-6 text-cyan-400" />
          ) : (
            <Building2 className="w-6 h-6 text-purple-400" />
          )}
        </div>
      </div>

      {/* Content Card */}
      <div className="w-full md:w-5/12 pl-16 md:pl-0 z-10">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="group relative"
        >
          {/* Cyberpunk Card Container */}
          <div className="relative overflow-hidden rounded-xl bg-black/80 border border-white/10 backdrop-blur-xl transition-all duration-300 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">
            
            {/* Header Bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5 group-hover:bg-cyan-900/20 transition-colors">
              <div className="flex items-center gap-2">
                <Terminal className="w-3 h-3 text-cyan-500" />
                <span className="text-xs font-mono text-cyan-500 tracking-wider">SYS.LOG.0{index + 1}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Calendar className="w-3 h-3" />
                {item.date}
              </div>
            </div>

            {/* Main Content */}
            <div className="p-6 relative">
              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/0 group-hover:border-cyan-500/50 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/0 group-hover:border-cyan-500/50 transition-all duration-500" />

              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {item.title}
              </h3>
              
              <div className="flex items-center gap-2 text-purple-400 font-medium mb-4 text-sm tracking-wide">
                <Building2 className="w-4 h-4" />
                {item.institution}
              </div>
              
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                {item.description}
              </p>

              {/* Decorative Scanline */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 translate-y-[-100%] group-hover:translate-y-[100%] transition-all duration-1000 pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Journey = ({ data }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"]
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative max-w-7xl mx-auto px-4 py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.05),transparent_70%)] pointer-events-none" />
      
      {/* Central Spine Background */}
      <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5" />
      
      {/* Animated Filling Spine */}
      <motion.div 
        style={{ height }}
        className="absolute left-4 md:left-1/2 transform -translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-cyan-500 via-purple-500 to-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.8)] z-0"
      />

      <div className="relative z-10 pt-10">
        {data.map((item, index) => (
          <JourneyCard key={index} item={item} index={index} />
        ))}
      </div>

      {/* Bottom Terminator */}
      <div className="absolute bottom-0 left-4 md:left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-cyan-500 rotate-45 shadow-[0_0_20px_rgba(34,211,238,1)] z-20" />
    </div>
  );
};

export default Journey;
