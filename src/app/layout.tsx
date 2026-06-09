import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE_URL = 'https://monday.hu';
const TITLE = 'MONDAY — Visual Production House · Budapest';
const DESCRIPTION =
  'MONDAY is a five-person film crew in Budapest. Music videos, commercials and service-crew productions — from full-scale shoots to fast-moving travel sets.';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,600;0,800;0,900;1,800&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
