import { useState } from "react";
import { CgMenu } from "react-icons/cg";
import NavButton from "./NavButton";
import { ModeToggle } from "@/components/mode-toggle";

export default function NavigationBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navItems = [
        { name: "Home", linkTo: "home" },
        { name: "About", linkTo: "about" },
        { name: "Education", linkTo: "education" },
        { name: "Skills", linkTo: "skills" },
        { name: "Experience", linkTo: "experience" },
        { name: "Projects", linkTo: "projects" },
        { name: "Contact", linkTo: "contact" },
    ];

    return (
        <nav className="fixed w-full top-0 flex px-6 md:px-16 h-16 bg-background text-foreground justify-between items-center border-b-4 border-foreground z-50 transition-colors duration-300">
            {/* Neubrutalist Logo */}
            <div className="font-mono font-black text-2xl border-3 border-foreground bg-card text-foreground px-3 py-0.5 shadow-[3px_3px_0px_0px_var(--foreground)] tracking-tighter select-none">
                DZ1
            </div>

            {/* Navigation and Mode Toggle */}
            <div className="flex items-center gap-6">
                <ul className="hidden lg:flex space-x-2 items-center">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <NavButton linkTo={item.linkTo}>{item.name}</NavButton>
                        </li>
                    ))}
                </ul>
                
                {/* Desktop Mode Toggle */}
                <div className="hidden lg:block">
                    <ModeToggle />
                </div>
            </div>

            {/* Mobile Mode Toggle and Menu Trigger */}
            <div className="flex items-center gap-3 lg:hidden">
                <ModeToggle />
                <button 
                    onClick={toggleMenu} 
                    className="hover:cursor-pointer border-2 border-foreground bg-card p-1.5 shadow-[2px_2px_0px_0px_var(--foreground)] hover:bg-foreground hover:text-background hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_var(--foreground)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all text-foreground size-9 flex items-center justify-center rounded-none"
                    aria-label="Toggle menu"
                >
                    <CgMenu size={22} />
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-[60px] left-0 w-full bg-background border-b-4 border-foreground flex flex-col items-stretch py-4 px-6 gap-2 z-10 transition-all duration-300 shadow-[0_4px_0px_0px_var(--foreground)] md:hidden">
                    {navItems.map((item) => (
                        <NavButton onClick={toggleMenu} key={item.name} linkTo={item.linkTo}>
                            {item.name}
                        </NavButton>
                    ))}
                </div>
            )}
        </nav>
    );
}
