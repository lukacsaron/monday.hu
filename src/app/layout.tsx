import type { Metadata, Viewport } from 'next';
import { Archivo, Space_Mono } from 'next/font/google';
import './globals.css';

const SITE_URL = 'https://monday.hu';
const TITLE = 'MONDAY — Visual Production House · Budapest';
const DESCRIPTION =
  'MONDAY is a five-person film crew in Budapest. Music videos, commercials and service-crew productions — from full-scale shoots to fast-moving travel sets.';

// Self-hosted fonts via next/font — kills FOUC and the round-trip to fonts.googleapis,
// and lets Next inline `font-display: optional` so layout shift is eliminated.
const archivo = Archivo({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600', '800', '900'],
  variable: '--font-archivo',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s · MONDAY',
  },
  description: DESCRIPTION,
  applicationName: 'MONDAY',
  keywords: [
    'MONDAY',
    'film crew',
    'music video',
    'commercial',
    'Budapest',
    'Hungary',
    'production house',
    'service crew',
    'DOP',
    'director',
  ],
  authors: [{ name: 'MONDAY' }],
  creator: 'MONDAY',
  publisher: 'MONDAY',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'MONDAY',
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  category: 'Film & Video Production',
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MONDAY',
  alternateName: 'MONDAY Visual Production House',
  url: SITE_URL,
  logo: `${SITE_URL}/brand/monday-mark.png`,
  image: `${SITE_URL}/opengraph-image.jpg`,
  description: DESCRIPTION,
  email: 'hello@monday.hu',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Budapest',
    addressCountry: 'HU',
  },
  sameAs: [
    'https://www.instagram.com/monnndayyy/',
    'https://www.youtube.com/@mondayforcollective',
  ],
  knowsAbout: ['Music Videos', 'Commercials', 'Service Crew', 'Film Production'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${spaceMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
