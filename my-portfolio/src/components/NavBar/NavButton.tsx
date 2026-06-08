import type { ReactNode } from "react"
import { Link } from "react-scroll";

interface NavButtonProps {
    children: ReactNode
    linkTo: string
    onClick?: () => void
}

export default function NavButton({children, linkTo, onClick}: NavButtonProps) {
    return (
        <Link 
            to={linkTo} 
            smooth={true} 
            duration={600} 
            spy={true} 
            offset={-64} 
            className="font-mono text-xs uppercase tracking-wider font-extrabold px-3 py-1.5 border-2 border-transparent hover:border-foreground hover:bg-foreground/5 transition-all duration-150 select-none cursor-pointer rounded-none block text-center" 
            activeClass="!bg-foreground !text-background !border-foreground !shadow-[2px_2px_0px_0px_var(--foreground)]" 
            onClick={onClick}
        >
            {children}
        </Link>
    )
}
