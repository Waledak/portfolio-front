import { Contact } from "@/types/strapi.type";
import ContactLink from "@/components/ui/ContactLink";

interface ContactSectionProps {
    title: string;
    description: string;
    links: Contact[];
}

/**
 * Footer section component displaying contact information and links
 */
export default function ContactSection({ title, description, links }: ContactSectionProps) {
    return (
        <footer className="col-span-3 mt-9 gap-3 flex flex-col items-center justify-center border-primary border-2 bg-white/30 backdrop-blur-sm rounded-3xl p-6">
            <h2 className="text-2xl text-black">{title}</h2>
            <p className="text-black">{description}</p>

            <div className="flex flex-wrap mt-5 gap-3 justify-center">
                {links.map((contact) => (
                    <ContactLink key={contact.id} contact={contact} />
                ))}
            </div>
        </footer>
    );
}
