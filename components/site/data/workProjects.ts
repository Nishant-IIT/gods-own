import { frameUrl } from '@/content/media';
import { PRASHANT_WORK } from './prashantWork';

export const WORK_CATEGORIES = [
  'TVC',
  'BRAND FILMS',
  'DIGITAL FILMS',
  'MUSIC VIDEOS',
  'FILMS',
  'ANIMATION',
  'MOTION GRAPHICS',
  'AI',
  'OTHER',
] as const;

export type WorkCategory = (typeof WORK_CATEGORIES)[number];

export type WorkProject = {
  slug: string;
  title: string;
  year: string;
  description: string;
  imageUrl: string;
  category: WorkCategory;
};

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// Prashant's songs for Hindi cinema — the same list shown on his profile.
// Songs without a real cover upload yet fall back to a placeholder still.
export const WORK_PROJECTS: WorkProject[] = PRASHANT_WORK.map(({ title, status, src }) => {
  const [film, year] = status.split(' · ');
  return {
    slug: slugify(title),
    title,
    year,
    description: film,
    imageUrl: src ? frameUrl(src, 'cinematic') : `https://picsum.photos/seed/${encodeURIComponent(title)}/1600/900`,
    category: 'MUSIC VIDEOS',
  };
});

export function getWorkProject(slug: string): WorkProject | undefined {
  return WORK_PROJECTS.find((p) => p.slug === slug);
}
