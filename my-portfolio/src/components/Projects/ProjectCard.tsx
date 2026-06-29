import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import { FaGithub } from "react-icons/fa6";

interface ProjectProps {
    title: string;
    description?: string;
    technologies: string[];
    githubLink?: string;
    liveLink?: string;
}

export default function ProjectCard({ title, description, technologies, githubLink, liveLink }: ProjectProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div className="group relative w-full h-full flex flex-col perspective-[1000px]">
            {/* Neubrutalist Card Container */}
            <motion.div 
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
                className="relative flex flex-col grow bg-card text-foreground border-4 border-foreground shadow-[6px_6px_0px_0px_var(--foreground)] group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[10px_10px_0px_0px_var(--foreground)] active:translate-x-0 active:translate-y-0 active:shadow-[6px_6px_0px_0px_var(--foreground)] transition-all duration-300 ease-out overflow-hidden"
            >
                
                {/* Content Section */}
                <div className="flex flex-col grow p-6 sm:p-7 relative">
                    {/* Floating Action Links */}
                    <div className="absolute top-6 right-6 flex items-center gap-2">
                        {githubLink && (
                            <a 
                                href={githubLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-2 border-2 border-foreground bg-card text-foreground shadow-[2px_2px_0px_0px_var(--foreground)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_var(--foreground)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all cursor-pointer flex items-center justify-center relative z-50"
                                title="View Code"
                            >
                                <FaGithub size={16} />
                            </a>
                        )}
                        {liveLink && (
                            <a 
                                href={liveLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-2 border-2 border-foreground bg-card text-foreground shadow-[2px_2px_0px_0px_var(--foreground)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_var(--foreground)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all cursor-pointer flex items-center justify-center relative z-50"
                                title="View Live Site"
                            >
                                <FiExternalLink size={16} />
                            </a>
                        )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-3 pr-16 sm:pr-24 break-words hyphens-auto" style={{ transform: "translateZ(20px)" }}>
                        {title}
                    </h3>

                    {/* Description */}
                    {description && (
                        <div className="text-sm font-medium text-foreground/80 leading-relaxed mb-4 mt-2 space-y-1.5" style={{ transform: "translateZ(10px)" }}>
                            {description.split("\n").filter(Boolean).map((line, idx) => (
                                <p key={idx} className="flex items-start gap-1.5 text-left">
                                    <span className="shrink-0 text-foreground/60 select-none">•</span>
                                    <span>{line.replace(/^[•\s\-]*/, "").trim()}</span>
                                </p>
                            ))}
                        </div>
                    )}

                    {/* Horizontal blueprint separator */}
                    <div className="w-full h-0.5 border-b-2 border-dashed border-foreground/15 my-4 mt-auto" />

                    {/* Technologies Monospace Badges */}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {technologies.map((tech, index) => (
                            <span 
                                key={index} 
                                className="px-2.5 py-1 text-xs font-mono font-black uppercase bg-background border-2 border-foreground hover:bg-foreground hover:text-background transition-colors select-none"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
