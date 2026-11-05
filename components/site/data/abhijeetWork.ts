export type AbhijeetWorkItem = {
  title: string;
  status: string;
  /** ImageKit media-library path for the project's still, if uploaded. */
  src?: string;
};

// Placeholder — formats from his bio, not specific project credits yet.
// Swap each title/status for a real project name once credits are supplied,
// and add `src` once stills are uploaded.
export const ABHIJEET_WORK: AbhijeetWorkItem[] = [
  { title: 'TVC', status: 'DIGITAL ADVERTISING' },
  { title: 'BRAND FILMS', status: 'CREATIVE DIRECTION' },
  { title: 'MUSIC VIDEOS', status: 'DIRECTION' },
  { title: 'TALK SHOWS', status: 'SHOWRUNNER' },
  { title: 'CORPORATE FILMS', status: 'POST PRODUCTION' },
  { title: 'FEATURE FILMS', status: 'DIRECTION' },
  { title: 'WEBSHOW', status: 'CREATIVE PRODUCER' },
  { title: 'FASHION FILMS', status: 'DIRECTION' },
  { title: 'REAL-ESTATE FILMS', status: 'DIRECTION' },
  { title: 'MOTION GRAPHICS & ANIMATION', status: 'POST PRODUCTION' },
];
