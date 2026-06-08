import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Images, ZoomIn, MonitorPlay, Play, Minimize2 } from 'lucide-react';

const SubHeading = ({ label }) => (
  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-cyan-500/80 mb-2 select-none">
    <span className="h-[1px] w-4 bg-cyan-500/20" />
    {label}
  </div>
);

const ImageGallery = ({ project, openModal }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
    {project.images.map((image, idx) => (
      <button
        key={image.src}
        type="button"
        className="relative aspect-video overflow-hidden rounded-lg border border-white/5 bg-black/40 group cursor-pointer"
        onClick={() => openModal(project.images, idx)}
        aria-label={`Open ${project.title} image ${idx + 1}`}
      >
        <img
          src={image.src}
          alt={image.caption}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          loading="eager"
        />
        <div className="absolute inset-0 bg-cyan-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-cyan-300 font-mono text-[10px] tracking-wider">
          <ZoomIn className="w-3.5 h-3.5" />
          <span>VIEW</span>
        </div>
      </button>
    ))}
  </div>
);

const VideoPanel = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const videoRef = useRef(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play();
        }
      }, 300);
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  };

  return (
    <motion.div 
      layout
      transition={{ type: "spring", stiffness: 220, damping: 25 }}
      className={`relative rounded-xl overflow-hidden border bg-black/50 ${
        isExpanded 
          ? 'border-cyan-500/30 shadow-[0_4px_25px_rgba(0,0,0,0.5)] my-4' 
          : 'border-white/5 hover:border-white/10'
      }`}
    >
      <motion.div
        layout
        className={`relative w-full overflow-hidden ${isExpanded ? 'aspect-video' : 'h-16 cursor-pointer'}`}
        onClick={!isExpanded ? toggleExpand : undefined}
      >
        {/* Video Element */}
        <motion.video
          layout
          ref={videoRef}
          controls={isExpanded}
          className={`w-full h-full object-cover ${!isExpanded ? 'pointer-events-none opacity-50 hover:opacity-75 transition-all duration-300' : 'opacity-100'}`}
          {...(project.thumbnail ? { poster: project.thumbnail } : {})}
          onEnded={() => setIsExpanded(false)}
        >
          <source src={project.video} type="video/mp4" />
          Your browser does not support the video tag.
        </motion.video>

        {/* Overlay for collapsed state */}
        <AnimatePresence>
          {!isExpanded && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-slate-950/20"
            >
              <div className="flex items-center gap-3 group">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-300"
                >
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-bold text-white tracking-widest group-hover:text-cyan-400 transition-colors">
                    WATCH VIDEO DEMO
                  </span>
                  <span className="text-[8px] font-mono text-slate-500 tracking-wider">
                    CLICK TO EXPAND
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapse button for expanded state */}
        <AnimatePresence>
          {isExpanded && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand();
              }}
              className="absolute top-3 right-3 p-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-white/70 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50 transition-all z-10"
            >
              <Minimize2 className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const ProjectSection = ({ project, openModal }) => (
  <div className="p-4 rounded-lg bg-black/20 border border-white/5 space-y-3">
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        {project.images ? (
          <Images className="w-3.5 h-3.5 text-cyan-400" />
        ) : (
          <MonitorPlay className="w-3.5 h-3.5 text-purple-400" />
        )}
        <h4 className="text-sm font-semibold text-slate-200">{project.title}</h4>
      </div>
      <p className="text-slate-400 text-xs font-sans font-light leading-relaxed">{project.description}</p>
    </div>

    {project.images && <ImageGallery project={project} openModal={openModal} />}
    {project.video && <VideoPanel project={project} />}
  </div>
);

const InternshipCard = ({ internship, index, openModal, smoothMode }) => {
  const formattedIndex = (index + 1).toString().padStart(2, '0');

  const coreCard = (
    <div className={`group relative bg-slate-950/30 hover:bg-slate-900/30 border border-white/5 hover:border-cyan-500/20 p-5 rounded-xl transition-all duration-300 w-full flex flex-col justify-between h-full hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]`}>
      <div className="flex flex-col gap-2">
        {/* Top bar with minimal indicator & duration */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 select-none">
          <span>INTERNSHIP {formattedIndex}</span>
          <span>{internship.duration}</span>
        </div>

        {/* Internship Title */}
        <h3 className="text-lg font-heading font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors duration-200">
          {internship.title}
        </h3>

        {/* Company Subtitle */}
        <div className="flex items-center gap-1.5 text-xs font-mono text-purple-400/80 mb-1 select-none">
          <Building2 className="w-3.5 h-3.5 text-slate-500" />
          <span>{internship.company}</span>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans font-light">
          {internship.description}
        </p>

        {/* Subprojects / Media */}
        {internship.projects && internship.projects.length > 0 && (
          <div className="mt-4 pt-4 border-t border-white/5 space-y-4">
            <SubHeading label="Project Showcase" />
            {internship.projects.map((project, projectIndex) => (
              <ProjectSection
                key={`${project.title}-${projectIndex}`}
                project={project}
                openModal={openModal}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-5">
        {/* Footer info matching Project Card style */}
        <div className="flex items-center justify-between pt-3.5 border-t border-white/5 font-mono text-[10px] text-slate-600 select-none">
          <span>RUN_0{formattedIndex}</span>
          <span className="text-slate-400">ACTIVE_LOGS</span>
        </div>
      </div>
    </div>
  );

  if (smoothMode) {
    return <div className="mb-8 last:mb-0">{coreCard}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="mb-8 last:mb-0"
    >
      {coreCard}
    </motion.div>
  );
};

const Internship = ({ data, openModal, smoothMode }) => (
  <div className="max-w-6xl mx-auto px-4 space-y-8">
    {data.map((item, index) => (
      <InternshipCard
        key={item.title}
        internship={item}
        index={index}
        openModal={openModal}
        smoothMode={smoothMode}
      />
    ))}
  </div>
);

export default Internship;
