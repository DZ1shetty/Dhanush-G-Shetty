import { 
    React, Python, Nodejs, Firebase, MongoDB, JavaScript
} from "../ui/DevIcons"
import SkillCard from "./SkillCard"
import FadeIn from "../ui/FadeIn"
import ScrambleText from "../ui/ScrambleText"
import { FaDatabase, FaCube } from "react-icons/fa"
import { SiVite, SiUnity } from "react-icons/si"

const categories = [
    { 
        title: "Programming", 
        skills: [
            { name: "Python", Icon: Python },
            { name: "JavaScript", Icon: JavaScript },
            { name: "SQL", Icon: FaDatabase },
            { name: "MongoDB", Icon: MongoDB }
        ] 
    },
    { 
        title: "Frameworks", 
        skills: [
            { name: "React", Icon: React },
            { name: "Node.js", Icon: Nodejs },
            { name: "Vite", Icon: SiVite }
        ]  
    },
    {
        title: "Tools",
        skills: [
            { name: "Unity", Icon: SiUnity },
            { name: "Vuforia", Icon: FaCube },
            { name: "Firebase", Icon: Firebase },
            { name: "ARCore", Icon: FaCube }
        ]
    }
];

export default function Skills() {
    return (
        <section id="skills" className="scroll-mt-16 md:pt-8 md:pb-32 pt-8 pb-24 w-full border-b-4 border-foreground">
            <div className="max-w-6xl mx-auto px-6 sm:px-10">
                <FadeIn>
                    <div className="text-center mb-20"> 
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground select-none uppercase font-mono">
                            <ScrambleText text="My Tech Stack" />
                        </h2>
                        <div className="w-20 h-2 bg-foreground mx-auto mt-3" />
                        <p className="text-muted-foreground text-md sm:text-lg mt-4 font-medium">Technical tools which bring my ideas to life.</p>
                    </div>
                </FadeIn>

                {categories.map((category, index) => (
                    <div key={index} className="flex flex-col md:flex-row items-stretch gap-6 md:gap-8 mb-12 border-b-2 border-dashed border-foreground/15 pb-8 last:border-b-0 last:pb-0">
                        {/* Category Left Header Block */}
                        <div className="w-full md:w-1/4 shrink-0 flex items-center md:items-start">
                            <FadeIn delay={index * 0.1}>
                                <div className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 border-3 border-foreground shadow-[3px_3px_0px_var(--foreground)] font-mono text-sm sm:text-base font-black uppercase tracking-wider select-none">
                                    {category.title}
                                </div>
                            </FadeIn>
                        </div>

                        {/* Category Skills Grid Box */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:flex xl:flex-wrap gap-4 w-full justify-start items-center">
                            {category.skills.map((skill, idx) => (
                                <FadeIn key={idx} delay={(index * 0.1) + (idx * 0.05)} className="w-full xl:w-auto">
                                    <SkillCard {...skill} />
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
