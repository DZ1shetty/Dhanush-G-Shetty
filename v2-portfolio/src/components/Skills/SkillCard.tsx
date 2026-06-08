interface SkillCardProps {
    name: string;
    Icon?: React.ComponentType<{className?: string}>;
    svgPath?: string;
}

export default function SkillCard({ name, Icon, svgPath }: SkillCardProps) {
    return (
        <div className="group relative select-none w-full md:w-auto">
            {/* Neubrutalist Skill Block */}
            <div className="flex flex-row items-center gap-3 px-4 py-2.5 bg-card text-foreground border-3 border-foreground rounded-none shadow-[3px_3px_0px_var(--foreground)] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[5px_5px_0px_var(--foreground)] active:translate-x-0 active:translate-y-0 active:shadow-[3px_3px_0px_var(--foreground)] transition-all duration-200">
                {Icon ? (
                    <Icon className="size-5 md:size-6 shrink-0 text-foreground transition-transform duration-300 group-hover:rotate-6" />
                ) : svgPath ? (
                    <img 
                        src={svgPath} 
                        alt={name} 
                        className="size-5 md:size-6 shrink-0 object-contain transition-transform duration-300 group-hover:rotate-6 dark:invert-0" 
                    />
                ) : null}
                <span className="font-mono text-sm font-bold tracking-tight text-foreground truncate">{name}</span>
            </div>
        </div>
    )
}
