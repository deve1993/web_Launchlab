import type { Metadata } from 'next';
import { Inter, IBM_Plex_Mono } from 'next/font/google';
import { headers } from 'next/headers';
import { LenisProvider } from '@/components/lenis-provider';
import './globals.css';
import Script from "next/script";

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
    default: 'DVEsolutions — Da idea a MVP in 6 settimane',
    template: '%s | DVEsolutions',
  },
  description:
    'Studio di consulenza che trasforma la tua idea in un MVP funzionante in 6 settimane. Workshop, design e sviluppo con AI.',
  metadataBase: new URL('https://dvesolutions.eu'),
  openGraph: {
    type: 'website',
    siteName: 'DVEsolutions',
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
        {/* Navbar portal target — outside Lenis wrapper so position:fixed works */}
        <div id="navbar-portal" className="fixed inset-x-0 top-0 z-50" />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
      <Script id="agent-lead" strategy="afterInteractive">{`
        window.AgentLeadSettings = { skill_id: 'dvesolutions' };
        var s = document.createElement('script');
        s.src = 'https://agentlead.fl1.it/agent.js';
        s.async = true;
        document.body.appendChild(s);
      `}</Script>
    </html>
  );
}
