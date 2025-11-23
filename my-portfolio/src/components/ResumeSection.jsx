import React, { useState } from 'react';
import { Download, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ResumeSection = ({ resumeUrl }) => {
  const [showViewer, setShowViewer] = useState(false);

  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <a
          href={resumeUrl}
          download="Resume.pdf"
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
        >
          <Download size={20} />
          <span>Download Resume</span>
        </a>
        
        <button
          onClick={() => setShowViewer(!showViewer)}
          className="flex items-center gap-2 px-6 py-3 bg-black/30 backdrop-blur-md text-white rounded-lg hover:bg-black/50 transition-colors shadow-lg hover:shadow-xl border border-white/10"
        >
          {showViewer ? <EyeOff size={20} /> : <Eye size={20} />}
          <span>{showViewer ? 'Hide Preview' : 'View Resume'}</span>
        </button>
      </div>

      <AnimatePresence>
        {showViewer && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="w-full h-[800px] bg-black/30 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-white/10">
              <iframe
                src={`${resumeUrl}#toolbar=0`}
                className="w-full h-full"
                title="Resume Viewer"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeSection;
