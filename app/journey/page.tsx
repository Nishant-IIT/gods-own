import type { Metadata } from 'next';
import { ExperienceLoader } from '@/components/site/pages/loaders';

export const metadata: Metadata = {
  title: "GODSOWN — Prashant Ingole's Journey",
  description:
    'GODSOWN — the creative universe of Prashant Ingole: lyricist, songwriter, composer, writer, and filmmaker.',
};

export default function JourneyPage() {
  return <ExperienceLoader />;
}
