import { useState, useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export default function useMagnetic(
  ref: React.RefObject<HTMLElement | null>,
  strength: number = 0.5,
  radius: number = 50
) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring config for a smooth, physical feel
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = element.getBoundingClientRect();
      
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      
      // Calculate distance from center to pointer
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // If within radius, apply magnetic pull
      if (distance < radius) {
        setIsHovered(true);
        x.set(distanceX * strength);
        y.set(distanceY * strength);
      } else {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      x.set(0);
      y.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, strength, radius, x, y]);

  return { x: springX, y: springY, isHovered };
}
