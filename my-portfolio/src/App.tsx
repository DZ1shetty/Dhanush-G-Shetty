import { useState, useEffect } from "react";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/react';
import NavigationBar from "./components/NavBar/NavigationBar";
import Home from "./components/Home/HomeSection";
import About from "./components/About/AboutSection";
import Skills from "./components/Skills/SkillsSection";
import Experience from "./components/Experience/ExperienceSection";
import Projects from "./components/Projects/ProjectSection";
import Contact from "./components/Contact/ContactSection";
import Squares from "./components/ui/Squares";
import BootScreen from "./components/ui/BootScreen";

function BackgroundLayer() {
  const { theme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const root = window.document.documentElement;
      setIsDark(root.classList.contains("dark"));
    };
    
    checkTheme();
    // Use MutationObserver to watch for class changes on HTML tag
    const observer = new MutationObserver(checkTheme);
    observer.observe(window.document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, [theme]);

  return (
    <div className="fixed inset-0 z-[-1] bg-background">
      <Squares 
          direction="diagonal"
          speed={0.5}
          squareSize={50}
          borderColor={isDark ? "#ffffff" : "#000000"} 
          hoverFillColor={isDark ? "#22c55e" : "#22c55e"}
      />
    </div>
  );
}

function App() {
  const [isBooting, setIsBooting] = useState(() => {
    // Check if we've already booted in this session
    return !sessionStorage.getItem("hasBooted");
  });

  if (isBooting) {
    return <BootScreen onComplete={() => {
      sessionStorage.setItem("hasBooted", "true");
      setIsBooting(false);
    }} />;
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BackgroundLayer />
      <NavigationBar />
      <main>
        <Home />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>      
      <Analytics />   
      <SpeedInsights /> 
    </ThemeProvider>
  )
}

export default App
