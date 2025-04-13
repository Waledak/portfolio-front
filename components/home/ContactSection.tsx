'use client'

import * as LucideIcons from 'lucide-react'
import { Contact } from "@/types/strapi.type";
import React from 'react';

type ContactLinksProps = {
    title: string
    description: string
    links: Contact[]
}

export default function ContactSection({ title, description, links }: ContactLinksProps) {
    return (
        <footer className="col-span-3 mt-9 gap-3 flex flex-col items-center justify-center border-primary border-2 bg-white/30 backdrop-blur-sm rounded-3xl p-6">
            <h2 className="text-2xl">{title}</h2>
            <p>{description}</p>

            <div className="flex flex-wrap mt-5 gap-3">
                {links.map((link) => {
                    // On force la conversion en React.FC avec les props SVG
                    const Icon = (LucideIcons[link.logo as keyof typeof LucideIcons] as React.FC<React.SVGProps<SVGSVGElement>>) ?? LucideIcons.Link;
                    return (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-2 py-1 gap-2 border-primary border-[1px] rounded-full hover:text-primary transition"
                        >
                            <Icon className="w-5 h-5 text-black" />
                            <span className="capitalize text-black">{link.name}</span>
                        </a>
                    )
                })}
            </div>
        </footer>
    );
}
