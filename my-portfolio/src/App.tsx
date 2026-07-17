import { useState, useEffect, lazy, Suspense } from "react";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import NavigationBar from "./components/NavBar/NavigationBar";
import Home from "./components/Home/HomeSection";
import Squares from "./components/ui/Squares";

const About = lazy(() => import("./components/About/AboutSection"));
const Skills = lazy(() => import("./components/Skills/SkillsSection"));
const Experience = lazy(() => import("./components/Experience/ExperienceSection"));
const Projects = lazy(() => import("./components/Projects/ProjectSection"));
const Contact = lazy(() => import("./components/Contact/ContactSection"));

function BackgroundLayer() {
  const { theme } = useTheme();
  
  const [isDark, setIsDark] = useState(() => {
    if (theme === "dark") return true;
    if (theme === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (theme === "dark") {
      setIsDark(true);
    } else if (theme === "light") {
      setIsDark(false);
    } else {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setIsDark(mediaQuery.matches);
      
      const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  return (
    <div className="fixed inset-0 z-[-1] bg-background">
      <Squares 
          direction="diagonal"
          speed={0.5}
          squareSize={50}
          borderColor={isDark ? "rgba(255, 255, 255, 0.35)" : "rgba(0, 0, 0, 0.25)"} 
          hoverFillColor={isDark ? "#60a5fa" : "#3b82f6"}
      />
    </div>
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BackgroundLayer />
      <NavigationBar />
      <main>
        <Home />
        <Suspense fallback={null}>
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </Suspense>
      </main>      
      <Analytics />   
      <SpeedInsights /> 
    </ThemeProvider>
  )
}

export default App
