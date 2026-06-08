import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_SEQUENCE = [
  "SYSTEM_INIT_v2.0.4",
  "Loading kernel modules................... [OK]",
  "Mounting dependencies.................... [OK]",
  "Establishing secure connection........... [OK]",
  "Initializing AR/VR components............ [OK]",
  "Decrypting profile data.................. [OK]",
  "",
  "Welcome to DHANUSH_G_SHETTY.EXE",
  "Access Granted."
];

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (visibleLines < BOOT_SEQUENCE.length) {
      // Create variable delays for a more realistic typing/loading effect
      let delay = 150 + Math.random() * 200;
      
      // First line appears quickly
      if (visibleLines === 0) delay = 200;
      // Blank lines appear instantly
      if (BOOT_SEQUENCE[visibleLines] === "") delay = 100;
      // "Access Granted" has a slightly longer dramatic pause before it
      if (visibleLines === BOOT_SEQUENCE.length - 1) delay = 500;

      const timeout = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
      }, delay);
      
      return () => clearTimeout(timeout);
    } else {
      // Sequence is complete, wait a moment then trigger fade out
      const timeout = setTimeout(() => {
        setIsFadingOut(true);
        // Wait for the exit animation duration (400ms) before unmounting entirely
        setTimeout(onComplete, 400); 
      }, 800);
      
      return () => clearTimeout(timeout);
    }
  }, [visibleLines, onComplete]);

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div 
          className="fixed inset-0 z-[100] bg-black text-green-500 font-mono p-6 sm:p-10 flex flex-col justify-start items-start overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.05,
            filter: "brightness(2) contrast(1.5)",
            transition: { duration: 0.4, ease: "easeInOut" }
          }}
        >
          <div className="w-full max-w-4xl mx-auto mt-10 sm:mt-20">
            {BOOT_SEQUENCE.slice(0, visibleLines).map((line, index) => (
              <div key={index} className="mb-2 text-sm sm:text-base md:text-lg lg:text-xl font-bold tracking-wider">
                {line}
              </div>
            ))}
            
            {/* Blinking cursor */}
            <motion.div 
              className="w-3 h-5 sm:w-4 sm:h-6 bg-green-500 inline-block mt-1 align-middle"
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
