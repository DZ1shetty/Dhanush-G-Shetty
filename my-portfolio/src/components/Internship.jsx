import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Calendar, Briefcase, Video, Play, ZoomIn, Terminal, Shield } from 'lucide-react';

const InternshipCard = ({ internship, index, openModal }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative mb-24 last:mb-0 group"
    >
      {/* Cyberpunk Border Container */}
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

          {/* Projects Section */}
          <div className="space-y-8">
            {internship.projects.map((project, pIndex) => (
              <div key={pIndex} className="relative bg-white/5 rounded-lg p-6 border border-white/5 hover:border-cyan-500/30 transition-colors">
                {/* Project Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-lg ${project.images ? 'bg-cyan-500/10 text-cyan-400' : 'bg-purple-500/10 text-purple-400'} border border-white/10`}>
                    {project.images ? <Briefcase className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white font-mono">{project.title}</h4>
                    <p className="text-slate-400 text-sm mt-1">{project.description}</p>
                  </div>
                </div>

                {/* Project Content */}
                {project.images && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {project.images.map((img, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="group/img relative aspect-video rounded-lg overflow-hidden cursor-pointer border border-white/10 bg-black/50"
                        onClick={() => openModal(project.images, i)}
                      >
                        <img 
                          src={img.src} 
                          alt={img.caption} 
                          className="w-full h-full object-cover opacity-80 group-hover/img:opacity-100 transition-opacity"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover/img:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/80 backdrop-blur-sm translate-y-full group-hover/img:translate-y-0 transition-transform">
                          <p className="text-cyan-400 text-[10px] font-mono truncate">{img.caption}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {project.video && (
                  <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/50 shadow-lg group/vid">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 pointer-events-none" />
                    <video 
                      controls 
                      className="w-full rounded-lg shadow-md relative z-10 opacity-90 group-hover/vid:opacity-100 transition-opacity"
                      poster="/video-placeholder.jpg"
                    >
                      <source src={project.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Internship = ({ data, openModal }) => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      {data.map((item, index) => (
        <InternshipCard key={index} internship={item} index={index} openModal={openModal} />
      ))}
    </div>
  );
};

export default Internship;
