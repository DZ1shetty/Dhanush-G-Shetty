import React, { useState, useEffect } from "react";
import { Briefcase, User, Wrench, Mail, Linkedin, Github, Instagram, Moon, Sun, GraduationCap, Building2, X, ChevronLeft, ChevronRight, Video, Award } from "lucide-react";
import { motion as _motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "./data";

const Section = ({ id, title, icon, children }) => (
  <_motion.section id={id} className="py-16" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
    <h2 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-x-3">{icon}{title}</h2>
    {children}
  </_motion.section>
);

const AnimatedRoles = ({ roles }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIndex((p) => (p + 1) % roles.length), 3000);
    return () => clearInterval(interval);
  }, [roles.length]);
  return (
    <div className="text-2xl md:text-3xl font-semibold text-slate-600 dark:text-slate-400 h-10 flex justify-center items-center relative">
      <AnimatePresence mode="wait">
        <_motion.span key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="absolute px-4">
          {roles[index]}
        </_motion.span>
      </AnimatePresence>
    </div>
  );
};

const Lightbox = ({ images, selectedImage, setSelectedImage }) => {
  if (selectedImage === null) return null;
  const changeImage = (direction) => setSelectedImage((selectedImage + direction + images.length) % images.length);
  return (
    <_motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" onClick={() => setSelectedImage(null)}>
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <_motion.img key={selectedImage} src={images[selectedImage].src} alt={images[selectedImage].caption} className="max-w-[90vw] max-h-[80vh] rounded-lg shadow-2xl" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }} />
        <p className="text-white text-center mt-4">{images[selectedImage].caption}</p>
        <button onClick={() => setSelectedImage(null)} className="absolute -top-4 -right-4 bg-white text-black rounded-full p-2"><X /></button>
        <button onClick={() => changeImage(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 text-black rounded-full p-2 hover:bg-white"><ChevronLeft /></button>
        <button onClick={() => changeImage(1)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 text-black rounded-full p-2 hover:bg-white"><ChevronRight /></button>
      </div>
  </_motion.div>
  );
};

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [activeSection, setActiveSection] = useState("home");
  const [filteredProjects, setFilteredProjects] = useState(portfolioData.projects);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isSwitching, setIsSwitching] = useState(false);

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark"); else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    // show a short contrast overlay/flash, then toggle the theme, then hide overlay
    setIsSwitching(true);
    // small delay so overlay is visible before the document theme class toggles
    setTimeout(() => {
      setTheme(t => (t === "light" ? "dark" : "light"));
    }, 200);
    // keep overlay for the duration of the visual transition
    setTimeout(() => setIsSwitching(false), 800);
  };

  useEffect(() => {
    const sectionIds = ['home','about','journey','internships','projects','certificate','hackathon-certificates','internship-certificates','skills','contact'];
    const options = {
      root: null,
      rootMargin: '-70px 0px 0px 0px', // offset for fixed header
      threshold: 0.5,
    };
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleFilter = (tag) => {
    setActiveFilter(tag);
    setFilteredProjects(tag === 'All' ? portfolioData.projects : portfolioData.projects.filter(p => p.tags.includes(tag)));
  };

  const allTags = ['All', ...new Set(portfolioData.projects.flatMap(p => p.tags))];

  const handleNavClick = (section) => {
    const el = document.getElementById(section);
    if (el) {
      const yOffset = -70; // header height (match rootMargin)
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const NavLink = ({ section, children }) => (
    <a
      href={`#${section}`}
      onClick={e => {
        e.preventDefault();
        handleNavClick(section);
      }}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
        activeSection === section
          ? theme === 'light'
            ? 'bg-black text-white shadow-md'
            : 'bg-white text-black shadow-md'
          : theme === 'light'
            ? 'text-slate-700 hover:text-black hover:bg-slate-100'
            : 'text-slate-300 hover:text-white hover:bg-slate-800'
      }`}
    >
      {children}
    </a>
  );

  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200 transition-colors duration-500" style={{filter: isSwitching ? 'contrast(1.25) saturate(1.15)' : undefined, transition: 'filter 350ms ease'}}>
      {/* Contrast overlay used during theme switch to create a visible flash/effect. pointer-events-none so it doesn't block interactions */}
      <div aria-hidden className={`fixed inset-0 pointer-events-none z-50 transition-opacity duration-500 ${isSwitching ? 'opacity-100' : 'opacity-0'}`} style={{background: theme === 'light' ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.6)', mixBlendMode: 'overlay', backdropFilter: 'contrast(1.4) saturate(1.05)'}} />
      <header className="fixed top-0 left-0 right-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md z-50 shadow-lg transition-all duration-300">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">{portfolioData.name}</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink section="home">Home</NavLink>
                <NavLink section="about">About</NavLink>
                <NavLink section="journey">Journey</NavLink>
                <NavLink section="internships">Internships</NavLink>
                <NavLink section="projects">Projects</NavLink>
                <NavLink section="certificate">Certificate</NavLink>
                <NavLink section="skills">Skills</NavLink>
                <NavLink section="contact">Contact</NavLink>
              </div>
            </div>
            <div className="flex items-center">
              <button onClick={toggleTheme} className="p-2 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none transition-all duration-300 hover:scale-110" aria-label="Toggle theme">
                {theme === 'light' ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div className="fixed inset-0 -z-10 bg-gradient-to-r from-slate-50 via-blue-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 animate-gradient" />

      <_motion.div className="fixed top-20 left-10 w-24 h-24 bg-blue-200 dark:bg-blue-800 rounded-full opacity-40 -z-10" animate={{ y: [0, -40, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
      <_motion.div className="fixed top-40 right-20 w-20 h-20 bg-teal-200 dark:bg-teal-800 rounded-full opacity-30 -z-10" animate={{ y: [0, -35, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
      <_motion.div className="fixed bottom-40 left-1/4 w-16 h-16 bg-purple-200 dark:bg-purple-800 rounded-full opacity-25 -z-10" animate={{ y: [0, -30, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
      <_motion.div className="fixed top-60 right-1/3 w-18 h-18 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-35 -z-10" animate={{ y: [0, -25, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <section id="home" className="min-h-screen flex items-center justify-center text-center">
          <_motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="space-y-4">
            <div className="relative w-40 h-40 mx-auto">
              <img className="rounded-full w-full h-full object-cover border-4 border-slate-200 dark:border-slate-700 shadow-lg" src={`https://placehold.co/160x160/E2E8F0/475569?text=DS`} alt={portfolioData.name} />
              <span className="absolute bottom-2 right-2 block h-6 w-6 bg-green-400 rounded-full border-2 border-white dark:border-slate-900"></span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">{portfolioData.name}</span></h1>
            <AnimatedRoles roles={portfolioData.roles} />
            <div className="flex justify-center space-x-4 pt-4">
              <a href={portfolioData.contact.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"><Linkedin size={28} /></a>
              <a href={portfolioData.contact.social.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors duration-300"><Github size={28} /></a>
              <a href={portfolioData.contact.social.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-300"><Instagram size={28} /></a>
            </div>
            <a href="#contact" className="inline-block bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 font-bold py-3 px-8 rounded-full hover:bg-slate-700 dark:hover:bg-white transition-transform transform hover:scale-105 duration-300">Get In Touch</a>
          </_motion.div>
        </section>

        <Section id="about" title="About Me" icon={<User className="w-8 h-8"/>}>
          <div className="max-w-3xl mx-auto bg-white/95 dark:bg-slate-800/95 p-6 rounded-xl shadow-lg"><p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">{portfolioData.bio}</p></div>
        </Section>

        <Section id="journey" title="My Journey" icon={<GraduationCap className="w-8 h-8"/>}>
          <div className="max-w-3xl mx-auto">
            <div className="relative border-l-2 border-slate-200 dark:border-slate-700">
              {portfolioData.journey.map((item, index) => (
                <_motion.div key={index} className="mb-8 ml-8" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6 }}>
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-slate-200 rounded-full -left-4 ring-8 ring-white dark:ring-slate-900 dark:bg-slate-700">
                    {item.type === 'Education' ? <GraduationCap className="w-5 h-5 text-slate-600 dark:text-slate-300" /> : <Building2 className="w-5 h-5 text-slate-600 dark:text-slate-300" />}
                  </span>
                  <div className="p-4 bg-white/95 dark:bg-slate-800/95 rounded-lg shadow-md">
                    <time className="text-sm font-normal leading-none text-slate-400 dark:text-slate-500">{item.date}</time>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-1">{item.title}</h3>
                    <p className="text-base font-normal text-blue-500 dark:text-blue-400 mb-2">{item.institution}</p>
                    <p className="text-base font-normal text-slate-600 dark:text-slate-300">{item.description}</p>
                  </div>
                </_motion.div>
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
                            <_motion.div key={i} whileHover={{ scale: 1.05 }} className="cursor-pointer" onClick={() => setSelectedImage(i)}>
                              <img src={img.src} alt={img.caption} className="rounded-lg shadow-md object-cover w-full h-32"/>
                            </_motion.div>
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

            <AnimatePresence>
              {selectedImage !== null && <Lightbox images={portfolioData.internships[0].projects[0].images} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />}
            </AnimatePresence>

        <Section id="projects" title="My Projects" icon={<Briefcase className="w-8 h-8"/>}>
          <div className="flex justify-center flex-wrap gap-2 mb-6">
            {allTags.map(tag => (
              <button key={tag} onClick={() => handleFilter(tag)} className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${activeFilter === tag ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900' : 'bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>{tag}</button>
            ))}
          </div>
          <_motion.div layout className="grid md:grid-cols-2 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <_motion.div key={project.title} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.4 }} className="bg-white/95 dark:bg-slate-800/95 rounded-xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">{project.tags.map((tag, i) => (<span key={i} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{tag}</span>))}</div>
                    <div className="flex justify-end">
                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors duration-300 font-medium">GitHub</a>
                    </div>
                  </div>
                </_motion.div>
              ))}
            </AnimatePresence>
          </_motion.div>
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
              <_motion.div
                key={cert.title}
                className="text-center cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-white/95 dark:bg-slate-800/95 p-4 rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => setSelectedCertificate(index)}>
                  <img src={cert.src} alt={cert.title} className="rounded-md w-full h-auto aspect-[4/3] object-contain" />
                </div>
                <h3 className="mt-4 font-semibold text-slate-700 dark:text-slate-300">{cert.title}</h3>
              </_motion.div>
            ))}
          </div>
        </Section>

        <AnimatePresence>
          {selectedCertificate !== null && <Lightbox images={[
            { src: '/AR Development.jpeg', caption: 'AR Development' },
            { src: '/Business Analysis And Process Management.jpeg', caption: 'Business Analysis And Process Management' },
            { src: '/Google Ads For Beginner.jpeg', caption: 'Google Ads For Beginner' },
            { src: '/Microsoft Excel.jpeg', caption: 'Microsoft Excel' },
            { src: '/Unity Essentials.jpeg', caption: 'Unity Essentials' },
            { src: '/VR Development.jpeg', caption: 'VR Development' },
            { src: '/WordPress.jpeg', caption: 'WordPress' },
            { src: '/Microsoft AI Learning.jpg', caption: 'Microsoft AI Learning' },
            { src: '/Microsoft Applied AI Learning.jpg', caption: 'Microsoft Applied AI Learning' },
            { src: '/Microsoft Azure Learning.jpg', caption: 'Microsoft Azure Learning' },
          ]} selectedImage={selectedCertificate} setSelectedImage={setSelectedCertificate} />}
        </AnimatePresence>

        <Section id="hackathon-certificates" title="Hackathon Certificates" icon={<Award className="w-8 h-8"/>}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { src: '/ACEathon Participation Certificate.jpg', title: 'ACEathon Participation Certificate' },
            ].map((cert, index) => (
              <_motion.div
                key={cert.title}
                className="text-center cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-white/95 dark:bg-slate-800/95 p-4 rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                  <img src={cert.src} alt={cert.title} className="rounded-md w-full h-auto aspect-[4/3] object-contain" />
                </div>
                <h3 className="mt-4 font-semibold text-slate-700 dark:text-slate-300">{cert.title}</h3>
              </_motion.div>
            ))}
          </div>
        </Section>

        <Section id="internship-certificates" title="Internship Certificates" icon={<Award className="w-8 h-8"/>}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { src: '/AR-VR Internship Certificate.jpg', title: 'AR-VR Internship Certificate' },
            ].map((cert, index) => (
              <_motion.div
                key={cert.title}
                className="text-center cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-white/95 dark:bg-slate-800/95 p-4 rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                  <img src={cert.src} alt={cert.title} className="rounded-md w-full h-auto aspect-[4/3] object-contain" />
                </div>
                <h3 className="mt-4 font-semibold text-slate-700 dark:text-slate-300">{cert.title}</h3>
              </_motion.div>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills & Expertise" icon={<Wrench className="w-8 h-8"/>}>
          <div className="max-w-4xl mx-auto bg-white/95 dark:bg-slate-800/95 p-6 rounded-xl shadow-lg">
            <div className="flex flex-wrap justify-center gap-4">
              {portfolioData.skills.map((skill, index) => (<_motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 py-2 px-4 rounded-lg font-medium">{skill}</_motion.div>))}
            </div>
          </div>
        </Section>

        <Section id="contact" title="Contact Me" icon={<Mail className="w-8 h-8"/>}>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg mb-2 text-slate-600 dark:text-slate-400">I'm currently open to new opportunities. Feel free to reach out!</p>
            <a href={`mailto:${portfolioData.contact.email}`} className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 hover:underline">{portfolioData.contact.email}</a>
          </div>
        </Section>
      </main>

      <footer className="text-center py-4 border-t border-slate-200 dark:border-slate-800">
        <p className="text-sm text-slate-500 dark:text-slate-400">© {new Date().getFullYear()} {portfolioData.name}. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
