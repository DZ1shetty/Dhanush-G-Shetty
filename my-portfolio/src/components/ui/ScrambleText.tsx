import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

interface ScrambleTextProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
}

export default function ScrambleText({ 
  text, 
  className = "", 
  delay = 0
}: ScrambleTextProps) {
  // Start with scrambled text if you want, or just the text
  const [displayText, setDisplayText] = useState(() => 
    text.split("").map(char => char === " " ? " " : CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]).join("")
  );
  
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    // If not in view yet, keep it scrambled
    if (!isInView) return;

    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      
      const timeout = setTimeout(() => {
        let iteration = 0;
        
        // Fast interval for the hacker effect
        const interval = setInterval(() => {
          setDisplayText(() => {
            return text
              .split("")
              .map((letter, index) => {
                if (index < iteration) {
                  return text[index];
                }
                if (letter === " ") return " ";
                return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
              })
              .join("");
          });

          if (iteration >= text.length) {
            clearInterval(interval);
            setDisplayText(text); // Ensure it perfectly matches at the end
          }

          iteration += 1 / 3; 
        }, 30); 

        return () => clearInterval(interval);
      }, delay);
      
      return () => clearTimeout(timeout);
    }
  }, [isInView, text, delay]);

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  );
}
