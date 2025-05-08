'use client'

import * as LucideIcons from 'lucide-react'
import React from 'react';
import { Contact } from "@/types/strapi.type";

interface ContactLinkProps {
  contact: Contact;
}

/**
 * A component that renders a contact link with an icon
 */
export default function ContactLink({ contact }: ContactLinkProps) {
  // Force conversion to React.FC with SVG props
  const Icon = (LucideIcons[contact.logo as keyof typeof LucideIcons] as React.FC<React.SVGProps<SVGSVGElement>>) ?? LucideIcons.Link;
  
  return (
    <a
      href={contact.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center px-2 py-1 gap-2 border-primary border-[1px] rounded-full hover:text-primary transition"
    >
      <Icon className="w-5 h-5 text-black" />
      <span className="capitalize text-black">{contact.name}</span>
    </a>
  );
}