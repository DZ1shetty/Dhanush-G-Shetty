import React from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ShieldCheck, Lock } from 'lucide-react';
import './CertificateGrid.css';

const CertificateGrid = ({ certs = [], onImageClick = () => {} }) => {
  return (
    <div className="certificate-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {certs.map((cert, idx) => (
        <motion.div
          key={idx}
          className="group relative bg-black/60 backdrop-blur-xl p-3 rounded-xl shadow-lg border border-white/10 overflow-hidden hover:border-cyan-500/50 transition-all duration-500"
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.05 }}
        >
          {/* Header Status */}
          <div className="flex justify-between items-center mb-3 px-1">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-500 tracking-wider">VERIFIED</span>
            </div>
            <ShieldCheck className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-colors" />
          </div>

          <div className="relative certificate-image-container rounded-lg overflow-hidden bg-black/50 border border-white/5 aspect-[4/3] group-hover:border-cyan-500/30 transition-colors">
            <img 
              src={cert.src} 
              alt={cert.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0" 
              loading="lazy" 
            />
            
            {/* Scanning Line Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 pointer-events-none" />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
              <div className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-full flex items-center gap-2 text-cyan-400 text-xs font-mono tracking-wider">
                <ZoomIn className="w-3 h-3" />
                INSPECT_CREDENTIAL
              </div>
            </div>
          </div>
          
          <div className="relative mt-4 px-1">
            <h3 className="font-bold text-slate-300 group-hover:text-cyan-400 transition-colors line-clamp-2 text-sm font-mono leading-tight">
              {cert.title}
            </h3>
            <div className="mt-2 h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent group-hover:from-cyan-500/50 transition-colors" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CertificateGrid;
