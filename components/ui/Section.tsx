'use client'

import { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

/**
 * A reusable section component with consistent styling
 * Used for main content sections throughout the site
 */
export default function Section({ title, children, className = '' }: SectionProps) {
  return (
    <section className={`col-span-3 mt-9 bg-white/30 backdrop-blur-sm rounded-3xl p-6 ${className}`}>
      <h2 className="bg-neutral-200/30 w-fit p-4 backdrop-blur-sm rounded-3xl text-3xl text-black">
        {title}
      </h2>
      <div className="mt-3">
        {children}
      </div>
    </section>
  );
}