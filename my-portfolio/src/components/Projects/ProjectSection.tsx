import FadeIn from "../ui/FadeIn";
import ScrambleText from "../ui/ScrambleText";
import InfiniteMenu from "../ui/InfiniteMenu";

const projects = [
    {
        "title": "FinNovate \u2013 Financial Analytics Dashboard",
        "description": "\u2022 Displays financial data using charts and dashboards for better visualization\n\u2022 Helps users analyze trends and make informed financial decisions",
        "technologies": [
            "React",
            "Vite",
            "Node.js"
        ],
        "githubLink": "https://github.com/DZ1shetty/FinNovate"
    },
    {
        "title": "AR Car Accessories Visualizer",
        "description": "\u2022 Uses Augmented Reality to place and preview car accessories (like wheels, spoilers)\n\u2022 Helps users visualize modifications before purchasing and compare different options",
        "technologies": [
            "Unity",
            "ARCore",
            "Vuforia Engine"
        ],
        "githubLink": "https://github.com/DZ1shetty/AR-Visualizer"
    },
    {
        "title": "Bus Fleet Management System",
        "description": "\u2022 Stores and manages transportation data such as bus details, routes, and schedules\n\u2022 Provides an interface to log, view, and organize fleet information efficiently",
        "technologies": [
            "Python",
            "Java",
            "MongoDB"
        ],
        "githubLink": "https://github.com/DZ1shetty/Bus-Fleet-Management"
    },
    {
        "title": "Chill-Dev",
        "description": "\u2022 TypeScript Sandbox Experiments",
        "technologies": [
            "TypeScript"
        ],
        "githubLink": "https://github.com/DZ1shetty/Chill-Dev"
    },
    {
        "title": "Dhanush-G-Shetty",
        "description": "\u2022 React Cyber Portfolio",
        "technologies": [
            "React"
        ],
        "githubLink": "https://github.com/DZ1shetty/Dhanush-G-Shetty"
    },
    {
        "title": "DSA_TRAINING_NITTE-14-days-",
        "description": "\u2022 DSA Java, C++",
        "technologies": [
            "DSA",
            "Java, C++"
        ],
        "githubLink": "https://github.com/DZ1shetty/DSA_TRAINING_NITTE-14-days-"
    },
    {
        "title": "fastapi_crud",
        "description": "\u2022 Python FastAPI",
        "technologies": [
            "Python",
            "FastAPI"
        ],
        "githubLink": "https://github.com/DZ1shetty/fastapi_crud"
    },
    {
        "title": "github_basics",
        "description": "\u2022 Git GitHub Workflows",
        "technologies": [
            "Git"
        ],
        "githubLink": "https://github.com/DZ1shetty/github_basics"
    },
    {
        "title": "GreenArchive",
        "description": "\u2022 JavaScript Environment Metrics",
        "technologies": [
            "JavaScript"
        ],
        "githubLink": "https://github.com/DZ1shetty/GreenArchive"
    },
    {
        "title": "Major_Project",
        "description": "\u2022 JavaScript Full-Stack",
        "technologies": [
            "JavaScript"
        ],
        "githubLink": "https://github.com/DZ1shetty/Major_Project"
    },
    {
        "title": "neetcode-submissions",
        "description": "\u2022 Algorithms Python",
        "technologies": [
            "Python"
        ],
        "githubLink": "https://github.com/DZ1shetty/neetcode-submissions"
    },
    {
        "title": "phishguard-ai",
        "description": "\u2022 CSS AI Phishing Detection",
        "technologies": [
            "CSS"
        ],
        "githubLink": "https://github.com/DZ1shetty/phishguard-ai"
    },
    {
        "title": "PopcornIQ",
        "description": "\u2022 React Movie Trivia",
        "technologies": [
            "React"
        ],
        "githubLink": "https://github.com/DZ1shetty/PopcornIQ"
    },
    {
        "title": "python-questions",
        "description": "\u2022 Python Practice Problems",
        "technologies": [
            "Python"
        ],
        "githubLink": "https://github.com/DZ1shetty/python-questions"
    },
    {
        "title": "react_frontend_setup",
        "description": "\u2022 React Vite",
        "technologies": [
            "React"
        ],
        "githubLink": "https://github.com/DZ1shetty/react_frontend_setup"
    },
    {
        "title": "SDLC-of-a-Real-World-System",
        "description": "\u2022 HTML SDLC Analysis",
        "technologies": [
            "HTML"
        ],
        "githubLink": "https://github.com/DZ1shetty/SDLC-of-a-Real-World-System"
    },
    {
        "title": "Simple-Face-Detection",
        "description": "\u2022 Python OpenCV, AI",
        "technologies": [
            "Python"
        ],
        "githubLink": "https://github.com/DZ1shetty/Simple-Face-Detection"
    },
    {
        "title": "Smart_Nav",
        "description": "\u2022 JavaScript CSS Dashboard",
        "technologies": [
            "JavaScript"
        ],
        "githubLink": "https://github.com/DZ1shetty/Smart_Nav"
    }
];

export default function Projects() {
    // Map projects to InfiniteMenu format
    const menuItems = projects.map((p, index) => ({
        image: `https://picsum.photos/600/600?random=${index}`,
        link: p.githubLink,
        title: p.title,
        description: p.technologies.join(", ")
    }));

    return (
        <section id="projects" className="md:py-24 py-12 w-full border-b-4 border-foreground">
             <div className="max-w-6xl mx-auto px-6 sm:px-10 mb-12">
                <FadeIn>
                    <div className="text-center">
                        <span className="font-mono inline-block px-3 py-1.5 text-xs font-black tracking-wider uppercase bg-foreground text-background border-2 border-foreground mb-4 select-none">
                            My Portfolio
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground select-none uppercase font-mono mb-4">
                            <ScrambleText text="Featured Projects" />
                        </h2>
                        <div className="w-24 h-1.5 bg-foreground mx-auto mb-4" />
                        <p className="text-md sm:text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
                            A selection of projects where I've turned complex problems into elegant solutions. Drag to explore!
                        </p>
                    </div>
                </FadeIn>
            </div>

            <div className="w-full relative" style={{ height: '700px' }}>
                <InfiniteMenu items={menuItems} scale={1.0} />
            </div>
        </section>
    );
}
