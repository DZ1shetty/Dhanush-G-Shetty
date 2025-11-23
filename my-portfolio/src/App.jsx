import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { Briefcase, User, Wrench, Mail, Linkedin, Github, Instagram, Moon, Sun, GraduationCap, Building2, X, ChevronLeft, ChevronRight, Video, Award, FileText, Terminal } from "lucide-react";
import { motion as _motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { portfolioData } from "./data";
import GlitchText from "./components/GlitchText";
import "./components/GlitchText.css";
import AnimatedHeroText from "./components/AnimatedHeroText";
import HeroParallax from "./components/HeroParallax";
import GlitchImage from "./components/GlitchImage";
import FloatingLines from "./components/FloatingLines";
import ProjectCard from "./components/ProjectCard";
import SkillChart from "./components/SkillChart";
import PageTransition from "./components/PageTransition";

// Lazy load heavy sections
const Certificates = lazy(() => import("./components/Certificates"));
const Journey = lazy(() => import("./components/Journey"));
const Internship = lazy(() => import("./components/Internship"));
const Contact = lazy(() => import("./components/Contact"));

// Utility function to check for reduced motion preference
const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Motion component that respects user's motion preferences
const Motion = ({ children, ...props }) => {
  const shouldReduceMotion = prefersReducedMotion();
  
  if (shouldReduceMotion) {
    // Return a div instead of motion component for reduced motion
    const { initial: _initial, animate: _animate, exit: _exit, whileHover: _whileHover, whileTap: _whileTap, transition: _transition, ...divProps } = props;
    return <div {...divProps}>{children}</div>;
  }
  
  return <_motion.div {...props}>{children}</_motion.div>;
};

// Section component with motion awareness
const Section = ({ id, title, icon, children }) => (
  <Motion 
    id={id} 
    className="py-24 relative" 
    initial={{ opacity: 0, y: 50 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true, amount: 0.1 }} 
    transition={{ duration: 0.6 }}
  >
    <div className="flex flex-col items-center mb-16">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-cyan-500/50" />
        <span className="text-cyan-500 font-mono text-xs tracking-[0.3em] uppercase">System_Section</span>
        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-cyan-500/50" />
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-center flex items-center justify-center gap-x-4 text-white tracking-tight">
        <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">{icon}</span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
          {title}
        </span>
      </h2>
    </div>
    {children}
  </Motion>
);

const AnimatedRoles = ({ roles }) => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (isTyping) {
      const currentRole = roles[index];
      if (displayText.length < currentRole.length) {
        const timer = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 50); // Faster typing
        return () => clearTimeout(timer);
      } else {
        setIsTyping(false);
        setTimeout(() => {
          setIsTyping(true);
          setIndex((p) => (p + 1) % roles.length);
          setDisplayText('');
        }, 2000);
      }
    }
  }, [displayText, index, roles, isTyping]);

  return (
    <div className="text-xl md:text-2xl font-mono h-8 flex justify-center items-center tracking-wider">
      <span className="text-cyan-500 mr-2">{'>'}</span>
      <span className="text-slate-300">
        {displayText}
      </span>
      <span className="w-2 h-5 bg-cyan-500 ml-1 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
    </div>
  );
};





const SocialMediaIcons = ({ socialData }) => {
  const socialPlatforms = [
    {
      key: 'linkedin',
      icon: Linkedin,
      color: 'hover:text-cyan-400',
      label: 'LinkedIn'
    },
    {
      key: 'github',
      icon: Github,
      color: 'hover:text-white',
      label: 'GitHub'
    },
    {
      key: 'instagram',
      icon: Instagram,
      color: 'hover:text-pink-400',
      label: 'Instagram'
    }
  ];

  return (
    <div className="flex justify-center space-x-6 pt-8">
      {socialPlatforms.map((platform) => {
        const Icon = platform.icon;
        const data = socialData[platform.key];

        return (
          <a
            key={platform.key}
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 transition-all duration-300 hover:scale-110 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] overflow-hidden`}
            aria-label={platform.label}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Icon size={24} className={`relative z-10 text-slate-400 ${platform.color} transition-colors duration-300`} />
          </a>
        );
      })}
    </div>
  );
};

const LazyImage = ({ src, alt, className, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 rounded-md flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-slate-400 dark:border-slate-600 border-t-blue-500 rounded-full" />
        </div>
      )}
      
      {/* Actual image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          {...props}
        />
      )}
    </div>
  );
};

const ImageModal = ({ isOpen, images, currentIndex, onClose, onNext, onPrev }) => {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !images.length) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <Motion
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            {/* Modal title for screen readers */}
            <h2 id="modal-title" className="sr-only">Image Gallery</h2>
            <p id="modal-description" className="sr-only">Use arrow keys to navigate between images, or press Escape to close</p>
            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Close modal"
            >
              <X size={32} />
            </button>

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={onPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2 hover:bg-black/70"
                  disabled={currentIndex === 0}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={onNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2 hover:bg-black/70"
                  disabled={currentIndex === images.length - 1}
                  aria-label="Next image"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            {/* Image */}
            <Motion
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <img
                src={currentImage.src}
                alt={currentImage.title || currentImage.caption || 'Image'}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              
              {/* Image title/caption */}
              {(currentImage.title || currentImage.caption) && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 rounded-b-lg">
                  <p className="text-center font-medium">
                    {currentImage.title || currentImage.caption}
                  </p>
                  {/* Image counter */}
                  {images.length > 1 && (
                    <p className="text-center text-sm text-gray-300 mt-1">
                      {currentIndex + 1} of {images.length}
                    </p>
                  )}
                </div>
              )}
            </Motion>
          </div>
        </Motion>
      )}
    </AnimatePresence>
  );
};

const FLOATING_LINES_WAVES = ['top', 'middle', 'bottom'];
const FLOATING_LINES_COUNTS = [10, 15, 20];
const FLOATING_LINES_DISTANCES = [8, 6, 4];

export default function App() {
  const [theme, _setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [filteredProjects, setFilteredProjects] = useState(portfolioData.projects);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Page Transition State
  const [transitionStage, setTransitionStage] = useState('idle'); // idle, entering, exiting
  const [pendingSection, setPendingSection] = useState(null);

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark"); else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  // Register service worker for offline capability
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  const handleFilter = (tag) => {
    setActiveFilter(tag);
    setFilteredProjects(tag === 'All' ? portfolioData.projects : portfolioData.projects.filter(p => p.tags.includes(tag)));
  };

  const allTags = ['All', ...new Set(portfolioData.projects.flatMap(p => p.tags))];

  const [activeNav, setActiveNav] = useState('home');

  const handleNavClick = (section) => {
    if (transitionStage !== 'idle') return;
    setPendingSection(section);
    setTransitionStage('entering');
  };

  const handleTransitionCovered = () => {
    if (pendingSection) {
      const el = document.getElementById(pendingSection);
      if (el) {
        const yOffset = -70;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'auto' });
      }
      setActiveNav(pendingSection);
    }
    // Small delay for effect
    setTimeout(() => {
      setTransitionStage('exiting');
    }, 500);
  };

  const handleTransitionExited = () => {
    setTransitionStage('idle');
    setPendingSection(null);
  };

  // Underline removed: the nav uses text highlight only (activeNav) now

  // Observe sections and set active nav as user scrolls
  useEffect(()=>{
    const ids = ['home','journey','internships','projects','certificate','contact'];
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveNav(entry.target.id);
        }
      });
    }, { 
      rootMargin: '-20% 0px -60% 0px', // Active zone is near the top (20% from top to 60% from bottom)
      threshold: 0 
    });
    
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return ()=> observer.disconnect();
  },[]);

  // Modal handlers
  const openModal = (images, startIndex = 0) => {
    setModalImages(images);
    setCurrentImageIndex(startIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % modalImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + modalImages.length) % modalImages.length);
  };

  // Nav underline removed per user request

  const NavLink = ({ section, children }) => {
    const isActive = activeNav === section;
    return (
      <a
        href={`#${section}`}
        onClick={e => {
          e.preventDefault();
          handleNavClick(section);
        }}
        className={`relative px-4 py-2 rounded-lg font-mono text-sm tracking-wider transition-colors duration-300 ${
          isActive ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
        }`}
        data-section={section}
        aria-current={isActive ? 'page' : undefined}
      >
        {isActive && (
          <Motion
            layoutId="active-nav-pill"
            className="absolute inset-0 bg-cyan-500/10 rounded-lg border-b-2 border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
            transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.8 }}
          />
        )}
        <span className="relative z-10">{children}</span>
      </a>
    );
  };


  return (
    <div className="min-h-screen font-sans text-slate-200" style={{opacity: isPageLoaded ? 1 : 0, transition: 'opacity 1s ease-in-out'}}>
      <Helmet>
        <title>{portfolioData.name} - Portfolio</title>
        <meta name="description" content={`${portfolioData.name} - ${portfolioData.roles.join(', ')}. ${portfolioData.bio.substring(0, 150)}...`} />
        <meta name="keywords" content={`portfolio, ${portfolioData.roles.join(', ')}, web development, projects`} />
        <meta name="author" content={portfolioData.name} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={window.location.origin} />
      </Helmet>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Skip to main content</a>
      
      <PageTransition 
        stage={transitionStage} 
        targetSection={pendingSection} 
        onCovered={handleTransitionCovered} 
        onExited={handleTransitionExited} 
      />

      <header className="fixed top-0 left-0 right-0 bg-black/20 backdrop-blur-md z-50 shadow-lg transition-all duration-300 border-b border-white/10">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <GlitchText speed={1} enableShadows={true} enableOnHover={true} className="text-2xl font-bold tracking-tight text-white">{portfolioData.name}</GlitchText>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 relative flex items-baseline space-x-4">
                <NavLink section="home">Home</NavLink>
                <NavLink section="journey">Journey</NavLink>
                <NavLink section="internships">Internships</NavLink>
                <NavLink section="projects">Projects</NavLink>
                <NavLink section="certificate">Certificate</NavLink>
                <NavLink section="contact">Contact</NavLink>
                {/* Underline removed */}
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className="fixed inset-0 -z-10 h-screen w-full">
        <FloatingLines 
          enabledWaves={FLOATING_LINES_WAVES}
          lineCount={FLOATING_LINES_COUNTS}
          lineDistance={FLOATING_LINES_DISTANCES}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
          mixBlendMode="multiply"
        />
      </div>

      <main id="main-content" className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <section id="home" className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-10 pt-20 pb-10 relative overflow-hidden">
          {/* Cyber Background Elements */}
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <Motion initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="w-full lg:w-1/2 flex flex-col items-center justify-center space-y-8 z-10">
            <HeroParallax className="w-full flex flex-col items-center justify-center">
              <div className="parallax-layer relative" data-depth="mid">
                <div className="relative w-56 h-56 mx-auto mb-8 group">
                  {/* Rotating Rings */}
                  <div className="absolute inset-[-10px] border border-cyan-500/30 rounded-full border-dashed animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-[-20px] border border-purple-500/20 rounded-full border-dotted animate-[spin_15s_linear_infinite_reverse]" />
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-xl opacity-20 animate-pulse group-hover:opacity-40 transition-opacity duration-500"></div>
                  <GlitchImage className="relative z-10 rounded-full w-full h-full object-cover border-2 border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]" src={`https://placehold.co/160x160/E2E8F0/475569?text=DS`} alt={portfolioData.name} speed={0.7} enableShadows={true} enableOnHover={true} />
                  
                  {/* Status Indicator */}
                  <div className="absolute bottom-2 right-2 flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/30 z-20 shadow-lg">
                    <span className="block h-2 w-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.8)]"></span>
                    <span className="text-[10px] font-mono text-emerald-400 tracking-wider">ONLINE</span>
                  </div>
                </div>
              </div>

              <div className="parallax-layer fade-in mt-2 text-center" data-depth="fg">
                <div className="inline-block mb-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-cyan-400 tracking-[0.2em]">SYSTEM_INITIALIZED</div>
                <h1 className="text-5xl md:text-7xl font-bold text-center tracking-tighter mb-4">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-white drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                    {portfolioData.name}
                  </span>
                </h1>
              </div>

              <div className="parallax-layer fade-in mt-4 flex flex-col items-center gap-6" data-depth="fg">
                <AnimatedRoles roles={portfolioData.roles} />
                <SocialMediaIcons socialData={portfolioData.contact.social} />
              </div>
            </HeroParallax>
          </Motion>

          <Motion 
            initial={{ opacity: 0, x: 50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, amount: 0.2 }} 
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 px-4"
          >
            <div className="relative group">
              {/* Cyber Card Container */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition duration-1000"></div>
              <div className="relative bg-black/60 backdrop-blur-xl p-8 md:p-10 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                
                {/* Decorative Lines */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
                
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-lg"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple-500/30 rounded-br-lg"></div>

                <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-x-3 text-white">
                  <User className="w-6 h-6 text-cyan-400"/>
                  <span className="font-mono tracking-tight">ABOUT_ME</span>
                </h2>
                
                <div className="space-y-4 text-slate-300 font-light leading-relaxed">
                  <p className="text-lg">
                    <span className="text-cyan-400 font-bold text-2xl">Hey</span>
                    {portfolioData.bio.substring(3)}
                  </p>
                </div>
              </div>
            </div>
          </Motion>
        </section>

        <Section id="journey" title="My Journey" icon={<GraduationCap className="w-8 h-8"/>}>
          <Suspense fallback={<div className="h-40 flex items-center justify-center text-cyan-500 font-mono">LOADING_SYSTEM_LOGS...</div>}>
            <Journey data={portfolioData.journey} />
          </Suspense>
        </Section>

        <Section id="internships" title="Internship Experience" icon={<Building2 className="w-8 h-8"/>}>
          <Suspense fallback={<div className="h-40 flex items-center justify-center text-cyan-500 font-mono">DECRYPTING_FILES...</div>}>
            <Internship data={portfolioData.internships} openModal={openModal} />
          </Suspense>
        </Section>

        <Section id="projects" title="My Projects" icon={<Briefcase className="w-8 h-8"/>}>
          <div className="flex justify-center mb-10">
            <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 shadow-inner">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleFilter(tag)}
                  className={`relative px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 z-10 ${
                    activeFilter === tag 
                      ? 'text-white' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  aria-label={`Filter projects by ${tag}`}
                  aria-pressed={activeFilter === tag}
                >
                  {activeFilter === tag && (
                    <_motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white/10 rounded-xl shadow-md border border-white/10"
                      transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10">{tag}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
              ))}
            </AnimatePresence>
          </div>
        </Section>

        <Section id="certificate" title="Certificates & Achievements" icon={<Award className="w-8 h-8"/>}>
          <Suspense fallback={<div className="h-40 flex items-center justify-center text-cyan-500 font-mono">VERIFYING_CREDENTIALS...</div>}>
            <Certificates data={portfolioData.certificates} />
          </Suspense>
        </Section>

        <Section id="contact" title="Contact Me" icon={<Mail className="w-8 h-8"/>}>
          <Suspense fallback={<div className="h-40 flex items-center justify-center text-cyan-500 font-mono">ESTABLISHING_UPLINK...</div>}>
            <Contact />
          </Suspense>
        </Section>
      </main>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        images={modalImages}
        currentIndex={currentImageIndex}
        onClose={closeModal}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </div>
  );
}
