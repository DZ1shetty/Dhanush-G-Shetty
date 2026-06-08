import SpotlightCard from "../ui/SpotlightCard";

interface SkillCardProps {
    name: string;
    Icon?: React.ComponentType<{className?: string}>;
    svgPath?: string;
}

export default function SkillCard({ name, Icon, svgPath }: SkillCardProps) {
    return (
        <SpotlightCard className="flex flex-row items-center gap-3 px-4 py-2.5 w-full md:w-auto h-full cursor-pointer">
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
        </SpotlightCard>
    )
}
