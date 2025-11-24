import React, { useState, useEffect, useRef, Suspense, lazy, useMemo, useCallback } from "react";
import { Briefcase, User, Wrench, Mail, Linkedin, Github, Instagram, Moon, Sun, GraduationCap, Building2, X, ChevronLeft, ChevronRight, Video, Award, FileText, Terminal } from "lucide-react";
import { motion as _motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { portfolioData } from "./data";
import GlitchText from "./components/GlitchText";
import "./components/GlitchText.css";
import AnimatedHeroText from "./components/AnimatedHeroText";
import HeroParallax from "./components/HeroParallax";
import GlitchImage from "./components/GlitchImage";
import ProjectTerminalFilter from "./components/ProjectTerminalFilter";
import SkillChart from "./components/SkillChart";
import PageTransition from "./components/PageTransition";
import CyberLoader from "./components/CyberLoader";
import Preloader from "./components/Preloader";

// Lazy load heavy sections
const FloatingLines = lazy(() => import("./components/FloatingLines"));
const Certificates = lazy(() => import("./components/Certificates"));
const Journey = lazy(() => import("./components/Journey"));
const Internship = lazy(() => import("./components/Internship"));
const Contact = lazy(() => import("./components/Contact"));

// Utility function to check for reduced motion preference
const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const detectSystemSmoothMode = () => {
  if (typeof window === 'undefined') return false;
  const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = typeof navigator !== 'undefined' && navigator.connection?.saveData;
  return prefersReduce || Boolean(saveData);
};

const readSmoothModeSettings = () => {
  if (typeof window === 'undefined') return { value: null, source: 'auto' };
  const storedValue = localStorage.getItem('smoothMode');
  const storedSource = localStorage.getItem('smoothModeSource');
  const source = storedSource === 'user' ? 'user' : 'auto';

  if (storedValue === null) {
    return { value: null, source };
  }

  return { value: storedValue === 'true', source };
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
const Section = React.memo(({ id, title, icon, children }) => (
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
));
Section.displayName = 'Section';

const AnimatedRoles = React.memo(({ roles }) => {
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
});
AnimatedRoles.displayName = 'AnimatedRoles';

const SocialMediaIcons = React.memo(({ socialData }) => {
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
});
SocialMediaIcons.displayName = 'SocialMediaIcons';

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

// Extracted NavLink to prevent re-creation on every render
const NavLink = React.memo(({ section, children, activeNav, handleNavClick }) => {
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
});
NavLink.displayName = 'NavLink';

const FLOATING_LINES_WAVES = ['top', 'middle', 'bottom'];
const FLOATING_LINES_COUNTS = [10, 15, 20];
const FLOATING_LINES_DISTANCES = [8, 6, 4];

export default function App() {
  const [theme, _setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const initialSmoothSettings = useMemo(() => readSmoothModeSettings(), []);
  const [smoothMode, setSmoothMode] = useState(() => initialSmoothSettings.value ?? detectSystemSmoothMode());
  const [smoothModeSource, setSmoothModeSource] = useState(() => initialSmoothSettings.source);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  
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
    if (typeof window === 'undefined') return;
    localStorage.setItem('smoothMode', smoothMode ? 'true' : 'false');
    localStorage.setItem('smoothModeSource', smoothModeSource);
  }, [smoothMode, smoothModeSource]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => {
      if (smoothModeSource === 'user') return;
      const saveData = typeof navigator !== 'undefined' && navigator.connection?.saveData;
      setSmoothMode(mediaQuery.matches || Boolean(saveData));
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [smoothModeSource]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.dataset.smoothMode = smoothMode ? 'on' : 'off';
  }, [smoothMode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
      setIsPageLoaded(true);
    }, 2000);
    return () => clearTimeout(timer);
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

  const toggleSmoothMode = useCallback(() => {
    setSmoothMode((prev) => !prev);
    setSmoothModeSource('user');
  }, []);

  const [activeNav, setActiveNav] = useState('home');

  const handleNavClick = useCallback((section) => {
    if (transitionStage !== 'idle') return;
    setPendingSection(section);
    setTransitionStage('entering');
  }, [transitionStage]);

  const handleTransitionCovered = useCallback(() => {
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
    }, 200);
  }, [pendingSection]);

  const handleTransitionExited = useCallback(() => {
    setTransitionStage('idle');
    setPendingSection(null);
  }, []);

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
  const openModal = useCallback((images, startIndex = 0) => {
    setModalImages(images);
    setCurrentImageIndex(startIndex);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % modalImages.length);
  }, [modalImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + modalImages.length) % modalImages.length);
  }, [modalImages.length]);

  // Memoize the background to prevent re-renders on scroll
  const background = useMemo(() => (
    <div className="fixed inset-0 -z-10 h-screen w-full" style={{ opacity: smoothMode ? 0.45 : 1 }}>
      <Suspense fallback={<div className="w-full h-full bg-slate-900" />}>
        <FloatingLines 
          enabledWaves={FLOATING_LINES_WAVES}
          lineCount={FLOATING_LINES_COUNTS}
          lineDistance={FLOATING_LINES_DISTANCES}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
          mixBlendMode="multiply"
          smoothMode={smoothMode}
        />
      </Suspense>
    </div>
  ), [smoothMode]);

  // Memoize the header to only update when activeNav changes
  const header = useMemo(() => {
    const ModeIcon = smoothMode ? Sun : Wrench;
    const modeLabel = smoothMode ? 'Smooth Mode' : 'Full FX';

    return (
      <header className="fixed top-0 left-0 right-0 bg-black/20 backdrop-blur-md z-50 shadow-lg transition-all duration-300 border-b border-white/10">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <GlitchText
                  speed={1}
                  enableShadows={true}
                  enableOnHover={true}
                  className="text-2xl font-bold tracking-tight text-white"
                  smoothMode={smoothMode}
                >
                  {portfolioData.name}
                </GlitchText>
              </div>
              <button
                type="button"
                onClick={toggleSmoothMode}
                aria-pressed={smoothMode}
                className={`flex items-center gap-2 px-3 py-1 border rounded-full text-[10px] font-mono uppercase tracking-[0.3em] transition ${smoothMode ? 'border-cyan-400 bg-cyan-500/10 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.3)]' : 'border-white/20 text-slate-200/90 hover:border-cyan-500/60'}`}
              >
                <ModeIcon className="h-4 w-4" />
                <span>{modeLabel}</span>
              </button>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 relative flex items-baseline space-x-4">
                <NavLink section="home" activeNav={activeNav} handleNavClick={handleNavClick}>Home</NavLink>
                <NavLink section="journey" activeNav={activeNav} handleNavClick={handleNavClick}>Journey</NavLink>
                <NavLink section="internships" activeNav={activeNav} handleNavClick={handleNavClick}>Internships</NavLink>
                <NavLink section="projects" activeNav={activeNav} handleNavClick={handleNavClick}>Projects</NavLink>
                <NavLink section="certificate" activeNav={activeNav} handleNavClick={handleNavClick}>Certificate</NavLink>
                <NavLink section="contact" activeNav={activeNav} handleNavClick={handleNavClick}>Contact</NavLink>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }, [activeNav, handleNavClick, smoothMode, toggleSmoothMode]);

  // Memoize the main content to prevent re-renders when activeNav changes
  const mainContent = useMemo(() => (
    <main id="main-content" className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
      <section id="home" className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-10 pt-20 pb-10 relative overflow-hidden">
        {/* Cyber Background Elements */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <Motion initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="w-full lg:w-1/2 flex flex-col items-center justify-center space-y-8 z-10">
          <HeroParallax className="w-full flex flex-col items-center justify-center" smoothMode={smoothMode}>
            <div className="parallax-layer relative" data-depth="mid">
              <div className="relative w-56 h-56 mx-auto mb-8 group">
                {/* Rotating Rings */}
                <div className="absolute inset-[-10px] border border-cyan-500/30 rounded-full border-dashed animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-[-20px] border border-purple-500/20 rounded-full border-dotted animate-[spin_15s_linear_infinite_reverse]" />
                
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-xl opacity-20 animate-pulse group-hover:opacity-40 transition-opacity duration-500"></div>
                <GlitchImage className="relative z-10 rounded-full w-full h-full object-cover border-2 border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]" src={`https://placehold.co/160x160/E2E8F0/475569?text=DS`} alt={portfolioData.name} speed={0.7} enableShadows={true} enableOnHover={true} smoothMode={smoothMode} />
                
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
        <Suspense fallback={<CyberLoader text="LOADING_LOGS" />}>
          <Journey data={portfolioData.journey} smoothMode={smoothMode} />
        </Suspense>
      </Section>

      <Section id="internships" title="Internship Experience" icon={<Building2 className="w-8 h-8"/>}>
        <Suspense fallback={<CyberLoader text="DECRYPTING" />}>
          <Internship data={portfolioData.internships} openModal={openModal} smoothMode={smoothMode} />
        </Suspense>
      </Section>

      <Section id="projects" title="My Projects" icon={<Briefcase className="w-8 h-8"/>}>
        <ProjectTerminalFilter projects={portfolioData.projects} smoothMode={smoothMode} />
      </Section>

      <Section id="certificate" title="Certificates & Achievements" icon={<Award className="w-8 h-8"/>}>
        <Suspense fallback={<CyberLoader text="VERIFYING" />}>
          <Certificates data={portfolioData.certificates} smoothMode={smoothMode} />
        </Suspense>
      </Section>

      <Section id="contact" title="Contact Me" icon={<Mail className="w-8 h-8"/>}>
        <Suspense fallback={<CyberLoader text="CONNECTING" />}>
          <Contact smoothMode={smoothMode} />
        </Suspense>
      </Section>
    </main>
  ), [openModal, smoothMode]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showPreloader && <Preloader />}
      </AnimatePresence>
      
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

        {header}
        {background}
        {mainContent}

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
    </>
  );
}
