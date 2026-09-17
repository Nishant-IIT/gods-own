import type { Metadata } from 'next';
import { PeoplePageLoader } from '@/components/site/pages/loaders';

export const metadata: Metadata = {
  title: "The Makers — GOD'S OWN MOTION PICTURES",
};

export default function Page() {
  return <PeoplePageLoader />;
}
