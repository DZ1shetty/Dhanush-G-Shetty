import React, { useState } from 'react';
import './ProfileCard.css';
import { motion as _motion } from 'framer-motion';
import { Mail, Linkedin, Github, Instagram } from 'lucide-react';
import GlitchImage from './GlitchImage';

const Motion = ({ children, ...props }) => {
  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (shouldReduceMotion) {
    const { initial: _initial, animate: _animate, exit: _exit, whileHover: _whileHover, whileTap: _whileTap, transition: _transition, ...divProps } = props;
    return <div {...divProps}>{children}</div>;
  }
  
  return <_motion.div {...props}>{children}</_motion.div>;
};

export default function ProfileCard({
  name = 'Dhanush G Shetty',
  title = 'Full Stack Engineer',
  handle = 'DZ1shetty',
  status = 'Online',
  contactText = 'Contact Me',
  avatarUrl = '/path/to/avatar.jpg',
  showUserInfo = true,
  enableTilt = true,
  enableMobileTilt = false,
  onContactClick = () => {},
}) {
  const [tiltStyle, setTiltStyle] = useState({ rotateX: 0, rotateY: 0 });
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const shouldTilt = enableTilt && (!isMobile || enableMobileTilt);

  const handleMouseMove = (e) => {
    if (!shouldTilt) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / rect.height) * 10;
    const rotateY = ((centerX - x) / rect.width) * 10;

    setTiltStyle({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTiltStyle({ rotateX: 0, rotateY: 0 });
  };

  return (
    <Motion
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group profile-card-root relative w-full max-w-sm perspective"
      style={{
        perspective: '1000px',
      }}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="relative glass bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl border border-slate-700/50"
        style={{
          transform: shouldTilt
            ? `perspective(1000px) rotateX(${tiltStyle.rotateX}deg) rotateY(${tiltStyle.rotateY}deg)`
            : 'none',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Background accent removed to keep FloatingLines vibe clean */}

        {/* Content */}
        <div className="relative z-10 p-8 flex flex-col h-full">
          {/* Avatar - Full Width Large Image */}
          <Motion
            className="relative mb-6 flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative w-full aspect-square overflow-hidden rounded-2xl border-2 border-slate-700/50 z-10">
              <div className="avatar-ring -z-10" aria-hidden="true" />
              <GlitchImage src={avatarUrl} alt={name} speed={0.8} enableShadows={true} enableOnHover={true} className="w-full h-full" />
              {/* Status Indicator - Bottom Right */}
              <div className="absolute bottom-4 right-4">
                <div className={`h-5 w-5 rounded-full ${status === 'Online' ? 'bg-green-500' : 'bg-gray-500'} border-3 border-white shadow-lg`} />
              </div>
            </div>
          </Motion>

          {/* User Info */}
          {showUserInfo && (
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-white mb-1 leading-tight">{name}</h3>
              <p className="text-base text-blue-300 font-semibold mb-3">{title}</p>
              <p className="text-sm text-slate-400 mb-3">@{handle}</p>
              <div className="inline-block px-4 py-2 bg-green-500/20 rounded-full border border-green-500/50">
                <span className="text-sm font-bold text-green-300">{status}</span>
              </div>
            </div>
          )}

          {/* Contact Button */}
          <Motion
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mb-6"
          >
            <button
              onClick={onContactClick}
              className="cta-btn w-full py-3 px-4 bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 hover:from-blue-600 hover:via-blue-700 hover:to-cyan-600 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
            >
              {contactText}
            </button>
          </Motion>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-6" />

          {/* Social Links */}
          <div className="flex justify-center gap-5">
            <Motion
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="social-icon p-3 bg-slate-700/50 rounded-xl cursor-pointer hover:bg-blue-600/50 transition-all duration-200 border border-slate-600/50 hover:border-blue-500/50"
            >
              <Mail className="w-6 h-6 text-slate-300" />
            </Motion>
            <Motion
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="social-icon p-3 bg-slate-700/50 rounded-xl cursor-pointer hover:bg-blue-600/50 transition-all duration-200 border border-slate-600/50 hover:border-blue-500/50"
            >
              <Linkedin className="w-6 h-6 text-slate-300" />
            </Motion>
            <Motion
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="social-icon p-3 bg-slate-700/50 rounded-xl cursor-pointer hover:bg-blue-600/50 transition-all duration-200 border border-slate-600/50 hover:border-blue-500/50"
            >
              <Github className="w-6 h-6 text-slate-300" />
            </Motion>
            <Motion
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="social-icon p-3 bg-slate-700/50 rounded-xl cursor-pointer hover:bg-blue-600/50 transition-all duration-200 border border-slate-600/50 hover:border-blue-500/50"
            >
              <Instagram className="w-6 h-6 text-slate-300" />
            </Motion>
          </div>
        </div>
      </div>
    </Motion>
  );
}
