import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, Code } from 'lucide-react';
import ProjectCard from './ProjectCard';
import './ProjectTerminalFilter.css';

const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const ProjectTerminalFilter = ({ projects, smoothMode = false }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const filterBarRef = useRef(null);
  const gridRef = useRef(null);

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

  // 3D Perspective Grid Warp Scroll Effect
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const grid = gridRef.current;
    if (!grid) return;

    let active = true;
    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
    let velocity = 0;
    let smoothVelocity = 0;
    let rafId = null;

    // Use IntersectionObserver to disable loops when off-screen (critical for performance)
    const observer = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(grid);

    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      velocity = scrollY - lastScrollY;
      lastScrollY = scrollY;
    };

    const updateTransforms = () => {
      if (!active) {
        rafId = requestAnimationFrame(updateTransforms);
        return;
      }

      // Smoothly interpolate scroll velocity
      smoothVelocity += (velocity - smoothVelocity) * 0.15;
      // Fade out velocity over time if no new scroll events happen
      velocity *= 0.85;

      const speed = Math.abs(smoothVelocity);

      const cards = grid.querySelectorAll('.project-3d-card-warper');
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const centerY = vh / 2;
      const centerX = vw / 2;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        
        // Skip computations and clear style if the card is offscreen
        if (rect.bottom < -50 || rect.top > vh + 50) {
          card.style.transform = '';
          return;
        }

        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;

        // Normalized distance from center coordinates (-1 to 1)
        const distX = (cardCenterX - centerX) / centerX;
        const distY = (cardCenterY - centerY) / centerY;

        // 3D perspective calculation
        const rotateX = -distY * speed * 0.85;
        const rotateY = -distX * speed * 0.65;
        const dist = Math.sqrt(distX * distX + distY * distY);
        const translateZ = -dist * speed * 2.2;

        // Cap transform values to keep them clean
        const cappedRotateX = Math.max(-16, Math.min(16, rotateX));
        const cappedRotateY = Math.max(-12, Math.min(12, rotateY));
        const cappedTranslateZ = Math.max(-120, Math.min(0, translateZ));

        card.style.transform = `perspective(1000px) rotateX(${cappedRotateX}deg) rotateY(${cappedRotateY}deg) translateZ(${cappedTranslateZ}px)`;
        card.style.willChange = 'transform';
        // Smooth transition decay when scrolling stops
        card.style.transition = speed < 0.1 ? 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)' : 'none';
      });

      rafId = requestAnimationFrame(updateTransforms);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafId = requestAnimationFrame(updateTransforms);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      
      const cards = grid.querySelectorAll('.project-3d-card-warper');
      cards.forEach((card) => {
        card.style.transform = '';
        card.style.transition = '';
        card.style.willChange = '';
      });
    };
  }, [filteredProjects, smoothMode]);

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

      <motion.div ref={gridRef} layout className="project-grid">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              className="project-card-wrapper"
              layout
              {...getProjectMotionProps(index)}
            >
              <div className="project-3d-card-warper w-full h-full flex justify-center">
                <ProjectCard project={project} index={index} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProjectTerminalFilter;
