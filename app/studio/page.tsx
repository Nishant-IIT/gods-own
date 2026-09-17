import type { Metadata } from 'next';
import { StudioPageLoader } from '@/components/site/pages/loaders';

export const metadata: Metadata = {
  title: "The Studio — GOD'S OWN MOTION PICTURES",
};

export default function Page() {
  return <StudioPageLoader />;
}
