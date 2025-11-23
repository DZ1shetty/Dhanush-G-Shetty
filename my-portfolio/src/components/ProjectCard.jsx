import React from 'react';
import { motion } from 'framer-motion';
import { Github, Folder, Code, Terminal, Globe, Database, Cpu, ExternalLink } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  // Generate a deterministic gradient based on the project title length
  const gradients = [
    "from-cyan-500/10 to-blue-500/10",
    "from-purple-500/10 to-pink-500/10",
    "from-emerald-500/10 to-teal-500/10",
  ];
  
  const idx = project.title.length % gradients.length;
  const gradient = gradients[idx];
  
  // Select an icon based on tags or title
  const getIcon = () => {
    const text = (project.title + project.tags.join('')).toLowerCase();
    if (text.includes('react') || text.includes('web') || text.includes('css')) return <Globe className="w-5 h-5 text-cyan-400" />;
    if (text.includes('data') || text.includes('sql') || text.includes('mongo')) return <Database className="w-5 h-5 text-emerald-400" />;
    if (text.includes('python') || text.includes('ai') || text.includes('ml')) return <Cpu className="w-5 h-5 text-purple-400" />;
    if (text.includes('terminal') || text.includes('bash')) return <Terminal className="w-5 h-5 text-orange-400" />;
    return <Code className="w-5 h-5 text-slate-400" />;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col h-full bg-black/80 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10 transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />
      
      {/* Animated Gradient Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Header / Visual Area */}
      <div className="relative p-6 flex flex-col justify-between z-10 border-b border-white/5 group-hover:border-white/10 transition-colors">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:border-cyan-500/30">
            {getIcon()}
          </div>
          <div className="flex gap-2">
            <a 
              href={project.repoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-white/5 backdrop-blur-md rounded-lg hover:bg-cyan-500/20 border border-white/5 hover:border-cyan-500/50 transition-all text-slate-400 hover:text-cyan-400 group/btn"
              aria-label="View Source"
            >
              <Github size={16} className="group-hover/btn:rotate-12 transition-transform" />
            </a>
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono text-cyan-500/70 tracking-wider">PRJ.ID.{index.toString().padStart(3, '0')}</span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-500/20 to-transparent" />
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors font-mono">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Body Content */}
      <div className="flex-1 p-6 flex flex-col z-10">
        <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed font-light group-hover:text-slate-300 transition-colors">
          {project.description}
        </p>
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span 
                key={i} 
                className="px-2 py-1 text-[10px] uppercase tracking-wider font-mono font-semibold rounded bg-white/5 text-slate-400 border border-white/5 group-hover:border-cyan-500/20 group-hover:text-cyan-400/80 transition-all"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Corner */}
      <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[20px] border-r-[20px] border-b-white/5 border-r-transparent group-hover:border-b-cyan-500/20 transition-all duration-300" />
    </motion.div>
  );
};

export default ProjectCard;
