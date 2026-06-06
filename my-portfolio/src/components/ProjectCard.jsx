import React from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ project, index, smoothMode = false }) => {
  // Index formatted as #01, #02, etc.
  const formattedIndex = (index + 1).toString().padStart(2, '0');

  return (
    <motion.div
      className={`group relative bg-slate-950/30 hover:bg-slate-900/30 border border-white/5 hover:border-cyan-500/20 p-5 rounded-xl transition-all duration-300 w-full max-w-md flex flex-col justify-between h-full ${
        smoothMode ? '' : 'hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]'
      }`}
      whileHover={smoothMode ? {} : { y: -4 }}
      initial={smoothMode ? {} : { opacity: 0, y: 15 }}
      whileInView={smoothMode ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.02 }}
      layout
    >
      <div className="flex flex-col gap-2">
        {/* Top bar with minimal index indicator */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 select-none">
          <span>PROJECT {formattedIndex}</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-cyan-400">
            ACTIVE
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-lg font-heading font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors duration-200">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans font-light">
          {project.description}
        </p>
      </div>

      <div className="mt-5">
        {/* Minimalist Tags Flex */}
        <div className="flex flex-wrap gap-x-2 gap-y-1 text-[10px] font-mono text-slate-500 mb-3 select-none">
          {project.tags.map((tag, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-slate-700 select-none">•</span>}
              <span className="text-slate-400">{tag}</span>
            </span>
          ))}
        </div>

        {/* Footer Link */}
        <div className="flex items-center justify-end pt-3.5 border-t border-white/5">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-cyan-400 transition-colors duration-200 group/link"
          >
            <Github className="w-3.5 h-3.5" />
            <span>SOURCE_CODE</span>
            <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
