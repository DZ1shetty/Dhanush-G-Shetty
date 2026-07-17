import ProjectCard from "./ProjectCard";
import FadeIn from "../ui/FadeIn";
import ScrambleText from "../ui/ScrambleText";

const projects = [
    {
        "title": "FinNovate – Financial Analytics Dashboard",
        "description": "• Interactive financial dashboard providing data visualization and real-time trend analytics.\n• Developed with React, Vite, Tailwind CSS, and Chart.js to help users make data-driven decisions.",
        "technologies": [
            "React",
            "Vite",
            "Chart.js",
            "Tailwind CSS"
        ],
        "githubLink": "https://github.com/DZ1shetty/FinNovate"
    },
    {
        "title": "AR Car Accessories Visualizer",
        "description": "• Immersive Augmented Reality mobile application to preview and place car modifications like wheels and spoilers.\n• Built using Unity, C#, ARCore, and Vuforia Engine for real-time spatial mapping and ground plane detection.",
        "technologies": [
            "Unity",
            "C#",
            "ARCore",
            "Vuforia"
        ],
        "githubLink": "https://github.com/DZ1shetty/Unity-CAR_AR"
    },
    {
        "title": "Bus Fleet Management System",
        "description": "• Robust database-driven management application to organize and log bus fleets, routes, and transit schedules.\n• Developed backend schemas using Java, Python, and MongoDB to query and structure fleet data efficiently.",
        "technologies": [
            "Java",
            "Python",
            "MongoDB"
        ],
        "githubLink": "https://github.com/DZ1shetty/BUS_FMS"
    },
    {
        "title": "PhishGuard AI",
        "description": "• Intelligent web security model utilizing AI algorithms to detect, flag, and prevent phishing threats.\n• Implemented front-end dashboard with real-time risk indicator metrics and defensive heuristics.",
        "technologies": [
            "Python",
            "AI/ML",
            "HTML/CSS"
        ],
        "githubLink": "https://github.com/DZ1shetty/phishguard-ai"
    },
    {
        "title": "PopcornIQ",
        "description": "• Dynamic movie trivia and quiz platform featuring interactive scoring and real-time feedback.\n• Built utilizing React, Framer Motion, and Tailwind CSS for fluid transitions and game states.",
        "technologies": [
            "React",
            "Vite",
            "Framer Motion"
        ],
        "githubLink": "https://github.com/DZ1shetty/PopcornIQ"
    },
    {
        "title": "Simple Face Detection",
        "description": "• Real-time face tracking and detection application utilizing computer vision models.\n• Developed using Python, OpenCV, and Haar Cascade classifiers for camera stream input parsing.",
        "technologies": [
            "Python",
            "OpenCV",
            "AI/ML"
        ],
        "githubLink": "https://github.com/DZ1shetty/Simple-Face-Detection"
    },
    {
        "title": "Smart Nav",
        "description": "• Sleek navigation hub and dashboard interface for unified link routing and analytics.",
        "technologies": [
            "JavaScript",
            "CSS",
            "HTML"
        ],
        "githubLink": "https://github.com/DZ1shetty/Smart_Nav"
    },
    {
        "title": "GreenArchive",
        "description": "• Environmental metrics tracking repository archiving sustainability metrics and reports.",
        "technologies": [
            "JavaScript",
            "HTML",
            "CSS"
        ],
        "githubLink": "https://github.com/DZ1shetty/GreenArchive"
    },
    {
        "title": "Major Project",
        "description": "• Full-stack academic project integrating modular APIs and data management services.",
        "technologies": [
            "JavaScript",
            "Node.js",
            "Express"
        ],
        "githubLink": "https://github.com/DZ1shetty/Major_Project"
    },
    {
        "title": "Chill-Dev",
        "description": "• Experimental development sandbox for exploring advanced TypeScript features and design patterns.",
        "technologies": [
            "TypeScript"
        ],
        "githubLink": "https://github.com/DZ1shetty/Chill-Dev"
    },
    {
        "title": "Dhanush G Shetty Portfolio",
        "description": "• Source code of this V2 Cyber-Neubrutalist developer portfolio built with React and Vite.",
        "technologies": [
            "React",
            "Vite",
            "Tailwind CSS"
        ],
        "githubLink": "https://github.com/DZ1shetty/Dhanush-G-Shetty"
    },
    {
        "title": "DSA Training",
        "description": "• Daily logs and algorithm implementations from 14-day intensive data structures and algorithms boot camp.",
        "technologies": [
            "Java",
            "C++",
            "DSA"
        ],
        "githubLink": "https://github.com/DZ1shetty/DSA_TRAINING_NITTE-14-days-"
    },
    {
        "title": "FastAPI CRUD",
        "description": "• Light-weight RESTful API using Python FastAPI with asynchronous database operations.",
        "technologies": [
            "Python",
            "FastAPI"
        ],
        "githubLink": "https://github.com/DZ1shetty/fastapi_crud"
    },
    {
        "title": "GitHub Basics",
        "description": "• Reference guide and tutorial sandbox demonstrating branching, rebasing, and GitHub actions.",
        "technologies": [
            "Git",
            "Markdown"
        ],
        "githubLink": "https://github.com/DZ1shetty/github_basics"
    },
    {
        "title": "NeetCode Submissions",
        "description": "• Optimized solution submissions for data structures and algorithm challenges from NeetCode.",
        "technologies": [
            "Python",
            "DSA"
        ],
        "githubLink": "https://github.com/DZ1shetty/neetcode-submissions"
    },
    {
        "title": "Python Questions",
        "description": "• Structured catalog of practice questions and solutions for core Python programming concepts.",
        "technologies": [
            "Python"
        ],
        "githubLink": "https://github.com/DZ1shetty/python-questions"
    },
    {
        "title": "SDLC of a Real-World System",
        "description": "• Systems analysis and software development life cycle (SDLC) study of Atrium Health's Hospital at Home program.",
        "technologies": [
            "HTML",
            "Documentation"
        ],
        "githubLink": "https://github.com/DZ1shetty/SDLC-of-a-Real-World-System"
    },
    {
        "title": "Restaurant Landing Page",
        "description": "• A responsive restaurant landing page featuring modern web design and styling.",
        "technologies": [
            "HTML",
            "CSS",
            "Vite"
        ],
        "githubLink": "https://github.com/DZ1shetty/restaurant-"
    }
];

export default function Projects() {
    return (
        <section id="projects" className="md:py-24 py-12 w-full border-b-4 border-foreground">
             <div className="max-w-6xl mx-auto px-6 sm:px-10">
                <FadeIn>
                    <div className="text-center mb-20">
                        <span className="font-mono inline-block px-3 py-1.5 text-xs font-black tracking-wider uppercase bg-foreground text-background border-2 border-foreground mb-4 select-none">
                            My Portfolio
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground select-none uppercase font-mono mb-4">
                            <ScrambleText text="Featured Projects" />
                        </h2>
                        <div className="w-24 h-1.5 bg-foreground mx-auto mb-4" />
                        <p className="text-md sm:text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
                            A selection of projects where I've turned complex problems into elegant solutions.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {projects.map((project, index) => (
                        <FadeIn key={index} delay={(index % 3) * 0.15}>
                            <ProjectCard 
                                {...project}
                            />
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
