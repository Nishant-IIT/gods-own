import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSlateProject, SLATE_PROJECTS } from '@/components/site/data/slateProjects';
import { SlateDetailPageLoader } from '@/components/site/pages/loaders';

export function generateStaticParams() {
  return SLATE_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getSlateProject(slug);
  return { title: project ? `${project.title} — GOD'S OWN MOTION PICTURES` : "The Slate — GOD'S OWN MOTION PICTURES" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getSlateProject(slug);
  if (!project) notFound();
  return <SlateDetailPageLoader project={project} />;
}
