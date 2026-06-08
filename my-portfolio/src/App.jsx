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
import FloatingLines from "./components/FloatingLines";
import Certificates from "./components/Certificates";
import Journey from "./components/Journey";
import Internship from "./components/Internship";
import Contact from "./components/Contact";
import Preloader from "./components/Preloader";
import ScrollProgressHUD from "./components/ScrollProgressHUD";
import ScrollReveal from "./components/ScrollReveal";

// Utility function to check for reduced motion preference
const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Scroll animations are enabled dynamically based on Eco Mode and reduced motion preference
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
const Section = React.memo(({ id, title, icon, children, smoothMode = false }) => {
  const shouldReduceMotion = prefersReducedMotion();
  const animationsEnabled = !smoothMode && !shouldReduceMotion;

  const animationProps = animationsEnabled
    ? {
        initial: { opacity: 0, y: 40, filter: "blur(4px)" },
        whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
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
          className="absolute inset-x-0 bottom-0 h-[2px] bg-cyan-400"
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </a>
  );
});
NavLink.displayName = 'NavLink';

export default function App() {
  const [theme, _setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [activeAboutTab, setActiveAboutTab] = useState("bio");
  const deviceTier = useDeviceTier();
  const [smoothMode, setSmoothMode] = useState(false);
  const [isPreloaderActive, setIsPreloaderActive] = useState(true);

  // Auto-detect and set default smoothMode based on device capability
  useEffect(() => {
    if (deviceTier && deviceTier.deviceTier !== 'unknown') {
      setSmoothMode(deviceTier.defaultSmoothMode);
    }
  }, [deviceTier]);
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
  const disableAnimations = prefersReducedMotion();
  const background = useMemo(() => {
    if (disableAnimations) {
      return (
        <div
          className="fixed inset-0 -z-10 bg-gradient-to-b from-[#03001e] via-[#7303c0]/70 to-[#ec38bc]/60"
          aria-hidden="true"
        />
      );
    }
    return (
      <div className="fixed inset-0 -z-10 bg-[#020205] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900/60 via-black to-[#020205]" style={{ width: '100vw', height: '100vh' }}>
        <div className="absolute inset-0 z-10 opacity-35 mix-blend-screen pointer-events-none">
          <FloatingLines
            linesGradient={['#22d3ee', '#8b5cf6', '#ec4899']}
            animationSpeed={1.0}
            interactive={true}
            parallax={true}
            maxFPS={60}
            smoothMode={smoothMode}
          />
        </div>
      </div>
    );
  }, [disableAnimations, smoothMode]);

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
              <div className="hidden md:flex items-center gap-6">
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
                {/* Eco/Performance Toggle Button */}
                <button
                  onClick={() => setSmoothMode((prev) => !prev)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-[11px] tracking-wider transition-all duration-300 ${
                    smoothMode
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                      : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.15)]'
                  }`}
                  title={smoothMode ? "Switch to Performance Mode" : "Switch to Eco Mode (Saves CPU/GPU)"}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${smoothMode ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400 animate-ping'}`} />
                  <span>{smoothMode ? '🌿 ECO_MODE' : '⚡ PERF_MODE'}</span>
                </button>
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

                {/* Mobile Eco/Performance Toggle */}
                <button
                  onClick={() => {
                    setSmoothMode((prev) => !prev);
                  }}
                  className={`w-full py-3.5 text-center text-sm font-mono tracking-widest uppercase rounded-xl border flex items-center justify-center gap-2 transition-all ${
                    smoothMode
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                      : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${smoothMode ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'}`} />
                  <span>{smoothMode ? '🌿 ECO_MODE ACTIVE' : '⚡ PERFORMANCE ACTIVE'}</span>
                </button>

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
    const shouldReduceMotion = prefersReducedMotion();
    const animationsEnabled = !smoothMode && !shouldReduceMotion;

    const heroPrimaryMotion = animationsEnabled
      ? {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.8 }
        }
      : {};

    const heroCardMotion = animationsEnabled
      ? {
          initial: { opacity: 0, x: 50 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.6 }
        }
      : {};

    return (
      <main id="main-content" className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16">
        <section id="home" className="min-h-screen lg:h-screen lg:min-h-0 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 pt-4 pb-4 relative overflow-hidden">
          <Motion {...heroPrimaryMotion} className="w-full lg:w-1/2 flex items-center justify-center z-10">
            <figure className="w-full max-w-md lg:max-w-[340px] xl:max-w-[420px] group relative z-20">
              <div className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.45)] bg-slate-900">
                
                {/* Real Image (Background) - Fades in */}
                <img
                  src={HERO_ILLUSTRATION_2}
                  alt="Detailed developer illustration"
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out delay-100 scale-100 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Sketch Image (Foreground) - Fades out */}
                <img
                  src={HERO_ILLUSTRATION}
                  alt="Illustration of a developer coding on a beanbag chair"
                  className="relative w-full h-full object-cover opacity-100 group-hover:opacity-0 transition-all duration-1000 ease-in-out delay-100 scale-100 group-hover:scale-105 group-hover:blur-sm"
                  loading="lazy"
                />
                
                {/* Subtle Overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </div>
            </figure>
          </Motion>

        <Motion 
          {...heroCardMotion}
          className="w-full lg:w-1/2 px-4 flex flex-col gap-4 lg:gap-3"
        >
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-heading font-bold tracking-tighter mb-4 lg:mb-3">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-white drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                {portfolioData.name}
              </span>
            </h1>
            <div className="flex flex-col gap-2 items-center lg:items-start">
              <SocialMediaIcons socialData={portfolioData.contact.social} />
            </div>
          </div>

          <div className="relative group">
            {/* Cyber Card Container */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition duration-1000"></div>
            <div className="relative bg-black/60 backdrop-blur-xl pt-11 pb-4 px-5 md:px-6 rounded-xl border border-white/10 shadow-2xl overflow-hidden">
              
              {/* Simulated Window Title Bar */}
              <div className="absolute top-0 left-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-white/5 px-4 py-2 flex items-center justify-between z-10">
                <div className="flex items-center gap-1.5 select-none">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 border border-rose-600/40 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 border border-amber-600/40 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 border border-emerald-600/40 inline-block"></span>
                </div>
                <div className="text-[10px] font-mono text-slate-400 tracking-wider flex items-center gap-1.5 select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {activeAboutTab === 'bio' && 'bio.json'}
                  {activeAboutTab === 'stack' && 'capabilities.sh'}
                  {activeAboutTab === 'facts' && 'developer.log'}
                </div>
                <div className="w-10"></div>
              </div>

              {/* Decorative Lines */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-cyan-500/20 rounded-tl-md pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-purple-500/20 rounded-br-md pointer-events-none"></div>

              <h2 className="text-xl font-mono font-bold text-center mb-3 flex items-center justify-center gap-x-2 text-white">
                <span className="text-cyan-400 font-semibold select-none">&lt;</span>
                <span>ABOUT_ME</span>
                <span className="text-cyan-400 font-semibold select-none">/&gt;</span>
              </h2>

              {/* Interactive Tabs Header (Simulated open files in editor) */}
              <div className="flex justify-center border-b border-white/5 mb-4 font-mono text-[10px] sm:text-xs tracking-wider">
                <button 
                  onClick={() => setActiveAboutTab('bio')}
                  className={`flex items-center gap-1 px-3 py-1.5 border-b-2 transition-all duration-300 ${activeAboutTab === 'bio' ? 'border-cyan-400 text-cyan-400 bg-white/5' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  <span className={activeAboutTab === 'bio' ? 'text-cyan-400' : 'text-slate-500'}>📄</span> bio.json
                </button>
                <button 
                  onClick={() => setActiveAboutTab('stack')}
                  className={`flex items-center gap-1 px-3 py-1.5 border-b-2 transition-all duration-300 ${activeAboutTab === 'stack' ? 'border-purple-400 text-purple-400 bg-white/5' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  <span className={activeAboutTab === 'stack' ? 'text-purple-400' : 'text-slate-500'}>⚡</span> capabilities.sh
                </button>
                <button 
                  onClick={() => setActiveAboutTab('facts')}
                  className={`flex items-center gap-1 px-3 py-1.5 border-b-2 transition-all duration-300 ${activeAboutTab === 'facts' ? 'border-emerald-400 text-emerald-400 bg-white/5' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  <span className={activeAboutTab === 'facts' ? 'text-emerald-400' : 'text-slate-500'}>📋</span> developer.log
                </button>
              </div>

              {/* Tab Content */}
              <div className="min-h-[155px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {activeAboutTab === 'bio' && (
                    <Motion
                      key="bio"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="w-full text-slate-300 font-mono leading-normal text-left text-[11px] sm:text-xs"
                    >
                      <div className="flex gap-3">
                        {/* Line Numbers */}
                        <div className="hidden sm:flex flex-col text-slate-600 select-none text-right font-mono pr-2 border-r border-white/5">
                          <span>1</span>
                          <span>2</span>
                          <span>3</span>
                          <span>4</span>
                          <span>5</span>
                          <span>6</span>
                          <span>7</span>
                          <span>8</span>
                          <span>9</span>
                          <span>10</span>
                        </div>
                        {/* JSON block & Text */}
                        <div className="flex-1 space-y-3">
                          <div>
                            <span className="text-pink-500">const</span> <span className="text-cyan-400">developer</span> = <span className="text-yellow-300">{`{`}</span>
                            <div className="pl-4">
                              <span className="text-purple-400">name</span>: <span className="text-emerald-400">"Dhanush G Shetty"</span>,
                              <br />
                              <span className="text-purple-400">role</span>: <span className="text-emerald-400">"Full-Stack & XR Dev"</span>,
                              <br />
                              <span className="text-purple-400">fuel</span>: <span className="text-emerald-400">"Coffee & Warnings"</span>,
                              <br />
                              <span className="text-purple-400">skills</span>: <span className="text-yellow-300">{`[`}</span><span className="text-emerald-400">"React"</span>, <span className="text-emerald-400">"FastAPI"</span>, <span className="text-emerald-400">"Unity/XR"</span><span className="text-yellow-300">{`]`}</span>
                            </div>
                            <span className="text-yellow-300">{`};`}</span>
                          </div>
                          
                          <p className="text-slate-300 font-sans font-light leading-snug text-xs sm:text-sm border-t border-white/5 pt-2">
                            <span className="text-cyan-400 font-bold font-heading text-sm mr-1">Hey there!</span>
                            I'm Dhanush, a developer building high-performance web apps and immersive XR scenes. I bridge the gap between polished frontends (making things look great) and solid backends (making sure they don't break). When not coding, I'm hacking on side projects, learning frameworks, or hunting down bugs.
                          </p>
                        </div>
                      </div>
                    </Motion>
                  )}

                  {activeAboutTab === 'stack' && (
                    <Motion
                      key="stack"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="w-full text-slate-300 font-mono text-left text-[11px] sm:text-xs"
                    >
                      <div className="flex gap-3">
                        {/* Line Numbers */}
                        <div className="hidden sm:flex flex-col text-slate-600 select-none text-right font-mono pr-2 border-r border-white/5">
                          <span>1</span>
                          <span>2</span>
                          <span>3</span>
                          <span>4</span>
                          <span>5</span>
                          <span>6</span>
                          <span>7</span>
                        </div>
                        <div className="flex-1 space-y-3">
                          <div>
                            <span className="text-slate-500 select-none">dhanush@portfolio:~$</span> <span className="text-cyan-400">./capabilities.sh</span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border-t border-white/5 pt-2">
                            <div className="space-y-2">
                              <div>
                                <span className="text-cyan-400 font-bold block mb-0.5">⚡ FRONTEND</span>
                                <div className="text-slate-400 pl-2.5 border-l border-cyan-500/30 leading-snug">
                                  React, Vite, JS, HTML5/CSS3
                                </div>
                              </div>
                              <div>
                                <span className="text-purple-400 font-bold block mb-0.5">⚙️ BACKEND</span>
                                <div className="text-slate-400 pl-2.5 border-l border-purple-500/30 leading-snug">
                                  Node.js, FastAPI, Python, C, Java
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div>
                                <span className="text-emerald-400 font-bold block mb-0.5">🎮 GRAPHICS & XR</span>
                                <div className="text-slate-400 pl-2.5 border-l border-emerald-500/30 leading-snug">
                                  Unity, AR/VR, Three.js
                                </div>
                              </div>
                              <div>
                                <span className="text-yellow-400 font-bold block mb-0.5">🛠️ ENV & TOOLS</span>
                                <div className="text-slate-400 pl-2.5 border-l border-yellow-500/30 leading-snug">
                                  Git, GitHub, Vercel, VS Code
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Motion>
                  )}

                  {activeAboutTab === 'facts' && (
                    <Motion
                      key="facts"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="w-full text-slate-300 font-mono text-left text-[11px] sm:text-xs"
                    >
                      <div className="flex gap-3">
                        {/* Line Numbers */}
                        <div className="hidden sm:flex flex-col text-slate-600 select-none text-right font-mono pr-2 border-r border-white/5">
                          <span>1</span>
                          <span>2</span>
                          <span>3</span>
                          <span>4</span>
                          <span>5</span>
                        </div>
                        <div className="flex-1 space-y-3">
                          <div>
                            <span className="text-slate-500 select-none">dhanush@portfolio:~$</span> <span className="text-cyan-400">tail -n 4 developer.log</span>
                          </div>
                          
                          <div className="space-y-2 border-t border-white/5 pt-2 leading-snug">
                            <div className="flex items-start gap-2">
                              <span className="text-cyan-400 font-bold select-none">[INFO]</span>
                              <span className="text-slate-600 select-none">|</span>
                              <span>Fuelled by coffee, curiosity, and compiler warnings. ☕</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-amber-400 font-bold select-none">[WARN]</span>
                              <span className="text-slate-600 select-none">|</span>
                              <span>Light mode disabled. Eye protection active (Dark only). 🌙</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-purple-400 font-bold select-none">[DEBUG]</span>
                              <span className="text-slate-600 select-none">|</span>
                              <span>Maintaining an 8.37 CGPA at NMAMIT (it's a sport). 🎯</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-emerald-400 font-bold select-none">[SUCCESS]</span>
                              <span className="text-slate-600 select-none">|</span>
                              <span>Always down to hack on random side projects or learn tech. 🚀</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Motion>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Motion>
      </section>

      {/* 3. Glowing Developer Statement ScrollReveal Section */}
      <section className="py-20 max-w-4xl mx-auto text-center px-4 flex flex-col items-center justify-center min-h-[35vh] border-t border-b border-white/5 relative overflow-hidden select-none">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, #22d3ee 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
        
        <ScrollReveal
          baseOpacity={0.05}
          enableBlur={true}
          baseRotation={2}
          blurStrength={8}
          containerClassName="text-center w-full"
          textClassName="font-heading font-extrabold text-slate-100 tracking-tight leading-relaxed text-glow font-sans"
          disabled={!animationsEnabled}
        >
          I believe in building web applications that are not only high-performing and robust, but also visual masterpieces. Visual aesthetics combined with solid, modular engineering is what defines modern software excellence.
        </ScrollReveal>
        
        <div className="flex items-center gap-3 mt-8 font-mono text-[10px] text-cyan-400/70 uppercase tracking-[0.25em]">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" />
          <span>MISSION_STATEMENT.TXT</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" />
        </div>
      </section>

      <Section id="journey" title="My Journey" icon={<GraduationCap className="w-8 h-8"/>} smoothMode={smoothMode}>
        <Journey data={portfolioData.journey} smoothMode={smoothMode} />
      </Section>

      <Section id="internships" title="Internship Experience" icon={<Building2 className="w-8 h-8"/>} smoothMode={smoothMode}>
        <Internship data={portfolioData.internships} openModal={openModal} smoothMode={smoothMode} />
      </Section>

      <Section id="projects" title="My Projects" icon={<Briefcase className="w-8 h-8"/>} smoothMode={smoothMode}>
        <ProjectTerminalFilter projects={portfolioData.projects} smoothMode={smoothMode} />
      </Section>

      <Section id="certificate" title="Certificates & Achievements" icon={<Award className="w-8 h-8"/>} smoothMode={smoothMode}>
        <Certificates data={portfolioData.certificates} smoothMode={smoothMode} />
      </Section>

      <Section id="contact" title="Contact Me" icon={<Mail className="w-8 h-8"/>} smoothMode={smoothMode}>
        <Contact smoothMode={smoothMode} />
      </Section>
    </main>
    );
  }, [openModal, smoothMode, activeAboutTab, setActiveAboutTab]);

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

        <ScrollProgressHUD
          activeNav={activeNav}
          handleNavClick={handleNavClick}
          smoothMode={smoothMode}
        />

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
