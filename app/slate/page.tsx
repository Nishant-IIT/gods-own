import type { Metadata } from 'next';
import { SlatePageLoader } from '@/components/site/pages/loaders';

export const metadata: Metadata = {
  title: "The Slate — GOD'S OWN MOTION PICTURES",
};

export default function Page() {
  return <SlatePageLoader />;
}
