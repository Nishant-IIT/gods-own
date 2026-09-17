import type { Metadata } from 'next';
import { WorkPageLoader } from '@/components/site/pages/loaders';

export const metadata: Metadata = {
  title: "Selected Work — GOD'S OWN MOTION PICTURES",
};

export default function Page() {
  return <WorkPageLoader />;
}
