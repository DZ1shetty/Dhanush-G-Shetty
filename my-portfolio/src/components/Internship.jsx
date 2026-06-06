import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Images, ZoomIn, MonitorPlay, Play, Minimize2 } from 'lucide-react';

const Heading = ({ label }) => (
  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-cyan-400 mb-3">
    <span className="h-[1px] w-8 bg-cyan-500/40" />
    {label}
    <span className="h-[1px] w-8 bg-cyan-500/40" />
  </div>
);

const ImageGallery = ({ project, openModal }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
    {project.images.map((image, idx) => (
      <button
        key={image.src}
        type="button"
        className="relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-black/40 group"
        onClick={() => openModal(project.images, idx)}
        aria-label={`Open ${project.title} image ${idx + 1}`}
      >
        <img
          src={image.src}
          alt={image.caption}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:opacity-100 opacity-80"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-cyan-300 font-mono text-xs tracking-widest">
          <ZoomIn className="w-4 h-4" />
          VIEW
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
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className={`relative rounded-xl overflow-hidden border bg-black/80 backdrop-blur-sm ${
        isExpanded 
          ? 'border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)] my-6' 
          : 'border-white/10 hover:border-white/20'
      }`}
    >
      <motion.div
        layout
        className={`relative w-full overflow-hidden ${isExpanded ? 'aspect-video' : 'h-24 cursor-pointer'}`}
        onClick={!isExpanded ? toggleExpand : undefined}
      >
        {/* Video Element */}
        <motion.video
          layout
          ref={videoRef}
          controls={isExpanded}
          className={`w-full h-full object-cover ${!isExpanded ? 'pointer-events-none opacity-60 grayscale hover:grayscale-0 transition-all duration-500' : 'opacity-100'}`}
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
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="flex items-center gap-4 group">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/50 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)] group-hover:bg-cyan-500 group-hover:text-black transition-all duration-300"
                >
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-xs font-mono font-bold text-white tracking-widest group-hover:text-cyan-400 transition-colors">
                    WATCH THE VIDEO
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 tracking-wider">
                    CLICK TO EXPAND
                  </span>
                </div>
              </div>
              
              {/* Tech decoration lines */}
              <div className="absolute top-0 left-4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              <div className="absolute top-0 right-4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
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
              className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-white/70 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50 transition-all z-10"
            >
              <Minimize2 className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const ProjectSection = ({ project, openModal }) => (
  <div className="p-6 rounded-xl bg-white/5 border border-white/5">
    <Heading label="Project Media" />
    <div className="flex flex-col gap-3 mb-6">
      <div className="flex items-center gap-3">
        {project.images ? (
          <Images className="w-5 h-5 text-cyan-300" />
        ) : (
          <MonitorPlay className="w-5 h-5 text-purple-300" />
        )}
        <h4 className="text-2xl font-semibold text-white">{project.title}</h4>
      </div>
      <p className="text-slate-300">{project.description}</p>
    </div>

    {project.images && <ImageGallery project={project} openModal={openModal} />}
    {project.video && <VideoPanel project={project} />}
  </div>
);

const InternshipCard = ({ internship, index, openModal, smoothMode }) => {
  const coreCard = (
    <div className="relative bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]">
      <div className="flex items-center justify-between px-6 py-3 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <span className="text-xs font-mono text-cyan-500 tracking-[0.5em]">OP.LOG.0{index + 1}</span>
        </div>
        <div className="text-xs font-mono text-slate-400">{internship.duration}</div>
      </div>

      <div className="p-8 space-y-10">
        <div>
          <Heading label="Internship Overview" />
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <h3 className="text-3xl font-bold text-white flex items-center gap-3">
              {internship.title}
            </h3>
            <div className="flex items-center gap-2 text-purple-300 font-mono text-sm">
              <Building2 className="w-4 h-4" />
              {internship.company}
            </div>
          </div>
          <p className="text-slate-300 leading-relaxed">{internship.description}</p>
        </div>

        <div className="space-y-8">
          {internship.projects?.map((project, projectIndex) => (
            <ProjectSection
              key={`${project.title}-${projectIndex}`}
              project={project}
              openModal={openModal}
            />
          ))}
        </div>
      </div>
    </div>
  );

  if (smoothMode) {
    return <div className="mb-16 last:mb-0 skew-on-scroll">{coreCard}</div>;
  }

  return (
    <div className="mb-16 last:mb-0 skew-on-scroll">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        {coreCard}
      </motion.div>
    </div>
  );
};

const Internship = ({ data, openModal, smoothMode }) => (
  <div className="max-w-6xl mx-auto px-4 space-y-12">
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
