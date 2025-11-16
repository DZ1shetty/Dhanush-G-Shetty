import React, { useState, useEffect, useRef } from "react";
import { Briefcase, User, Wrench, Mail, Linkedin, Github, Instagram, Moon, Sun, GraduationCap, Building2, X, ChevronLeft, ChevronRight, Video, Award } from "lucide-react";
import { motion as _motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { portfolioData } from "./data";
import GlitchText from "./components/GlitchText";
import "./components/GlitchText.css";
import AnimatedHeroText from "./components/AnimatedHeroText";
import HeroParallax from "./components/HeroParallax";
import GlitchImage from "./components/GlitchImage";
import FloatingLines from "./components/FloatingLines";

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
    className="py-16" 
    initial={{ opacity: 0, y: 50 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true, amount: 0.2 }} 
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-x-3">{icon}{title}</h2>
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
        }, 100);
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
    <div className="text-2xl md:text-3xl font-semibold text-slate-600 dark:text-slate-400 h-10 flex justify-center items-center">
      {displayText}<span>|</span>
    </div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission (replace with actual API call)
    try {
      // Here you would typically send the form data to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <p className="text-lg mb-6 text-center text-slate-600 dark:text-slate-400">
        I'm currently open to new opportunities. Feel free to reach out!
      </p>
      
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <Motion
            key="success"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="text-center p-8 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800"
          >
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-2">Message Sent!</h3>
            <p className="text-green-700 dark:text-green-300">Thank you for reaching out. I'll get back to you soon!</p>
          </Motion>
        ) : (
          <_motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                    errors.name
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-200'
                  } bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100`}
                  placeholder="Your full name"
                  aria-describedby={errors.name ? "name-error" : undefined}
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && <p id="name-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-200'
                  } bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100`}
                  placeholder="your.email@example.com"
                  aria-describedby={errors.email ? "email-error" : undefined}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                  errors.subject
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                    : 'border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-200'
                } bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100`}
                placeholder="What's this about?"
                aria-describedby={errors.subject ? "subject-error" : undefined}
                aria-invalid={errors.subject ? "true" : "false"}
              />
              {errors.subject && <p id="subject-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>}
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 resize-vertical ${
                  errors.message
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                    : 'border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-200'
                } bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100`}
                placeholder="Tell me about your project or opportunity..."
                aria-describedby={errors.message ? "message-error" : undefined}
                aria-invalid={errors.message ? "true" : "false"}
              />
              {errors.message && <p id="message-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </_motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};



const SocialMediaIcons = ({ socialData }) => {
  const socialPlatforms = [
    {
      key: 'linkedin',
      icon: Linkedin,
      color: 'hover:text-blue-600 dark:hover:text-blue-400',
      label: 'LinkedIn'
    },
    {
      key: 'github',
      icon: Github,
      color: 'hover:text-slate-900 dark:hover:text-white',
      label: 'GitHub'
    },
    {
      key: 'instagram',
      icon: Instagram,
      color: 'hover:text-pink-500 dark:hover:text-pink-400',
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
            className={`p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 ${platform.color} transition-colors duration-300 hover:scale-110`}
            aria-label={platform.label}
          >
            <Icon size={24} />
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

export default function App() {
  const [theme, _setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [filteredProjects, setFilteredProjects] = useState(portfolioData.projects);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    const el = document.getElementById(section);
    if (el) {
      // Use native scroll-behavior for smoother performance
      const yOffset = -70; // header height (match rootMargin)
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setActiveNav(section);
  };

  // Underline removed: the nav uses text highlight only (activeNav) now

  // Observe sections and set active nav as user scrolls
  useEffect(()=>{
    const ids = ['home','about','journey','internships','projects','certificate','skills','contact'];
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) setActiveNav(id);
        }
      });
    }, { root: null, rootMargin: '-40% 0px -55% 0px', threshold: 0.15 });
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

  const NavLink = ({ section, children }) => (
    <a
      href={`#${section}`}
      onClick={e => {
        e.preventDefault();
        handleNavClick(section);
      }}
      className={`px-4 py-2 rounded-lg font-medium relative transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        activeNav === section ? 'text-blue-500 dark:text-blue-300 font-semibold' : (theme === 'light'
          ? 'text-slate-700 hover:text-black hover:bg-slate-100'
          : 'text-slate-300 hover:text-white hover:bg-slate-800')
      }`}
      data-section={section}
      aria-current={activeNav === section ? 'page' : undefined}
    >
      <span className="nav-link-text">{children}</span>
    </a>
  );


  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200" style={{opacity: isPageLoaded ? 1 : 0, transition: 'opacity 1s ease-in-out'}}>
      <Helmet>
        <title>{portfolioData.name} - Portfolio</title>
        <meta name="description" content={`${portfolioData.name} - ${portfolioData.roles.join(', ')}. ${portfolioData.bio.substring(0, 150)}...`} />
        <meta name="keywords" content={`portfolio, ${portfolioData.roles.join(', ')}, ${portfolioData.skills.join(', ')}, web development, projects`} />
        <meta name="author" content={portfolioData.name} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={window.location.origin} />
      </Helmet>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Skip to main content</a>
      <header className="fixed top-0 left-0 right-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md z-50 shadow-lg transition-all duration-300">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <GlitchText speed={1} enableShadows={true} enableOnHover={true} className={`text-2xl font-bold tracking-tight${theme === 'dark' ? ' dark' : ''}`}>{portfolioData.name}</GlitchText>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 relative flex items-baseline space-x-4">
                <NavLink section="home">Home</NavLink>
                <NavLink section="about">About</NavLink>
                <NavLink section="journey">Journey</NavLink>
                <NavLink section="internships">Internships</NavLink>
                <NavLink section="projects">Projects</NavLink>
                <NavLink section="certificate">Certificate</NavLink>
                <NavLink section="skills">Skills</NavLink>
                <NavLink section="contact">Contact</NavLink>
                {/* Underline removed */}
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className="fixed inset-0 -z-10 h-screen w-full">
        <FloatingLines 
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={[10, 15, 20]}
          lineDistance={[8, 6, 4]}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
          mixBlendMode="multiply"
        />
      </div>

      <main id="main-content" className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <section id="home" className="min-h-screen flex items-center justify-center text-center">
          <Motion initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="space-y-4">
            <HeroParallax className="w-full flex flex-col items-center justify-center">
              <div className="parallax-layer" data-depth="mid">
                <div className="relative w-40 h-40 mx-auto">
                  <GlitchImage className="rounded-full w-full h-full object-cover border-4 border-slate-200 dark:border-slate-700 shadow-lg" src={`https://placehold.co/160x160/E2E8F0/475569?text=DS`} alt={portfolioData.name} speed={0.7} enableShadows={true} enableOnHover={false} />
                  <span className="absolute bottom-2 right-2 block h-6 w-6 bg-green-400 rounded-full border-2 border-white dark:border-slate-900"></span>
                </div>
              </div>

              <div className="parallax-layer fade-in mt-6" data-depth="fg">
                <AnimatedHeroText text={`Hi, I'm ${portfolioData.name}`} className="text-4xl md:text-5xl" />
              </div>

              <div className="parallax-layer fade-in mt-2" data-depth="fg">
                <AnimatedRoles roles={portfolioData.roles} />
                <SocialMediaIcons socialData={portfolioData.contact.social} />
              </div>
            </HeroParallax>
          </Motion>
        </section>

        <Section id="about" title="About Me" icon={<User className="w-8 h-8"/>}>
          <div className="max-w-3xl mx-auto bg-white/95 dark:bg-slate-800/95 p-6 rounded-xl shadow-lg"><p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">{portfolioData.bio}</p></div>
        </Section>

        <Section id="journey" title="My Journey" icon={<GraduationCap className="w-8 h-8"/>}>
          <div className="max-w-3xl mx-auto">
            <div className="relative border-l-2 border-slate-200 dark:border-slate-700">
              {portfolioData.journey.map((item, index) => (
                <Motion key={index} className="mb-8 ml-8" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6 }}>
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-slate-200 rounded-full -left-4 ring-8 ring-white dark:ring-slate-900 dark:bg-slate-700">
                    {item.type === 'Education' ? <GraduationCap className="w-5 h-5 text-slate-600 dark:text-slate-300" /> : <Building2 className="w-5 h-5 text-slate-600 dark:text-slate-300" />}
                  </span>
                  <div className="p-4 bg-white/95 dark:bg-slate-800/95 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                    <time className="text-sm font-normal leading-none text-slate-400 dark:text-slate-500">{item.date}</time>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-1">{item.title}</h3>
                    <p className="text-base font-normal text-blue-500 dark:text-blue-400 mb-2">{item.institution}</p>
                    <p className="text-base font-normal text-slate-600 dark:text-slate-300">{item.description}</p>
                  </div>
                </Motion>
              ))}
            </div>
          </div>
        </Section>

        <Section id="internships" title="Internship Experience" icon={<Building2 className="w-8 h-8"/>}>
          <div className="max-w-4xl mx-auto space-y-4">
            {portfolioData.internships.map((internship, index) => (
              <div key={index} className="bg-white/95 dark:bg-slate-800/95 p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold">{internship.title}</h3>
                <p className="text-blue-500 dark:text-blue-400 font-semibold">{internship.company} | {internship.duration}</p>
                <p className="mt-4 text-slate-600 dark:text-slate-300">{internship.description}</p>
                <div className="mt-8 space-y-8">
                  {internship.projects.map((project, pIndex) => (
                    <div key={pIndex}>
                      <h4 className="text-xl font-bold flex items-center gap-2">{project.images ? <Briefcase/> : <Video/>} {project.title}</h4>
                      <p className="mt-2 text-slate-600 dark:text-slate-300">{project.description}</p>
                      {project.images && (
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                          {project.images.map((img, i) => (
                            <Motion 
                              key={i} 
                              whileHover={{ scale: 1.05 }}
                              className="cursor-pointer"
                              onClick={() => openModal(project.images, i)}
                            >
                              <LazyImage src={img.src} alt={img.caption} className="rounded-lg shadow-md object-cover w-full h-32"/>
                            </Motion>
                          ))}
                        </div>
                      )}
                      {project.video && (
                        <div className="mt-4">
                          <video controls className="w-full rounded-lg shadow-md">
                            <source src={project.video} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="projects" title="My Projects" icon={<Briefcase className="w-8 h-8"/>}>
          <div className="flex justify-center flex-wrap gap-2 mb-6">
            {allTags.map(tag => (
              <button key={tag} onClick={() => handleFilter(tag)} className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${activeFilter === tag ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900' : 'bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`} aria-label={`Filter projects by ${tag}`} aria-pressed={activeFilter === tag}>{tag}</button>
            ))}
          </div>
          <Motion layout className="grid md:grid-cols-2 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <Motion key={project.title} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.4 }} className="bg-white/95 dark:bg-slate-800/95 rounded-xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">{project.tags.map((tag, i) => (<span key={i} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{tag}</span>))}</div>
                    <div className="flex items-center">
                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors duration-300 font-medium">GitHub</a>
                    </div>
                  </div>
                </Motion>
              ))}
            </AnimatePresence>
          </Motion>
        </Section>

        <Section id="certificate" title="My Certificates" icon={<Award className="w-8 h-8"/>}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { src: '/AR Development.jpeg', title: 'AR Development' },
              { src: '/Business Analysis And Process Management.jpeg', title: 'Business Analysis And Process Management' },
              { src: '/Google Ads For Beginner.jpeg', title: 'Google Ads For Beginner' },
              { src: '/Microsoft Excel.jpeg', title: 'Microsoft Excel' },
              { src: '/Unity Essentials.jpeg', title: 'Unity Essentials' },
              { src: '/VR Development.jpeg', title: 'VR Development' },
              { src: '/WordPress.jpeg', title: 'WordPress' },
              { src: '/Microsoft AI Learning.jpg', title: 'Microsoft AI Learning' },
              { src: '/Microsoft Applied AI Learning.jpg', title: 'Microsoft Applied AI Learning' },
              { src: '/Microsoft Azure Learning.jpg', title: 'Microsoft Azure Learning' },
            ].map((cert, index) => (
              <Motion
                key={cert.title}
                className="text-center cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => openModal([
                  { src: '/AR Development.jpeg', title: 'AR Development' },
                  { src: '/Business Analysis And Process Management.jpeg', title: 'Business Analysis And Process Management' },
                  { src: '/Google Ads For Beginner.jpeg', title: 'Google Ads For Beginner' },
                  { src: '/Microsoft Excel.jpeg', title: 'Microsoft Excel' },
                  { src: '/Unity Essentials.jpeg', title: 'Unity Essentials' },
                  { src: '/VR Development.jpeg', title: 'VR Development' },
                  { src: '/WordPress.jpeg', title: 'WordPress' },
                  { src: '/Microsoft AI Learning.jpg', title: 'Microsoft AI Learning' },
                  { src: '/Microsoft Applied AI Learning.jpg', title: 'Microsoft Applied AI Learning' },
                  { src: '/Microsoft Azure Learning.jpg', title: 'Microsoft Azure Learning' },
                ], index)}
              >
                <div className="bg-white/95 dark:bg-slate-800/95 p-4 rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                  <LazyImage src={cert.src} alt={cert.title} className="rounded-md w-full h-auto aspect-[4/3] object-contain" />
                </div>
                <h3 className="mt-4 font-semibold text-slate-700 dark:text-slate-300">{cert.title}</h3>
              </Motion>
            ))}
          </div>
        </Section>

        <Section id="hackathon-certificates" title="Hackathon Certificates" icon={<Award className="w-8 h-8"/>}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { src: '/ACEathon Participation Certificate.jpg', title: 'ACEathon Participation Certificate' },
              { src: '/HackauraParticipation.jpg', title: 'Hackaura Hackathon Participation Certificate' },
            ].map((cert, index) => (
              <Motion
                key={cert.title}
                className="text-center cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => openModal([
                  { src: '/ACEathon Participation Certificate.jpg', title: 'ACEathon Participation Certificate' },
                  { src: '/HackauraParticipation.jpg', title: 'Hackaura Hackathon Participation Certificate' },
                ], index)}
              >
                <div className="bg-white/95 dark:bg-slate-800/95 p-4 rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                  <LazyImage src={cert.src} alt={cert.title} className="rounded-md w-full h-auto aspect-[4/3] object-contain" />
                </div>
                <h3 className="mt-4 font-semibold text-slate-700 dark:text-slate-300">{cert.title}</h3>
              </Motion>
            ))}
          </div>
        </Section>

        <Section id="internship-certificates" title="Internship Certificates" icon={<Award className="w-8 h-8"/>}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { src: '/AR-VR Internship Certificate.jpg', title: 'AR-VR Internship Certificate' },
            ].map((cert, index) => (
              <Motion
                key={cert.title}
                className="text-center cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => openModal([
                  { src: '/AR-VR Internship Certificate.jpg', title: 'AR-VR Internship Certificate' },
                ], index)}
              >
                <div className="bg-white/95 dark:bg-slate-800/95 p-4 rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                  <LazyImage src={cert.src} alt={cert.title} className="rounded-md w-full h-auto aspect-[4/3] object-contain" />
                </div>
                <h3 className="mt-4 font-semibold text-slate-700 dark:text-slate-300">{cert.title}</h3>
              </Motion>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills & Expertise" icon={<Wrench className="w-8 h-8"/>}>
          <div className="max-w-4xl mx-auto bg-white/95 dark:bg-slate-800/95 p-6 rounded-xl shadow-lg">
            <div className="space-y-6">
              {[
                { name: "SQL", level: 69 },
                { name: "Java", level: 29 },
                { name: "HTML", level: 26 },
                { name: "Python", level: 11 },
                { name: "MongoDB", level: 7 },
                { name: "DSA (Data Structures & Algorithms)", level: 6 },
                { name: "React", level: 6 },
                { name: "JavaScript", level: 2 },
                { name: "Git", level: 2 },
                { name: "CSS", level: 1 }
              ].map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-slate-500">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                    <Motion
                      className="bg-gradient-to-r from-blue-500 to-teal-500 h-3 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="testimonials" title="Social Proof" icon={<Award className="w-8 h-8"/>}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/95 dark:bg-slate-800/95 p-6 rounded-xl shadow-lg text-center">
              <Github className="w-12 h-12 mx-auto mb-4 text-slate-600 dark:text-slate-400" />
              <h3 className="text-2xl font-bold text-blue-500">10+</h3>
              <p className="text-slate-600 dark:text-slate-400">GitHub Repositories</p>
            </div>
            <div className="bg-white/95 dark:bg-slate-800/95 p-6 rounded-xl shadow-lg text-center">
              <Linkedin className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-2xl font-bold text-blue-500"></h3>
              <p className="text-slate-600 dark:text-slate-400">LinkedIn Connections</p>
            </div>
            <div className="bg-white/95 dark:bg-slate-800/95 p-6 rounded-xl shadow-lg text-center">
              <Award className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
              <h3 className="text-2xl font-bold text-blue-500">12</h3>
              <p className="text-slate-600 dark:text-slate-400">Certificates Earned</p>
            </div>
          </div>
        </Section>

        <Section id="contact" title="Contact Me" icon={<Mail className="w-8 h-8"/>}>
          <ContactForm />
        </Section>
      </main>

      <footer>
        <div className="text-center py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <p className="text-sm text-slate-500 dark:text-slate-400">© {new Date().getFullYear()} {portfolioData.name}. All Rights Reserved.</p>
        </div>
      </footer>

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
