import type { Metadata } from 'next';
import { ContactPageLoader } from '@/components/site/pages/loaders';

export const metadata: Metadata = {
  title: "Contact — GOD'S OWN MOTION PICTURES",
};

export default function Page() {
  return <ContactPageLoader />;
}
