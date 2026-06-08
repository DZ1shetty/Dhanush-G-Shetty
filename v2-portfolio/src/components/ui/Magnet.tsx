import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  className?: string;
}

export default function Magnet({ 
  children, 
  padding = 100, 
  disabled = false, 
  magnetStrength = 2,
  className = ""
}: MagnetProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const innerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (disabled || !innerRef.current) return;

    const { left, top, width, height } = innerRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    
    // Check if within padding range
    const absoluteDistance = Math.max(Math.abs(distX), Math.abs(distY));
    if (absoluteDistance < width / 2 + padding) {
        // Magnetic pull physics
        setPosition({ 
            x: (distX * magnetStrength) / 10, 
            y: (distY * magnetStrength) / 10 
        });
    } else {
        setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div 
      className={className} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-block", position: "relative" }}
    >
      <motion.div
        ref={innerRef}
        animate={{ 
            x: position.x, 
            y: position.y 
        }}
        transition={{ 
            type: "spring", 
            stiffness: 150, 
            damping: 15, 
            mass: 0.1 
        }}
        style={{ width: "100%", height: "100%" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
