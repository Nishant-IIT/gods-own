import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GODSOWN — Prashant Ingole',
  description:
    'GODSOWN — the creative universe of Prashant Ingole: lyricist, songwriter, composer, writer, and filmmaker.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- this rule targets the
            Pages Router's pages/_document.js; the App Router's root layout is the correct,
            App-Router-idiomatic place to load a site-wide font stylesheet. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400&family=Karla:wght@400;500&family=Nanum+Pen+Script&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
