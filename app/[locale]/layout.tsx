import Navbar from "@/components/navigation/Navbar";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import {routing} from "@/i18n/routing";
import {notFound} from "next/navigation";


type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};


export default async function RootLayout({ children, params }: Props) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }
    const messages = (await import(`../../messages/${locale}.json`)).default;
  return (
      <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex flex-col max-h-dvh h-dvh">
          <Navbar locale={locale} />
          <main className="flex-1 min-h-0 max-h-full overflow-y-auto" id="scrollableMainContentContainer">
              {children}
          </main>
      </div>
      </NextIntlClientProvider>
  );
}
