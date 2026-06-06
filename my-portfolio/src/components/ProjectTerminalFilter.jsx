import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, Code } from 'lucide-react';
import ProjectCard from './ProjectCard';
import './ProjectTerminalFilter.css';

const ProjectTerminalFilter = ({ projects, smoothMode = false }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const filterBarRef = useRef(null);

  useEffect(() => {
    const el = filterBarRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        el.scrollLeft += e.deltaY * 0.8; // Scroll horizontally
        e.preventDefault(); // Prevent standard vertical page scroll
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Extract unique tags and map them to categories with taglines
  const categories = useMemo(() => {
    const allTags = ['All', ...new Set(projects.flatMap(p => p.tags))];
    
    return allTags.map(tag => ({
      id: tag,
      label: tag.toUpperCase()
    }));
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return activeCategory === 'All' 
      ? projects 
      : projects.filter(p => p.tags.includes(activeCategory));
  }, [activeCategory, projects]);

  const getCategoryIcon = tag => {
    if (tag === 'All') return <Folder className="w-4 h-4" />;
    return <Code className="w-4 h-4" />;
  };

  const getProjectMotionProps = (index) => {
    if (smoothMode) {
      return { initial: false, animate: { opacity: 1, y: 0 }, exit: { opacity: 1, y: 0 } };
    }

    return {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
      transition: { delay: index * 0.04, duration: 0.3 }
    };
  };

  return (
    <div className="project-terminal">
      <motion.div 
        ref={filterBarRef}
        className="project-filter-bar"
        initial={smoothMode ? false : { opacity: 0, y: 20 }}
        whileInView={smoothMode ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`project-filter-button ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
            aria-label={`Filter by ${cat.label}`}
            aria-pressed={activeCategory === cat.id}
          >
            <span className="filter-icon">{getCategoryIcon(cat.id)}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </motion.div>

      <div className="project-stats">
        <span>ACTIVE_PROJECTS: {filteredProjects.length}</span>
      </div>

      <motion.div layout className="project-grid">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              className="project-card-wrapper"
              layout
              {...getProjectMotionProps(index)}
            >
              <ProjectCard project={project} index={index} smoothMode={smoothMode} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProjectTerminalFilter;
