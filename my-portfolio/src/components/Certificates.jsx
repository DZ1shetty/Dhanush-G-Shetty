import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Code, Briefcase, BookOpen, ShieldCheck } from 'lucide-react';
import CertificateGrid from './CertificateGrid';

const Certificates = ({ data, smoothMode }) => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'ALL_CREDENTIALS', icon: Award },
    { id: 'courses', label: 'COURSES', icon: BookOpen },
    { id: 'hackathons', label: 'HACKATHONS', icon: Code },
    { id: 'internships', label: 'INTERNSHIPS', icon: Briefcase },
  ];

  const getFilteredCerts = () => {
    if (activeTab === 'all') {
      return [
        ...data.courses,
        ...data.hackathons,
        ...data.internships
      ];
    }
    return data[activeTab] || [];
  };

  const filteredCerts = getFilteredCerts();

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Certificate Navbar */}
      <div className="flex justify-center mb-16">
        <div className="flex flex-wrap justify-center gap-4 p-2 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-3 text-sm font-mono font-bold rounded-full transition-all duration-300 flex items-center gap-2 z-10 overflow-hidden group ${
                  isActive 
                    ? 'text-black' 
                    : 'text-slate-400 hover:text-cyan-400'
                }`}
              >
                {isActive && (
                  smoothMode ? (
                    <div className="absolute inset-0 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6)]" />
                  ) : (
                    <motion.div
                      layoutId="activeCertTab"
                      className="absolute inset-0 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6)]"
                      transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    />
                  )
                )}
                <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-black' : 'group-hover:text-cyan-400'}`} />
                <span className="relative z-10 tracking-wider">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex justify-end mb-8 px-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-500/70 bg-cyan-900/10 px-4 py-2 rounded-full border border-cyan-500/20">
          <ShieldCheck className="w-3 h-3" />
          <span>VERIFIED_RECORDS: {filteredCerts.length}</span>
        </div>
      </div>

      {/* Content Area */}
      {smoothMode ? (
        <div className="min-h-[400px]">
          <CertificateGrid certs={filteredCerts} smoothMode={smoothMode} />
        </div>
      ) : (
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-[400px]"
        >
          <CertificateGrid certs={filteredCerts} smoothMode={smoothMode} />
        </motion.div>
      )}
    </div>
  );
};

export default Certificates;
