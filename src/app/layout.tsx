import type { Metadata } from 'next';
import { Sora, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { headers } from 'next/headers';
import { LenisProvider } from '@/components/lenis-provider';
import CustomCursor from '@/components/effects/CustomCursor';
import { SoundProvider, AudioUnlockerButton } from '@/components/effects/SoundProvider';
import './globals.css';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['400', '600', '700'],
  display: 'swap',
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-ibm-sans',
  weight: ['400', '500', '600'],
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
    <html
      lang={locale}
      className={`${sora.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <head>
         {/* Strategico LCP Preload per l'elemento video Hero in cima alla view */}
         <link rel="preload" as="video" href="/videos/Herobg.mp4" type="video/mp4" crossOrigin="anonymous" />
      </head>
      <body>
        <SoundProvider>
          <AudioUnlockerButton />
          <LenisProvider>
            <CustomCursor />
            {children}
          </LenisProvider>
        </SoundProvider>
      </body>
    </html>
  );
}
