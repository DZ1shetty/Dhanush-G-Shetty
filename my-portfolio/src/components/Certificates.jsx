import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Code, Briefcase, BookOpen, ShieldCheck } from 'lucide-react';
import CertificateGrid from './CertificateGrid';

const Certificates = ({ data, smoothMode }) => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'ALL', icon: Award },
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
      {/* Minimalist Tab Nav */}
      <div className="flex items-center justify-between mb-10 border-b border-white/5">
        <div className="flex items-center gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-3 text-[11px] font-mono tracking-widest uppercase transition-colors duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-cyan-400'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Icon className="w-3 h-3" />
                {tab.label}
                {isActive && (
                  smoothMode ? (
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-cyan-400" />
                  ) : (
                    <motion.span
                      layoutId="activeCertTab"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-cyan-400"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )
                )}
              </button>
            );
          })}
        </div>

        {/* Record count */}
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-600 select-none pb-3">
          <ShieldCheck className="w-3 h-3 text-slate-700" />
          <span>{filteredCerts.length}_RECORDS</span>
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="min-h-[400px]"
        >
          <CertificateGrid certs={filteredCerts} smoothMode={smoothMode} />
        </motion.div>
      )}
    </div>
  );
};

export default Certificates;
