import React from 'react';
import ProjectCard from './ProjectCard';
import './ProjectTerminalFilter.css';

const ProjectTerminalFilter = ({ projects, smoothMode = false }) => {
  return (
    <div className="project-terminal max-w-7xl mx-auto px-4">
      <div className="project-grid">
        {projects.map((project, index) => (
          <div key={project.title} className="project-card-wrapper">
            <ProjectCard project={project} index={index} smoothMode={smoothMode} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectTerminalFilter;
