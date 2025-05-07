import React, {useState, useRef, RefObject} from 'react';
import Link from 'next/link';
import { useClickOutside } from '@/hooks/useClickOutside';
import { StrapiMedia } from '@/types/strapi.type';
import {ChevronUp} from "lucide-react";

type FileItem = {
  name: string;
  file: StrapiMedia;
};

type DropdownMenuProps = {
  items: FileItem[];
  buttonAriaLabel?: string;
  label: string;
  url: string;
};

/**
 * Dropdown menu component for displaying a list of links
 */
export default function DropdownMenu({
                                       items,
                                       buttonAriaLabel = "Toggle dropdown",
                                       label,
                                       url
                                     }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useClickOutside<HTMLDivElement>(dropdownRef as RefObject<HTMLDivElement>, () => setIsOpen(false));

  if (items.length === 0) {
    return (
        <Link
            href={url}
            target="_blank"
            className="px-5 py-2 rounded-full bg-primary text-white font-medium text-center hover:bg-secondary transition"
        >
          {label}
        </Link>
    );
  }

  return (
      <div className="relative inline-flex" ref={dropdownRef}>
        <div className="flex rounded-full bg-primary text-white overflow-hidden">
          <Link
              href={url}
              target="_blank"
              className="px-5 py-2 hover:bg-secondary transition font-medium text-center"
          >
            {label}
          </Link>
          <button
              onClick={() => setIsOpen(!isOpen)}
              className="pr-3 pl-3 border-l-1 border-secondary hover:bg-secondary transition cursor-pointer flex items-center justify-center"
              aria-label={buttonAriaLabel}
              aria-expanded={isOpen}
          >
            <ChevronUp className={`transition-transform h-5 w-5 ${isOpen ? 'rotate-180' : ''}`}  />
          </button>
        </div>

        {isOpen && (
            <div
                className="absolute left-0 sm:left-auto sm:right-0 top-full mt-1 w-48 rounded-2xl shadow-lg bg-primary z-50 origin-top-right animate-[dropdownFade_0.2s_ease-out]"
            >
              <div role="menu" aria-orientation="vertical" className="max-h-[300px] overflow-y-auto">
                {items.map((item, index) => (
                    <Link
                        key={index}
                        href={item.file.url}
                        target="_blank"
                        className="block px-4 py-2 text-sm rounded-2xl text-primary-content hover:bg-secondary hover:text-primary-content"
                        role="menuitem"
                        onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                ))}
              </div>
            </div>
        )}
      </div>
  );
}