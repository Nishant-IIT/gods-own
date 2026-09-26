import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "GOD'S OWN MOTION PICTURES",
  description:
    "GOD'S OWN MOTION PICTURES — an independent entertainment studio developing stories, content and original IP for audiences in India and around the world.",
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  // suppressHydrationWarning: a remote-access/screen-share browser extension
  // stamps a token attribute onto <html> before React hydrates; the server
  // never emits it. Shallow — it covers this element's own attributes only,
  // not the tree below, so real mismatches inside the app still surface.
  return (
    <html lang="en" suppressHydrationWarning>
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
