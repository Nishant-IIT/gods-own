'use client';

// `dynamic(..., { ssr: false })` may only be called from a Client Component,
// so every page's no-SSR dynamic import (avoiding a hydration mismatch on the
// R3F canvas / window-reading Universe background) lives here, one loader per
// route, and each server `page.tsx` just renders its loader.

import dynamic from 'next/dynamic';

export const HomePageLoader = dynamic(() => import('./HomePage').then((m) => m.HomePage), { ssr: false });
export const StudioPageLoader = dynamic(() => import('./StudioPage').then((m) => m.StudioPage), { ssr: false });
export const IPPageLoader = dynamic(() => import('./IPPage').then((m) => m.IPPage), { ssr: false });
export const SlatePageLoader = dynamic(() => import('./SlatePage').then((m) => m.SlatePage), { ssr: false });
export const WorkPageLoader = dynamic(() => import('./WorkPage').then((m) => m.WorkPage), { ssr: false });
export const PeoplePageLoader = dynamic(() => import('./PeoplePage').then((m) => m.PeoplePage), { ssr: false });
export const ContactPageLoader = dynamic(() => import('./ContactPage').then((m) => m.ContactPage), { ssr: false });
export const SlateDetailPageLoader = dynamic(
  () => import('./SlateDetailPage').then((m) => m.SlateDetailPage),
  { ssr: false },
);
export const ExperienceLoader = dynamic(() => import('@/components/godsown/Experience'), { ssr: false });
