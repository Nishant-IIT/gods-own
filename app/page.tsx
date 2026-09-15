'use client';

import dynamic from 'next/dynamic';

const Experience = dynamic(() => import('@/components/godsown/Experience'), {
  ssr: false,
});

export default function Home() {
  return <Experience />;
}
