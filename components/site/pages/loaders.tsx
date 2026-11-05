'use client';

// `dynamic(..., { ssr: false })` may only be called from a Client Component,
// so every loader that needs it lives here, one per route, and each server
// `page.tsx` just renders its loader.
//
// Most pages below no longer disable SSR: `Universe` (the R3F starfield
// background every page gets via `PageShell`) now carries its own no-SSR
// boundary, so plain content pages can server-render again. `HomePage` and
// `ContactPage` still opt out — both use `HeroPreloader`/`ReachMap`, which
// read `window`/a module-level flag during render in ways that aren't safe
// to run on the server. `Experience` (the scroll-locked journey) stays
// client-only too.

import dynamic from 'next/dynamic';

export const HomePageLoader = dynamic(() => import('./HomePage').then((m) => m.HomePage), { ssr: false });
export const StudioPageLoader = dynamic(() => import('./StudioPage').then((m) => m.StudioPage));
export const IPPageLoader = dynamic(() => import('./IPPage').then((m) => m.IPPage));
export const SlatePageLoader = dynamic(() => import('./SlatePage').then((m) => m.SlatePage));
export const WorkPageLoader = dynamic(() => import('./WorkPage').then((m) => m.WorkPage));
export const PeoplePageLoader = dynamic(() => import('./PeoplePage').then((m) => m.PeoplePage));
export const ContactPageLoader = dynamic(() => import('./ContactPage').then((m) => m.ContactPage), { ssr: false });
export const SlateDetailPageLoader = dynamic(() => import('./SlateDetailPage').then((m) => m.SlateDetailPage));
export const WorkDetailPageLoader = dynamic(() => import('./WorkDetailPage').then((m) => m.WorkDetailPage));
export const ExperienceLoader = dynamic(() => import('@/components/godsown/Experience'), { ssr: false });
