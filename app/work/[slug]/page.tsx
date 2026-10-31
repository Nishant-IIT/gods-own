import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getWorkProject, WORK_PROJECTS } from '@/components/site/data/workProjects';
import { WorkDetailPageLoader } from '@/components/site/pages/loaders';

export function generateStaticParams() {
  return WORK_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getWorkProject(slug);
  return { title: project ? `${project.title} — GOD'S OWN MOTION PICTURES` : "Selected Work — GOD'S OWN MOTION PICTURES" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getWorkProject(slug);
  if (!project) notFound();
  return <WorkDetailPageLoader project={project} />;
}
