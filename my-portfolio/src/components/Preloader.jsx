import React from 'react';
import { motion } from 'framer-motion';
import CyberLoader from './CyberLoader';

const Preloader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <CyberLoader text="SYSTEM_BOOT" className="scale-125" />
    </motion.div>
  );
};

export default Preloader;
