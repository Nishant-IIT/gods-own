'use client';

import type { ReactNode } from 'react';
import { SiteNav } from './SiteNav';
import { Universe } from './Universe';

/** The canvas + nav + main shell shared by every studio-site page. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div style={{ position: 'relative', background: '#000' }}>
      <Universe />
      <SiteNav />
      <main style={{ position: 'relative', zIndex: 1 }}>{children}</main>
    </div>
  );
}
