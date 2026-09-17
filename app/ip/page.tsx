import type { Metadata } from 'next';
import { IPPageLoader } from '@/components/site/pages/loaders';

export const metadata: Metadata = {
  title: "IP & Universes — GOD'S OWN MOTION PICTURES",
};

export default function Page() {
  return <IPPageLoader />;
}
