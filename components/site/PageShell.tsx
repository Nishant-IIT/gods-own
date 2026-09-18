'use client';

import type { ReactNode } from 'react';
import { Footer } from './Footer';
import { SiteNav } from './SiteNav';
import { Universe } from './Universe';

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
