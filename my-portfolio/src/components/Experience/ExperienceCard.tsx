interface MediaItem {
    type: "image" | "video";
    url: string;
    caption?: string;
}

interface MediaGroup {
    title: string;
    items: MediaItem[];
}

interface ExperienceProps {
    role: string;
    company: string;
    companyLink?: string;
    duration: string;
    description: string;
    technologies: string[];
    mediaGroups?: MediaGroup[];
}

export default function ExperienceCard({ role, company, companyLink, duration, description, technologies, mediaGroups }: ExperienceProps) {
    return (
        <div className="group relative w-full">
            {/* Neubrutalist Experience Box */}
            <div className="relative bg-card text-foreground p-6 sm:p-8 rounded-none border-4 border-foreground shadow-[6px_6px_0px_0px_var(--foreground)] group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[10px_10px_0px_0px_var(--foreground)] active:translate-x-0 active:translate-y-0 active:shadow-[6px_6px_0px_0px_var(--foreground)] transition-all duration-300 ease-out">
                
                {/* Header Metadata */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                        <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
                            {role}
                        </h3>
                    </div>
                    <span className="font-mono text-xs font-black tracking-widest uppercase bg-foreground/10 px-2 py-1 border-2 border-foreground select-none self-start sm:self-center">
                        {duration}
                    </span>
                </div>

                {/* Company Label */}
                <div className="font-mono text-sm sm:text-base font-black uppercase text-foreground/80 mb-4 select-none">
                    {companyLink ? (
                        <a href={companyLink} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-2 hover:bg-foreground hover:text-background px-1 transition-all">
                            {company}
                        </a>
                    ) : (
                        company
                    )}
                </div>

                <div className="w-full h-1 bg-foreground/10 my-3" />

                {/* Description Paragraph */}
                <p className="text-foreground/80 leading-relaxed font-medium text-md whitespace-pre-wrap">
                    {description}
                </p>

                {/* Media Groups */}
                {mediaGroups && mediaGroups.length > 0 && (
                    <div className="mt-8 space-y-8">
                        {mediaGroups.map((group, groupIdx) => (
                            <div key={groupIdx}>
                                <h4 className="font-mono text-sm sm:text-base font-black uppercase text-foreground mb-4 border-l-4 border-foreground pl-3">
                                    {group.title}
                                </h4>
                                <div className={`grid grid-cols-1 gap-4 ${
                                    group.items.length === 1 ? '' : 
                                    group.items.length === 2 ? 'sm:grid-cols-2' : 
                                    group.items.length === 3 ? 'sm:grid-cols-3' : 
                                    'sm:grid-cols-2 lg:grid-cols-4'
                                }`}>
                                    {group.items.map((item, index) => (
                                        <div key={index} className="bg-card border-4 border-foreground shadow-[4px_4px_0px_0px_var(--foreground)] p-2 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_var(--foreground)] transition-all">
                                            {item.type === 'video' ? (
                                                <video 
                                                    src={item.url} 
                                                    controls 
                                                    muted 
                                                    preload="none"
                                                    className="w-full aspect-video object-cover border-2 border-foreground bg-black"
                                                />
                                            ) : (
                                                <img 
                                                    src={item.url} 
                                                    alt={item.caption || "Experience media"} 
                                                    loading="lazy"
                                                    className="w-full aspect-video object-cover border-2 border-foreground"
                                                />
                                            )}
                                            {item.caption && (
                                                <div className="mt-2 text-[10px] sm:text-xs font-mono font-black uppercase text-center tracking-tight pt-1">
                                                    {item.caption}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Horizontal blueprint line separator */}
                <div className="w-full h-0.5 border-b-2 border-dashed border-foreground/15 my-5" />

                {/* Technologies Grid */}
                <div className="flex flex-wrap gap-2">
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
        </div>
    );
}
