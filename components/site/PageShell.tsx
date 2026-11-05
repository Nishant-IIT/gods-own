'use client';

import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import { Footer } from './Footer';
import { SiteNav } from './SiteNav';

// `Universe` renders an R3F `<Canvas>` and sizes itself off `window` (via
// `detectQuality`), so it can't be server-rendered. Isolating the no-SSR
// boundary here — instead of disabling SSR for the whole page in
// `pages/loaders.tsx` — lets everything else PageShell wraps (the page's
// real content) server-render normally.
const Universe = dynamic(() => import('./Universe').then((m) => m.Universe), { ssr: false });

type Props = {
  children: ReactNode;
  /** Override the shared Footer — Contact uses its own instead. */
  footer?: ReactNode;
};

/** The canvas + nav + main + footer shell shared by every studio-site page. */
export function PageShell({ children, footer = <Footer /> }: Props) {
  return (
    <div style={{ position: 'relative', background: '#000' }}>
      <Universe />
      <SiteNav />
      <main style={{ position: 'relative', zIndex: 1 }}>{children}</main>
      {footer}
    </div>
  );
}
