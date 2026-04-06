import type { Metadata } from 'next';
import { Inter, IBM_Plex_Mono } from 'next/font/google';
import { headers } from 'next/headers';
import { LenisProvider } from '@/components/lenis-provider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-mono',
  weight: ['400'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'LaunchLab — Da idea a MVP in 6 settimane',
    template: '%s | LaunchLab',
  },
  description:
    'Studio di consulenza che trasforma la tua idea in un MVP funzionante in 6 settimane. Workshop, design e sviluppo con AI.',
  metadataBase: new URL('https://launchlab.com'),
  openGraph: {
    type: 'website',
    siteName: 'LaunchLab',
    images: [{ url: '/images/loghi/logo-dark.png', width: 1200, height: 630 }],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const locale = headersList.get('x-next-intl-locale') ?? 'it';

  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} ${ibmPlexMono.variable} min-h-screen overflow-x-hidden scroll-auto bg-gray-50 antialiased selection:bg-orange-100 selection:text-orange-600`}
        style={{ fontFamily: 'var(--font-body)' }}
      >
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
