import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Images, ZoomIn, MonitorPlay } from 'lucide-react';

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

const VideoPanel = ({ project }) => (
  <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/60">
    <video
      controls
      className="w-full h-full object-cover"
      {...(project.thumbnail ? { poster: project.thumbnail } : {})}
    >
      <source src={project.video} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
);

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
    return <div className="mb-16 last:mb-0">{coreCard}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="mb-16 last:mb-0"
    >
      {coreCard}
    </motion.div>
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
