import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Suspense, lazy } from 'react';

// Lazy load the ParticleBackground component
const Background = lazy(() => import("@/components/effects/ParticleBackground"));

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Tanguy Cirillo | Portfolio"
const description = "Découvrez mon travail de développeur web mais également ma passion pour la photo."

export const metadata: Metadata = {
  title ,
  description,
    icons: {
        icon: "/favicon/favicon.ico",
        apple: "/favicon/favicon.ico",
        shortcut: "/favicon/favicon.ico",
    }
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-theme="monportfolio">
        <head>
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content="https://tanguycirillo.fr" />
            <meta property="og:image" content="https://tanguycirillo.fr/" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-transparent`}
      >
      <Suspense fallback={<div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-b from-gray-50 to-gray-200"></div>}>
        <Background />
      </Suspense>
      {children}
      <SpeedInsights />
      </body>
    </html>
  );
}
