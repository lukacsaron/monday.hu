import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MONDAY · BLOK — Visual House',
  description: 'MONDAY — visual production house in Budapest. Music videos, commercials, films.',
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
