import EducationCard from "../About/EducationCard";
import FadeIn from "../ui/FadeIn";
import ScrambleText from "../ui/ScrambleText";
import BlurText from "../ui/BlurText";

const educationJourney = [
    {
        year: "2020 — 2021",
        title: "Primary & High School",
        institution: {
            name: "Gurukula Public School",
            link: "https://gurukulapublicschool.com/",
            tooltipDescription: "Completed primary and high school education."
        },
        degree: "High School (93.60%)",
        description: "Built a strong foundation in academics and extracurriculars."
    },
    {
        year: "2021 — 2023",
        title: "Pre-University",
        institution: {
            name: "Excellent PU College",
            link: "https://excellentnitte.com/",
            tooltipDescription: "Completed Pre-University education in core sciences."
        },
        degree: "Pre-University (91.83%)",
        description: "Focused on core sciences and mathematics, paving the way for an engineering degree."
    },
    {
        year: "2023 — 2027",
        title: "Information Science",
        institution: {
            name: "NMAM Institute of Technology",
            link: "https://nmamit.nitte.edu.in/",
            tooltipDescription: "I am currently in 4th year of engineering"
        },
        degree: "Bachelor of Engineering in Information Science",
        achievements: {
            honors: [
                {
                    name: "CGPA 8.39",
                    years: "Current",
                    tooltipDescription: "Maintaining a strong academic record."
                }
            ]
        },
        description: "Building a strong foundation in software engineering, algorithms, and full-stack development."
    }
];

const quickStats = [
    { value: "8.39", label: "CGPA", accent: "text-foreground" },
    { value: "18+", label: "Projects Built", accent: "text-foreground" },
];

export default function About() {
  return (
    <section id="about" className="md:py-24 py-12 w-full border-b-4 border-foreground">
      {/* About Me Section */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground select-none uppercase font-mono">
              <ScrambleText text="About Me" />
            </h2>
            <div className="w-16 h-2 bg-foreground mx-auto mt-3" />
          </div>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <FadeIn direction="right" delay={0.2}>
            <div className="flex flex-col gap-6 text-left text-foreground bg-card border-4 border-foreground p-6 sm:p-10 shadow-[8px_8px_0px_0px_var(--foreground)]">
              <div>
                <BlurText 
                  text="Hey! I'm a full-stack dev and AR/VR geek who loves tinkering with React, Python, and Node.js. I'm basically here to turn cool ideas into slick web apps."
                  className="text-lg leading-relaxed mb-6 font-medium"
                  highlightWords={["React,", "Python,", "Node.js."]}
                  highlightClass="underline underline-offset-4 decoration-2 decoration-foreground font-bold"
                />
                <BlurText 
                  text="Currently surviving engineering school at NMAMIT. I spend most of my time learning new tech, building random projects, and just having fun coding."
                  className="text-lg leading-relaxed mb-8 font-medium"
                  delay={0.4}
                />
              </div>

              {/* Quick Stats - Updated with Neubrutalist boxes */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-6 border-t-4 border-foreground">
                {quickStats.map((stat, i) => (
                  <div key={i} className="text-center bg-background border-2 border-foreground p-3 shadow-[3px_3px_0px_0px_var(--foreground)]">
                    <div className={`text-xl sm:text-2xl font-black ${stat.accent}`}>
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-xs font-mono font-black uppercase tracking-tight text-muted-foreground mt-1.5 leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
          
          <FadeIn direction="left" delay={0.4}>
            <div className="flex justify-center">
              {/* Picture Frame Wrapper */}
              <div className="relative w-80 h-96 bg-card border-4 border-foreground shadow-[10px_10px_0px_0px_var(--foreground)] p-3 select-none">
                <div className="relative w-full h-full border-2 border-foreground overflow-hidden">
                  <img 
                    src="/profile.jpeg" 
                    alt="Profile" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                  />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-foreground text-background font-mono font-black text-xs sm:text-sm px-3 py-1 border-2 border-background shadow-[2px_2px_0px_0px_var(--background)] whitespace-nowrap z-10 pointer-events-none tracking-wider">
                    DHANUSH_G_SHETTY.EXE
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Education Journey Section */}
      <div id="education" className="max-w-4xl mx-auto mt-28 px-6 sm:px-10 scroll-mt-24">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="font-mono inline-block px-3 py-1.5 text-xs font-black tracking-wider uppercase bg-foreground text-background border-2 border-foreground mb-4 select-none">
              My Journey
            </span>
            <h2 className="text-4xl font-black text-foreground mb-4 uppercase">
              <ScrambleText text="Education & Growth" />
            </h2>
            <div className="w-24 h-1.5 bg-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-md sm:text-lg max-w-2xl mx-auto font-medium">
              A continuous journey of learning, building, and exploring new technologies.
            </p>
          </div>
        </FadeIn>
        
        {/* Timeline (Refactored to be thick, solid, and left-aligned for maximum card width) */}
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-1 bg-foreground" />
          
          <div className="space-y-10 md:space-y-14">
            {educationJourney.map((edu, index) => (
              <FadeIn 
                key={index} 
                delay={index * 0.2}
                direction="right"
              >
                <div className="relative flex items-start">
                  {/* Robust Black Circle Marker */}
                  <div className="absolute left-4 sm:left-6 w-6 h-6 rounded-full bg-background border-4 border-foreground transform -translate-x-1/2 mt-8 z-10 shadow-[2px_2px_0px_var(--foreground)]" />
                  
                  <div className="w-full ml-10 sm:ml-14">
                    <EducationCard {...edu} />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
