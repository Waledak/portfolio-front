import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ParticleBackground from "@/components/particle-background";
import Navbar from "@/components/Navbar";

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
};

type Props = {
    children: React.ReactNode;
    params: { lang: string };
};


export default async function RootLayout({ children, params }: Props) {
    const { lang } = await params;
  return (
    <html lang={lang} data-theme="monportfolio">
        <head>
            <meta property="og:title" content="Nouveau Nom du Site" />
            <meta property="og:description" content="Une description optimisée pour le partage sur réseaux sociaux." />
            <meta property="og:url" content="https://tanguycirillo.fr" />
            <meta property="og:image" content="https://tanguycirillo.fr/" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-transparent`}
      >
      <Navbar lang={lang} />
      <ParticleBackground />
      <main>{children}</main>
      </body>
    </html>
  );
}
