import { useState } from 'react';
import { FaLinkedin, FaTerminal, FaGithub, FaCheck, FaInstagram } from "react-icons/fa";
import { MdEmail, MdContentCopy } from "react-icons/md";
import FadeIn from "@/components/ui/FadeIn";
import ScrambleText from "@/components/ui/ScrambleText";

export default function Contact() {
    const [copied, setCopied] = useState(false);
    const email = "dhanushgshetty666@gmail.com";

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="contact" className="min-h-screen py-20 w-full relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <FadeIn>
                    <div className="text-center mb-16">
                        <span className="font-mono inline-block px-3 py-1.5 text-xs font-black tracking-wider uppercase bg-foreground text-background border-2 border-foreground mb-4 select-none">
                            Get In Touch
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground select-none uppercase font-mono mb-4">
                            <ScrambleText text="Contact Me" />
                        </h2>
                        <div className="w-20 h-1.5 bg-foreground mx-auto mb-4" />
                        <p className="text-md sm:text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
                            I'm currently looking for new opportunities. Whether you have a question, a project to discuss, or just want to say hi, I'll try my best to get back to you!
                        </p>
                    </div>
                </FadeIn>

                <div className="grid md:grid-cols-2 gap-10 items-stretch">
                    
                    {/* Left Card: Send Email Block */}
                    <FadeIn delay={0.2} direction="right">
                        <div className="bg-card text-foreground p-8 h-full rounded-none border-4 border-foreground shadow-[6px_6px_0px_var(--foreground)] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0px_var(--foreground)] active:translate-x-0 active:translate-y-0 active:shadow-[6px_6px_0px_var(--foreground)] transition-all duration-300 flex flex-col justify-center items-center text-center">
                            <div className="bg-foreground/5 p-4 border-3 border-foreground rounded-none mb-6">
                                <MdEmail className="size-10 text-foreground" />
                            </div>
                            <h3 className="text-2xl font-black mb-3">Send me an email</h3>
                            <p className="text-muted-foreground font-medium text-sm leading-relaxed mb-8 max-w-sm">
                                The best way to reach me. I typically respond within 24 hours.
                            </p>
                            <a 
                                href={`mailto:${email}`}
                                className="w-full sm:w-auto cursor-pointer border-3 border-foreground bg-card text-foreground font-mono text-sm sm:text-base font-bold uppercase tracking-wider px-8 py-3.5 rounded-none shadow-[4px_4px_0px_var(--foreground)] hover:bg-foreground hover:text-background hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_var(--foreground)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all text-center flex items-center justify-center gap-2"
                            >
                                Say Hello &gt;
                            </a>
                        </div>
                    </FadeIn>
                    
                    {/* Right Card: Interactive Command Console Terminal Block */}
                    <FadeIn delay={0.4} direction="left">
                        <div className="bg-card text-foreground p-8 h-full rounded-none border-4 border-foreground shadow-[6px_6px_0px_var(--foreground)] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0px_var(--foreground)] active:translate-x-0 active:translate-y-0 active:shadow-[6px_6px_0px_var(--foreground)] transition-all duration-300 flex flex-col justify-center">
                            
                            {/* Retro Console Header */}
                            <div className="flex items-center gap-2 mb-6 text-foreground font-mono text-xs border-b-3 border-foreground pb-4 select-none">
                                <FaTerminal size={14} className="animate-pulse" />
                                <span className="font-bold uppercase tracking-wider">sh_terminal</span>
                            </div>

                            <div className="space-y-6 font-mono">
                                <div className="text-foreground/90 font-bold text-sm select-none">
                                    <span className="text-foreground/60 mr-2">➜</span><span className="text-foreground/80">~</span> git clone contact-info
                                </div>
                                
                                {/* Copy Box Command Target */}
                                <div className="bg-foreground/5 p-4 border-2 border-foreground flex items-center justify-between hover:bg-foreground/10 transition-colors">
                                    <code className="text-foreground font-bold text-xs sm:text-sm break-all">
                                        {email}
                                    </code>
                                    <button 
                                        onClick={handleCopy}
                                        className="p-2 border-2 border-foreground bg-card text-foreground shadow-[2px_2px_0px_var(--foreground)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_var(--foreground)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all cursor-pointer relative flex items-center justify-center"
                                        title="Copy Email"
                                    >
                                        {copied ? <FaCheck size={14} className="text-foreground" /> : <MdContentCopy size={14} />}
                                        
                                        <span className={`absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background font-mono text-xs font-black px-2 py-1 border-2 border-foreground opacity-0 transition-opacity whitespace-nowrap select-none ${copied ? 'opacity-100' : ''}`}>
                                            Copied!
                                        </span>
                                    </button>
                                </div>

                                {/* External profile handles */}
                                <div className="flex flex-wrap gap-4 pt-4 mt-2 border-t-2 border-dashed border-foreground/15">
                                    <a 
                                        href="https://github.com/DZ1shetty" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-foreground font-black underline underline-offset-4 decoration-2 hover:bg-foreground hover:text-background px-1 transition-all flex items-center gap-2 text-xs"
                                    >
                                        <FaGithub size={16} />
                                        <span>github.com/DZ1shetty</span>
                                    </a>
                                    <a 
                                        href="https://www.linkedin.com/in/dhanush-g-shetty-b812642b8" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-foreground font-black underline underline-offset-4 decoration-2 hover:bg-foreground hover:text-background px-1 transition-all flex items-center gap-2 text-xs"
                                    >
                                        <FaLinkedin size={16} />
                                        <span>linkedin.com/in/dhanush-g-shetty-b812642b8</span>
                                    </a>
                                    <a 
                                        href="https://www.instagram.com/dhanu_shetty1105/" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-foreground font-black underline underline-offset-4 decoration-2 hover:bg-foreground hover:text-background px-1 transition-all flex items-center gap-2 text-xs"
                                    >
                                        <FaInstagram size={16} />
                                        <span>instagram.com/dhanu_shetty1105</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>

                {/* Footer Section */}
                <footer className="mt-24 text-center font-mono text-xs sm:text-sm font-black border-t-4 border-foreground pt-8 select-none text-muted-foreground uppercase tracking-wider">
                    <p>Copyright © 2026 Dhanush G Shetty. All rights reserved.</p>
                </footer>
            </div>
        </section>
    );
}
