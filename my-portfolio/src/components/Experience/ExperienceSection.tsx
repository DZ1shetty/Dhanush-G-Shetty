import ExperienceCard from "./ExperienceCard";
import FadeIn from "../ui/FadeIn";
import ScrambleText from "../ui/ScrambleText";

const experiences = [
    {
        role: "AR/VR Development Intern",
        company: "NMAM Institute of Technology & ARK Solutions",
        duration: "2 Months",
        description: "• Developed AR car accessories visualization app using Unity and C# (visual ground detection, spatial mapping, object interaction)\n• Built interactive VR gallery walkthrough simulating virtual exhibition environment",
        technologies: ["Unity", "C#", "AR/VR"],
        projectLink: "https://www.linkedin.com/company/ark-solutions",
        mediaGroups: [
            {
                title: "AR Part",
                items: [
                    { type: "image" as const, url: "/img1.jpeg", caption: "AR Visualizer 1" },
                    { type: "image" as const, url: "/img2.jpeg", caption: "AR Visualizer 2" },
                    { type: "image" as const, url: "/img3.jpeg", caption: "AR Visualizer 3" },
                    { type: "image" as const, url: "/img4.jpeg", caption: "AR Visualizer 4" }
                ]
            },
            {
                title: "VR Part",
                items: [
                    { type: "video" as const, url: "/Vid1.mp4", caption: "VR Exhibition Walkthrough" }
                ]
            }
        ]
    }
];

export default function Experience() {
    return (
        <section id="experience" className="md:py-24 py-12 w-full border-b-4 border-foreground">
            <div className="max-w-6xl mx-auto px-6 sm:px-10">
                <FadeIn>
                    <div className="text-center mb-20">
                        <span className="font-mono inline-block px-3 py-1.5 text-xs font-black tracking-wider uppercase bg-foreground text-background border-2 border-foreground mb-4 select-none">
                            My Path
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground select-none uppercase font-mono">
                            <ScrambleText text="Experience" />
                        </h2>
                        <div className="w-16 h-2 bg-foreground mx-auto mt-3 mb-4" />
                        <p className="text-md sm:text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
                            My professional journey and the technical milestones I've achieved along the way.
                        </p>
                    </div>
                </FadeIn>
                
                {/* Timeline Layout with Single Left Vertical Robust Line */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Continuous Vertical Timeline Track */}
                    <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-1 bg-foreground" />

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <FadeIn key={index} delay={index * 0.2}>
                                <div className="relative flex items-start">
                                    {/* Robust Solid Timeline Circle Marker */}
                                    <div className="absolute left-4 sm:left-6 w-6 h-6 rounded-full bg-background border-4 border-foreground transform -translate-x-1/2 top-8 z-10 shadow-[2px_2px_0px_var(--foreground)]" />
                                    
                                    {/* Experience Card Wrapper */}
                                    <div className="w-full ml-10 sm:ml-14">
                                        <ExperienceCard 
                                            {...exp}
                                        />
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
