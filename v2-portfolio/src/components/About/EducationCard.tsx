"use client"
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip"

interface InstitutionInfo {
    name: string
    link: string
    tooltipDescription: string
}

interface HonorInfo {
    name: string
    years: string
    tooltipDescription: string
}

interface AchievementsInfo {
    gpa?: string
    honors?: HonorInfo[]
}

interface EducationCardProps {
    year: string
    title: string
    institution?: InstitutionInfo
    degree?: string
    achievements?: AchievementsInfo
    description: string
    isHighlight?: boolean
}

export default function EducationCard({ year, title, institution, degree, achievements, description, isHighlight }: EducationCardProps) {
    return (
        <div className="relative group w-full">
            {/* Neubrutalist Card Container */}
            <div className={`
                relative p-6 md:p-8 rounded-none bg-card text-foreground
                border-4 border-foreground
                shadow-[6px_6px_0px_0px_var(--foreground)]
                group-hover:-translate-x-1 group-hover:-translate-y-1
                group-hover:shadow-[10px_10px_0px_0px_var(--foreground)]
                active:translate-x-0 active:translate-y-0 active:shadow-[6px_6px_0px_0px_var(--foreground)]
                transition-all duration-300 ease-out
                ${isHighlight ? 'ring-4 ring-offset-2 ring-foreground/20' : ''}
            `}>
                
                <div className="relative z-10 flex flex-col gap-3 pr-2 sm:pr-32">
                    {/* Year + Current Badge (Positioned at Top-Right Corner) */}
                    <div className="sm:absolute sm:top-0 sm:right-0 flex items-center gap-2 mb-2 sm:mb-0 sm:translate-y-[-2px]">
                        <span className="font-mono text-xs font-black tracking-widest uppercase bg-foreground/10 px-2 py-1 border-2 border-foreground select-none">
                            {year}
                        </span>
                        {isHighlight && (
                            <span className="font-mono text-[10px] font-black tracking-wider uppercase bg-foreground text-background px-2.5 py-1 border-2 border-foreground select-none">
                                ACTIVE_SYS
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-black tracking-tight leading-snug whitespace-nowrap overflow-hidden text-ellipsis sm:overflow-visible">
                        {title}
                    </h3>
                    
                    {/* Institution + Degree */}
                    {institution ? (
                        <div className="flex flex-col gap-1">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span 
                                        className="self-start text-foreground underline underline-offset-4 decoration-2 decoration-foreground font-black px-1 cursor-default"
                                    >
                                        {institution.name}
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent 
                                    side="top" 
                                    className="max-w-xs p-4 bg-card border-3 border-foreground text-foreground rounded-none shadow-[4px_4px_0px_0px_var(--foreground)]"
                                >
                                    <p className="text-sm font-semibold leading-relaxed">
                                        {institution.tooltipDescription}
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                            {degree && (
                                <p className="text-sm font-semibold text-muted-foreground mt-1">{degree}</p>
                            )}
                        </div>
                    ) : (
                        degree && (
                            <p className="text-sm font-semibold text-muted-foreground italic">{degree}</p>
                        )
                    )}

                    {/* Achievements - Redesigned into flat monochromatic tokens */}
                    {achievements && (
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                            {/* Honors Chips */}
                            {achievements.honors?.map((honor, index) => (
                                <Tooltip key={index}>
                                    <TooltipTrigger asChild>
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-background border-2 border-foreground hover:bg-foreground hover:text-background transition-colors font-mono text-xs font-black cursor-help whitespace-nowrap">
                                            {honor.name}
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent 
                                        side="top" 
                                        className="max-w-xs p-4 bg-card border-3 border-foreground text-foreground rounded-none shadow-[4px_4px_0px_0px_var(--foreground)]"
                                    >
                                        <p className="text-xs font-bold text-muted-foreground mb-1">
                                            {honor.years}
                                        </p>
                                        <p className="text-sm leading-relaxed font-semibold">
                                            {honor.tooltipDescription}
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </div>
                    )}

                    {/* Short Description */}
                    <div className="w-full h-1 bg-foreground/10 my-1" />
                    <p className="text-md text-foreground/80 leading-relaxed font-medium">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )
}
