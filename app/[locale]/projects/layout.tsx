import type {Metadata} from "next";

const title = "Tanguy Cirillo | Projets"

export const metadata: Metadata = {
    title ,
};

type Props = {
    children: React.ReactNode;
};

export default async function ProjectLayout({ children }: Props) {
    return (
            <div>
                {children}
            </div>
    );
}

