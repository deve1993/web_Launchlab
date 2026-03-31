import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import InteractiveGridBackground from '@/components/effects/InteractiveGridBackground';
import CodeBackground from '@/components/effects/CodeBackground';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

async function loadMessages(locale: string) {
  switch (locale) {
    case 'en': return (await import('@/messages/en.json')).default;
    case 'cs': return (await import('@/messages/cs.json')).default;
    default:   return (await import('@/messages/it.json')).default;
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'it' | 'en' | 'cs')) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await loadMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div aria-hidden="true">
        <InteractiveGridBackground />
        <CodeBackground />
      </div>
      <Navbar />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}
