import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import './ProjectTerminalFilter.css';

const ProjectTerminalFilter = ({ projects, smoothMode = false }) => {
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
    <div className="project-terminal max-w-7xl mx-auto px-4">
      <motion.div layout className="project-grid">
        <AnimatePresence>
          {projects.map((project, index) => (
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
