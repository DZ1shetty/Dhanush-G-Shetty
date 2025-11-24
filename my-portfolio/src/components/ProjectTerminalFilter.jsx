import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import './ProjectTerminalFilter.css';

const ProjectTerminalFilter = ({ projects, smoothMode = false }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showTagline, setShowTagline] = useState(null);
  const [scanMode, setScanMode] = useState(false);

  const paletteMotionProps = smoothMode
    ? { initial: false }
    : {
        initial: { opacity: 0, y: -20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
      };

  const buttonMotionProps = smoothMode
    ? {}
    : { whileHover: { scale: 1.03 }, whileTap: { scale: 0.98 } };

  const taglineMotionProps = smoothMode
    ? { initial: false, animate: { opacity: 1, y: 0 }, exit: { opacity: 1, y: 0 }, transition: { duration: 0 } }
    : { initial: { opacity: 0, y: 5 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 5 }, transition: { duration: 0.2 } };

  const getProjectMotionProps = (index) => {
    if (smoothMode) {
      return {
        initial: false,
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 1, y: 0 },
        transition: { duration: 0 }
      };
    }

    return {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { delay: index * 0.05, duration: 0.4 }
    };
  };

  // Extract unique tags and map them to categories with taglines
  const categories = useMemo(() => {
    const allTags = ['All', ...new Set(projects.flatMap(p => p.tags))];
    
    // Define taglines for known categories, fallback for others
    const getTagline = (tag) => {
      const taglines = {
        'All': '> SHOWING ALL PROJECTS',
        'React': '> FRONTEND LIBRARIES',
        'JavaScript': '> CORE WEB TECHNOLOGIES',
        'TypeScript': '> TYPE-SAFE DEVELOPMENT',
        'Python': '> BACKEND & SCRIPTING',
        'CSS': '> STYLING & ANIMATIONS',
        'HTML/CSS': '> WEB FUNDAMENTALS',
        'OpenCV': '> COMPUTER VISION',
        'System Analysis': '> ARCHITECTURE & DESIGN'
      };
      return taglines[tag] || `> ${tag.toUpperCase()} PROJECTS`;
    };

    return allTags.map(tag => ({
      id: tag,
      label: tag.toUpperCase(),
      tagline: getTagline(tag)
    }));
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return activeCategory === 'All' 
      ? projects 
      : projects.filter(p => p.tags.includes(activeCategory));
  }, [activeCategory, projects]);

  return (
    <div className="project-terminal">
      {/* Filter Palette */}
      <motion.div 
        className="filter-palette"
        {...paletteMotionProps}
      >
        {categories.map(cat => (
          <div key={cat.id} className="filter-group">
            <motion.button
              className={`filter-pill ${activeCategory === cat.id ? 'active' : ''}`}
              {...buttonMotionProps}
              onClick={() => setActiveCategory(cat.id)}
              onHoverStart={() => setShowTagline(cat.id)}
              onHoverEnd={() => setShowTagline(null)}
              aria-label={`Filter by ${cat.label}`}
              aria-pressed={activeCategory === cat.id}
            >
              {cat.label}
            </motion.button>
            <AnimatePresence>
              {showTagline === cat.id && (
                <motion.span className="tagline" {...taglineMotionProps}>
                  {cat.tagline}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        ))}
        
        {/* Scan Mode Toggle */}
        <button 
          className={`scan-toggle ${scanMode ? 'active' : ''}`}
          onClick={() => setScanMode(!scanMode)}
          aria-label="Toggle scan mode"
        >
          {scanMode ? 'SCAN: ON' : 'SCAN: OFF'}
        </button>
      </motion.div>

      {/* Project Grid */}
      <div className={`project-grid ${scanMode ? 'scan-mode' : ''}`}>
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title} // Using title as key since id is not available in data
              className="project-card-wrapper"
              layout
              {...getProjectMotionProps(index)}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectTerminalFilter;
