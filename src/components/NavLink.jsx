'use client'
import { usePathname } from 'next/navigation'
import Link from "next/link";

const NavLink = ({ href, children, className = "" }) => {
    const pathname = usePathname();
    const isActive = href === pathname;
    
    return (
        <Link 
            href={href} 
            className={`${
                isActive 
                ? "text-arenaOrange border-b-2 border-arenaOrange pb-1 font-bold" 
                : "text-white/80 hover:text-arenaOrange"
            } transition-all duration-200 ${className}`}
        >
            {children}
        </Link>
    );
};

export default NavLink;