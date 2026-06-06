import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Briefcase, User, Mail, Linkedin, Github, Instagram, GraduationCap, Building2, X, ChevronLeft, ChevronRight, Award, Menu } from "lucide-react";
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
import { usePerformanceDiagnostics } from "./hooks/usePerformanceDiagnostics";
import { useDeviceTier } from "./hooks/useDeviceTier";
import Beams from "./components/Beams";
import Certificates from "./components/Certificates";
import Journey from "./components/Journey";
import Internship from "./components/Internship";
import Contact from "./components/Contact";
import Preloader from "./components/Preloader";

// Utility function to check for reduced motion preference
const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const SCROLL_ANIMATIONS_ENABLED = false;
const NAV_SECTIONS = [
  { id: "home", label: "Home" },
  { id: "journey", label: "Journey" },
  { id: "internships", label: "Internships" },
  { id: "projects", label: "Projects" },
  { id: "certificate", label: "Certificate" },
  { id: "contact", label: "Contact" }
];
const HERO_ILLUSTRATION = "/hero-illustration.png";
const HERO_ILLUSTRATION_2 = "/hero2.jpg";

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
const Section = React.memo(({ id, title, icon, children }) => {
  const animationProps = SCROLL_ANIMATIONS_ENABLED
    ? {
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.1 },
        transition: { duration: 0.6 }
      }
    : {};

  return (
    <Motion 
      id={id} 
      className="py-12 relative" 
      {...animationProps}
    >
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-cyan-500/50" />
          <span className="text-cyan-500 font-mono text-xs tracking-[0.3em] uppercase">System_Section</span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-cyan-500/50" />
        </div>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-center flex items-center justify-center gap-x-4 text-white tracking-tight">
          <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">{icon}</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            {title}
          </span>
        </h2>
      </div>
      {children}
    </Motion>
  );
});
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
    <div className="flex justify-center space-x-4 pt-4">
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

export default function App() {
  const [theme, _setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const deviceTier = useDeviceTier();
  const smoothMode = false;
  const [isPreloaderActive, setIsPreloaderActive] = useState(true);
  usePerformanceDiagnostics({
    enabled: import.meta.env.DEV,
    consoleReporter: true
  });
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Page Transition State
  const [transitionStage, setTransitionStage] = useState('idle'); // idle, entering, exiting
  const [pendingSection, setPendingSection] = useState(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const closeMobileNav = useCallback(() => setIsMobileNavOpen(false), []);

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark"); else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const [activeNav, setActiveNav] = useState('home');

  useEffect(() => {
    if (isMobileNavOpen && !isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else if (!isMobileNavOpen && !isModalOpen) {
      document.body.style.overflow = '';
    }
    return () => {
      if (!isModalOpen) {
        document.body.style.overflow = '';
      }
    };
  }, [isMobileNavOpen, isModalOpen]);

  const handleNavClick = useCallback((section) => {
    if (transitionStage !== 'idle') return;
    setPendingSection(section);
    setTransitionStage('entering');
    setIsMobileNavOpen(false);
  }, [transitionStage]);

  const handleTransitionCovered = useCallback(() => {
    if (pendingSection) {
      const el = document.getElementById(pendingSection);
      if (el) {
        const yOffset = -70;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      setActiveNav(pendingSection);
    }
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
    const ids = NAV_SECTIONS.map((section) => section.id);
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
  const beamQuality = deviceTier.deviceTier === 'unknown' ? 'medium' : deviceTier.deviceTier;
  const disableBeams = prefersReducedMotion();
  const beamPresets = useMemo(
    () => ({
      high: { beamWidth: 3, beamHeight: 22, beamNumber: 16, speed: 2.4, noiseIntensity: 2, scale: 0.25 },
      medium: { beamWidth: 2.4, beamHeight: 18, beamNumber: 12, speed: 2, noiseIntensity: 1.8, scale: 0.22 },
      low: { beamWidth: 2, beamHeight: 14, beamNumber: 8, speed: 1.6, noiseIntensity: 1.4, scale: 0.18 }
    }),
    []
  );
  const background = useMemo(() => {
    if (disableBeams) {
      return (
        <div
          className="fixed inset-0 -z-10 bg-gradient-to-b from-[#03001e] via-[#7303c0]/70 to-[#ec38bc]/60"
          aria-hidden="true"
        />
      );
    }
    const preset = beamPresets[beamQuality] ?? beamPresets.medium;
    return (
      <div className="fixed inset-0 -z-10" style={{ width: '100vw', height: '100vh' }}>
        <Beams
          beamWidth={preset.beamWidth}
          beamHeight={preset.beamHeight}
          beamNumber={preset.beamNumber}
          speed={preset.speed}
          noiseIntensity={preset.noiseIntensity}
          scale={preset.scale}
          rotation={0}
        />
      </div>
    );
  }, [beamPresets, beamQuality, disableBeams]);

  // Memoize the header to only update when activeNav changes
  const header = useMemo(() => {
    return (
      <>
        <header className="fixed top-0 left-0 right-0 bg-black/20 backdrop-blur-md z-[70] shadow-lg transition-all duration-300 border-b border-white/10">
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
              </div>
              <div className="hidden md:block">
                <div className="ml-10 relative flex items-baseline space-x-4">
                  {NAV_SECTIONS.map((section) => (
                    <NavLink
                      key={section.id}
                      section={section.id}
                      activeNav={activeNav}
                      handleNavClick={handleNavClick}
                    >
                      {section.label}
                    </NavLink>
                  ))}
                </div>
              </div>
              <button
                className="md:hidden p-2 rounded-lg border border-white/10 text-white hover:border-cyan-500/50 transition-colors"
                onClick={() => setIsMobileNavOpen((prev) => !prev)}
                aria-label="Toggle navigation"
                aria-expanded={isMobileNavOpen}
              >
                {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </header>
        <AnimatePresence>
          {isMobileNavOpen && (
            <_motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
                {NAV_SECTIONS.map((section, idx) => (
                  <_motion.button
                    key={section.id}
                    className={`w-full py-4 text-center text-xl font-semibold tracking-widest uppercase rounded-xl border ${
                      activeNav === section.id
                        ? 'border-cyan-400 bg-cyan-400/10 text-cyan-100'
                        : 'border-white/10 text-white/80'
                    }`}
                    onClick={() => handleNavClick(section.id)}
                    whileTap={{ scale: 0.97 }}
                    transition={{ delay: idx * 0.03 }}
                  >
                    {section.label}
                  </_motion.button>
                ))}
                <button
                  className="mt-8 text-sm text-slate-400 underline underline-offset-4"
                  onClick={closeMobileNav}
                >
                  Close
                </button>
              </div>
            </_motion.nav>
          )}
        </AnimatePresence>
      </>
    );
  }, [activeNav, closeMobileNav, handleNavClick, isMobileNavOpen, smoothMode]);

  // Memoize the main content to prevent re-renders when activeNav changes
  const mainContent = useMemo(() => {
    const heroPrimaryMotion = SCROLL_ANIMATIONS_ENABLED
      ? {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.8 }
        }
      : {};

    const heroCardMotion = SCROLL_ANIMATIONS_ENABLED
      ? {
          initial: { opacity: 0, x: 50 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.6 }
        }
      : {};

    return (
      <main id="main-content" className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <section id="home" className="min-h-screen flex flex-col items-center justify-center pt-24 pb-16 relative overflow-hidden">
          {/* Centered Premium Typography */}
          <div className="text-center max-w-4xl mx-auto mb-12 flex flex-col items-center gap-4 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-[10px] font-mono text-cyan-400 tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(6,182,212,0.15)] animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              SYSTEM_INITIALIZED // V2.0
            </div>
            
            <h1 className="text-6xl md:text-8xl font-heading font-extrabold tracking-tighter text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-[0_4px_12px_rgba(255,255,255,0.15)]">
                Dhanush G Shetty
              </span>
            </h1>
            
            <div className="h-8 flex justify-center items-center">
              <AnimatedRoles roles={portfolioData.roles} />
            </div>
          </div>

          {/* Minimalist Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-6xl mx-auto px-4 z-10">
            {/* Bento Card 1: Core Bio */}
            <Motion 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-8 group relative rounded-2xl border border-white/10 bg-black/45 backdrop-blur-xl p-8 shadow-[0_15px_50px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-300 hover:border-cyan-500/40"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-cyan-500/30 rounded-tl-xl" />
              
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400/80 mb-4 tracking-wider">
                <span className="text-cyan-500 mr-1">⚡</span> CORE_PROFILE
              </div>
              
              <p className="text-slate-300 text-lg font-light leading-relaxed">
                <span className="text-white font-semibold">I build high-fidelity digital solutions</span> at the intersection of frontend visual excellence and robust backend architecture. Passionate about engineering interactive web applications, resolving performance bottlenecks, and translating complex concepts into clean, accessible code.
              </p>
            </Motion>

            {/* Bento Card 2: System Status */}
            <Motion 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-4 group relative rounded-2xl border border-white/10 bg-black/45 backdrop-blur-xl p-8 shadow-[0_15px_50px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-300 hover:border-purple-500/40"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-purple-500/30 rounded-tr-xl" />

              <div className="flex items-center gap-2 text-xs font-mono text-purple-400/80 mb-4 tracking-wider">
                <span className="text-purple-500 mr-1">⚙️</span> SYSTEM_METRICS
              </div>

              <ul className="space-y-3 font-mono text-xs text-slate-400">
                <li className="flex justify-between border-b border-white/5 pb-1.5">
                  <span>LOC:</span> <span className="text-slate-200">Karnataka, India</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1.5">
                  <span>STACK:</span> <span className="text-slate-200">MERN / Python</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1.5">
                  <span>STATUS:</span> <span className="text-emerald-400 animate-pulse">● Available</span>
                </li>
                <li className="flex justify-between">
                  <span>LATENCY:</span> <span className="text-cyan-400">14ms (Optimal)</span>
                </li>
              </ul>
            </Motion>

            {/* Bento Card 3: Quick Navigation & Socials */}
            <Motion 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-12 group relative rounded-2xl border border-white/10 bg-black/35 backdrop-blur-xl p-6 shadow-[0_15px_50px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-300 hover:border-white/15"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <a
                    href="#projects"
                    onClick={(e) => { e.preventDefault(); handleNavClick('projects'); }}
                    className="px-6 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/35 hover:bg-cyan-500/20 text-cyan-400 font-mono text-xs tracking-wider transition-all duration-300"
                  >
                    EXPLORE_WORK
                  </a>
                  <a
                    href="#contact"
                    onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
                    className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/15 hover:bg-white/10 text-white font-mono text-xs tracking-wider transition-all duration-300"
                  >
                    INITIATE_CONTACT
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-slate-500 tracking-wider">CONNECT:</span>
                  <div className="flex gap-2">
                    {Object.entries(portfolioData.contact.social).map(([platform, data]) => {
                      const icons = { github: Github, linkedin: Linkedin, instagram: Instagram };
                      const Icon = icons[platform] || Github;
                      return (
                        <a
                          key={platform}
                          href={data.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-lg border border-white/5 bg-white/5 text-slate-400 hover:text-white hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-300"
                          aria-label={platform}
                        >
                          <Icon size={16} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Motion>
          </div>
        </section>

      <Section id="journey" title="My Journey" icon={<GraduationCap className="w-8 h-8"/>}>
        <Journey data={portfolioData.journey} smoothMode={smoothMode} />
      </Section>

      <Section id="internships" title="Internship Experience" icon={<Building2 className="w-8 h-8"/>}>
        <Internship data={portfolioData.internships} openModal={openModal} smoothMode={smoothMode} />
      </Section>

      <Section id="projects" title="My Projects" icon={<Briefcase className="w-8 h-8"/>}>
        <ProjectTerminalFilter projects={portfolioData.projects} smoothMode={smoothMode} />
      </Section>

      <Section id="certificate" title="Certificates & Achievements" icon={<Award className="w-8 h-8"/>}>
        <Certificates data={portfolioData.certificates} smoothMode={smoothMode} />
      </Section>

      <Section id="contact" title="Contact Me" icon={<Mail className="w-8 h-8"/>}>
        <Contact smoothMode={smoothMode} />
      </Section>
    </main>
    );
  }, [openModal, smoothMode]);

  const canonicalUrl = typeof window !== 'undefined' ? window.location.origin : 'https://portfolio.local';

  // Initial blur + fade-in for the whole page synced to preloader
  const contentBlurClass = isPreloaderActive
    ? "blur-md opacity-0"
    : "blur-0 opacity-100 transition-all duration-700 ease-out";

  return (
    <>
      <div className="min-h-screen font-sans text-slate-200 relative overflow-hidden">
        <Preloader
          isActive={isPreloaderActive}
          onDone={() => setIsPreloaderActive(false)}
        />
        <Helmet>
          <title>{portfolioData.name} - Portfolio</title>
          <meta name="description" content={`${portfolioData.name} - ${portfolioData.roles.join(', ')}. ${portfolioData.bio.substring(0, 150)}...`} />
          <meta name="keywords" content={`portfolio, ${portfolioData.roles.join(', ')}, web development, projects`} />
          <meta name="author" content={portfolioData.name} />
          <meta name="robots" content="index, follow" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="canonical" href={canonicalUrl} />
        </Helmet>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Skip to main content</a>
        
        <PageTransition 
          stage={transitionStage} 
          targetSection={pendingSection} 
          onCovered={handleTransitionCovered} 
          onExited={handleTransitionExited} 
        />

        {background}

        {header}

        <div className={contentBlurClass}>
          <div className="relative z-10">
            {mainContent}
          </div>
        </div>

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
