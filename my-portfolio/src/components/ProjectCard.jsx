import React from 'react';
import { motion } from 'framer-motion';
import { Github, FolderGit2, ShieldCheck } from 'lucide-react';

const gradients = [
  "from-cyan-500/20 via-purple-500/10 to-blue-500/10",
  "from-emerald-500/20 via-teal-500/10 to-blue-500/5",
  "from-pink-500/20 via-purple-500/10 to-indigo-500/10",
];

const ProjectCard = ({ project, index }) => {
  const gradient = gradients[index % gradients.length];

  const CardContent = (
    <>
      <div className="flex justify-between items-center mb-3 px-1">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono text-emerald-500 tracking-wider">VERIFIED</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-colors" />
          <span className="text-xs font-mono text-slate-400 tracking-wider">PRJ.{index.toString().padStart(3, '0')}</span>
        </div>
      </div>

      <div className={`relative rounded-xl overflow-hidden border border-white/5 bg-gradient-to-br ${gradient} aspect-[4/3]`}>
        <div className="absolute inset-0 flex flex-col gap-4 p-4 text-white/90">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-white/70">
            <FolderGit2 className="w-4 h-4" />
            {project.tags[0] || 'PROJECT'}
          </div>
          <h3 className="text-xl font-semibold drop-shadow-lg leading-snug break-words">{project.title}</h3>
          <div className="mt-auto flex flex-wrap gap-2 text-xs font-mono uppercase tracking-wider">
            {project.tags.map((tag, i) => (
              <span key={i} className="px-2 py-1 rounded-full bg-black/35 border border-white/15">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white/10 border border-white/30 rounded-full text-xs font-mono tracking-wider flex items-center gap-2 hover:bg-cyan-500/20 hover:border-cyan-400 transition-colors"
          >
            <Github className="w-3 h-3" />
            VIEW SOURCE
          </a>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 translate-y-[-100%] group-hover:translate-y-[100%] transition-all duration-700 pointer-events-none" />
      </div>
    </>
  );

  return (
    <motion.div
      className="group relative bg-black/60 backdrop-blur-xl p-4 rounded-2xl shadow-lg border border-white/10 overflow-hidden hover:border-cyan-500/40 transition-all duration-500 w-full max-w-md"
      whileHover={{ y: -6 }}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      layout
    >
      {CardContent}
    </motion.div>
  );
};

export default ProjectCard;
