import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Github, Code, Hash, Settings, Layers } from 'lucide-react';

// Color themes based on technology tags
const getTagStyle = (tag) => {
  const clean = tag.toLowerCase();
  if (clean.includes('react')) {
    return { text: 'text-cyan-400', border: 'border-cyan-500/30', bg: 'bg-cyan-500/5', glow: 'shadow-[0_0_10px_rgba(34,211,238,0.15)]' };
  }
  if (clean.includes('fastapi') || clean.includes('python')) {
    return { text: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/5', glow: 'shadow-[0_0_10px_rgba(16,185,129,0.15)]' };
  }
  if (clean.includes('javascript') || clean.includes('js')) {
    return { text: 'text-yellow-400', border: 'border-yellow-500/30', bg: 'bg-yellow-500/5', glow: 'shadow-[0_0_10px_rgba(234,179,8,0.15)]' };
  }
  if (clean.includes('dsa') || clean.includes('algorithm')) {
    return { text: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-500/5', glow: 'shadow-[0_0_10px_rgba(245,158,11,0.15)]' };
  }
  if (clean.includes('unity') || clean.includes('ar') || clean.includes('vr')) {
    return { text: 'text-pink-400', border: 'border-pink-500/30', bg: 'bg-pink-500/5', glow: 'shadow-[0_0_10px_rgba(236,72,153,0.15)]' };
  }
  if (clean.includes('typescript') || clean.includes('ts')) {
    return { text: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500/5', glow: 'shadow-[0_0_10px_rgba(59,130,246,0.15)]' };
  }
  if (clean.includes('git')) {
    return { text: 'text-orange-400', border: 'border-orange-500/30', bg: 'bg-orange-500/5', glow: 'shadow-[0_0_10px_rgba(249,115,22,0.15)]' };
  }
  return { text: 'text-purple-400', border: 'border-purple-500/30', bg: 'bg-purple-500/5', glow: 'shadow-[0_0_10px_rgba(168,85,247,0.15)]' };
};

const getExtension = (tags) => {
  const first = tags[0]?.toLowerCase() || '';
  if (first.includes('python') || first.includes('fastapi')) return '.py';
  if (first.includes('unity')) return '.cs';
  if (first.includes('react')) return '.jsx';
  if (first.includes('typescript') || first.includes('ts')) return '.ts';
  if (first.includes('java')) return '.java';
  if (first.includes('c++') || first.includes('cpp')) return '.cpp';
  return '.js';
};

const ProjectCard = ({ project, index, smoothMode = false }) => {
  const primaryTagStyle = useMemo(() => {
    return getTagStyle(project.tags[0] || 'Default');
  }, [project.tags]);

  const fileExtension = useMemo(() => {
    return getExtension(project.tags);
  }, [project.tags]);

  // Generate unique mock stats based on project attributes
  const stats = useMemo(() => {
    const loc = (index * 135) + 420;
    const files = (index * 2) + 5;
    const hash = ((index * 19283) % 65536).toString(16).toUpperCase().padStart(4, '0');
    return { loc, files, hash };
  }, [index]);

  return (
    <motion.div
      className={`group relative bg-slate-950/40 backdrop-blur-md p-5 rounded-2xl border transition-all duration-300 w-full max-w-md flex flex-col justify-between overflow-hidden ${
        smoothMode 
          ? 'border-white/10' 
          : `border-white/10 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.12)]`
      }`}
      whileHover={smoothMode ? {} : { y: -6 }}
      initial={smoothMode ? {} : { opacity: 0, scale: 0.95 }}
      whileInView={smoothMode ? {} : { opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
      layout
    >
      {/* Background blueprint grid mesh for high-tech visual depth */}
      {!smoothMode && (
        <div 
          className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:14px_14px] opacity-40 group-hover:opacity-60 transition-opacity duration-300" 
          aria-hidden="true" 
        />
      )}

      {/* Decorative cyber corner ticks */}
      {!smoothMode && (
        <>
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20 rounded-tl-md group-hover:border-cyan-500/40 transition-colors" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20 rounded-br-md group-hover:border-cyan-500/40 transition-colors" />
        </>
      )}

      <div>
        {/* Header Ribbon / Status bar */}
        <div className="flex justify-between items-center mb-4 text-[10px] font-mono tracking-widest text-slate-500 select-none">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.7)]" />
            <span className="text-emerald-500 font-bold">STABLE</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Code className="w-3 h-3" />
            <span>ID: 0X{stats.hash}</span>
          </div>
        </div>

        {/* Console Command Prompt & Project Name */}
        <div className="mb-3">
          <h3 className="text-lg md:text-xl font-mono font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 flex items-center gap-1 tracking-tight">
            <span className="text-cyan-500/70 select-none font-sans font-normal">&gt;</span>
            <span className="break-all">{project.title}{fileExtension}</span>
          </h3>
        </div>

        {/* Project Description (Clean, framed box layout) */}
        <div className="mb-4">
          <p className={`pl-3.5 border-l-2 text-slate-400 text-xs sm:text-sm font-sans font-light leading-relaxed ${primaryTagStyle.text.replace('text-', 'border-')}/40`}>
            {project.description}
          </p>
        </div>
      </div>

      <div>
        {/* Tech Stack Chips Section */}
        <div className="flex flex-wrap gap-1.5 mb-4 select-none">
          {project.tags.map((tag, i) => {
            const tagStyle = getTagStyle(tag);
            return (
              <span
                key={i}
                className={`px-2 py-0.5 rounded text-[10px] font-mono border uppercase transition-all duration-300 ${tagStyle.bg} ${tagStyle.border} ${tagStyle.text} ${smoothMode ? '' : `hover:${tagStyle.glow}`}`}
              >
                {tag}
              </span>
            );
          })}
        </div>

        {/* Diagnostics Specs Panel */}
        <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-black/45 rounded-lg border border-white/5 font-mono text-[9px] text-slate-500 uppercase tracking-wider select-none mb-3">
          <div className="flex flex-col">
            <span className="text-slate-600 text-[8px]">LOC_COUNT</span>
            <span className="text-slate-300 font-semibold">{stats.loc}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-600 text-[8px]">FILES</span>
            <span className="text-slate-300 font-semibold">{stats.files}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-600 text-[8px]">MODULE</span>
            <span className="text-slate-300 font-semibold">0X{stats.hash}</span>
          </div>
        </div>

        {/* Action Button Footer */}
        <div className="flex items-center justify-between font-mono text-[10px] text-slate-600 pt-2 border-t border-white/5">
          <span>BRANCH: MAIN</span>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
              smoothMode
                ? 'border-white/10 text-slate-400 bg-white/5'
                : 'border-cyan-500/20 text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)]'
            }`}
          >
            <Github className="w-3.5 h-3.5" />
            INSPECT_SRC()
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
