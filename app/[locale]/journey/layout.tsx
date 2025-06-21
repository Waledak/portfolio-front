import type {Metadata} from "next";

const title = "Tanguy Cirillo | Parcours"

export const metadata: Metadata = {
    title ,
};

type Props = {
    children: React.ReactNode;
};

export default function ProjectLayout({ children }: Props) {
    return (
            <div>
                {children}
            </div>
    );
}

