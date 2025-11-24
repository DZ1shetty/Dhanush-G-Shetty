import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Calendar, Briefcase, Video, Play, ZoomIn, Terminal, Shield } from 'lucide-react';

const InternshipCard = ({ internship, index, openModal, smoothMode }) => {
  const content = (
    <div className="relative bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-white/5 border-b border-white/5 group-hover:bg-cyan-900/10 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <span className="text-xs font-mono text-cyan-500 tracking-widest">OP.LOG.0{index + 1}</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="text-cyan-500/50">[</span>
          {internship.duration}
          <span className="text-cyan-500/50">]</span>
        </div>
      </div>

      <div className="p-8 relative">
        {/* Corner Accents */}
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyan-500/0 group-hover:border-cyan-500/30 transition-all duration-500 rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyan-500/0 group-hover:border-cyan-500/30 transition-all duration-500 rounded-bl-xl" />

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div>
            <h3 className="text-3xl font-bold text-white mb-2 flex items-center gap-3 group-hover:text-cyan-400 transition-colors">
              {internship.title}
            </h3>
            <div className="flex items-center gap-2 text-purple-400 font-medium text-lg font-mono">
              <Building2 className="w-5 h-5" />
              {internship.company}
            </div>
          </div>
        </div>
        
        <p className="text-slate-300 leading-relaxed max-w-3xl mb-8 font-light border-l-2 border-white/10 pl-4 group-hover:border-cyan-500/50 transition-colors">
          {internship.description}
        </p>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {internship.media && internship.media.map((media, idx) => (
            <div key={idx} className="relative group/media rounded-lg overflow-hidden border border-white/10 bg-black/50">
              {media.type === 'image' ? (
                <div 
                  className="relative aspect-video cursor-pointer overflow-hidden"
                  onClick={() => openModal(internship.media.filter(m => m.type === 'image'), idx)}
                >
                  <img 
                    src={media.src} 
                    alt={media.caption} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/media:scale-110 opacity-80 group-hover/media:opacity-100"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/media:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider border border-cyan-500/50 px-3 py-1 rounded-full bg-black/80">
                      <ZoomIn className="w-3 h-3" />
                      VIEW_EVIDENCE
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative aspect-video bg-black">
                  <video 
                    controls 
                    className="w-full h-full object-cover opacity-80 group-hover/media:opacity-100 transition-opacity"
                    poster={media.thumbnail}
                  >
                    <source src={media.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (smoothMode) {
    return (
      <div className="relative mb-24 last:mb-0 group">
        {content}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative mb-24 last:mb-0 group"
    >
      {content}
    </motion.div>
  );
};

const Internship = ({ data, openModal, smoothMode }) => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      {data.map((item, index) => (
        <InternshipCard key={index} internship={item} index={index} openModal={openModal} smoothMode={smoothMode} />
      ))}
    </div>
  );
};

export default Internship;
