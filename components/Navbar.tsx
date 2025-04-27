'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from "@/components/LanguageSwitcher";
import * as LucideIcons from "lucide-react";

type NavbarProps = {
    locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
    const pathname = usePathname();

    // Icons from Lucide Icons
    const HomeIcon = LucideIcons.HomeIcon;
    const GalleryIcon = LucideIcons.BookImageIcon;
    const ProjectIcon = LucideIcons.LayersIcon;

    // Helper function to determine if a link is active
    const isActive = (href: string) => {
        // You might tweak the condition if you need exact matching or if you have nested routes.
        return pathname === href;
    };

    // Define the links
    const links = [
        { href: `/${locale}`, icon: <HomeIcon className="w-6 h-6 " /> },
        { href: `/${locale}/projects`, icon: <ProjectIcon className="w-6 h-6 " /> },
        { href: `/${locale}/gallery`, icon: <GalleryIcon className="w-6 h-6 " /> },
    ];

    return (
        <nav className="navbar bg-base-100 shadow-sm p-4">
            <div className="flex justify-center gap-3 flex-wrap flex-1">
                {links.map(({ href, icon }, index) => {
                    // If active, add an extra background class
                    const activeClass = isActive(href) ? 'border-2 border-primary' : '';
                    return (
                        <Link prefetch={true} key={index} href={href} className={`p-2 ${activeClass}  rounded-xl hover:bg-primary/30`}>
                            <span className="text-primary">{icon}</span>
                        </Link>
                    );
                })}
            </div>
            <div className="flex-none">
                <LanguageSwitcher />
            </div>
        </nav>
    );
}
