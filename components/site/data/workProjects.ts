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

// Dummy placeholder data — swap for real gallery stills once confirmed.
const FILMS = ['BAJIRAO MASTANI — 2015', 'MARY KOM — 2014', 'RACE 2 — 2013', '83 — 2021', 'JALEBI — 2018'];

export const WORK_PROJECTS: WorkProject[] = FILMS.map((label, i) => {
  const [title, year] = label.split(' — ');
  return {
    slug: slugify(title),
    title,
    year,
    description: 'Soundtrack contribution.',
    imageUrl: `https://picsum.photos/seed/${encodeURIComponent(title)}/1600/900`,
    category: WORK_CATEGORIES[i % WORK_CATEGORIES.length],
  };
});

export function getWorkProject(slug: string): WorkProject | undefined {
  return WORK_PROJECTS.find((p) => p.slug === slug);
}
