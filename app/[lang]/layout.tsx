import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

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
      <div>
          <Navbar lang={lang} />
          <main>
              {children}
          </main>
      </div>
  );
}
