/**
 * GODSOWN copy — ported verbatim from GODSOWN.dc.html. This is Prashant
 * Ingole's real authored content, not placeholder text; keep it separate from
 * the rendering/choreography code per the brief's content-model guidance.
 */

export const ORIGIN = {
  title: 'GODSOWN',
  tagline: 'STORIES WRITTEN. WORLDS CREATED.',
  byBy: 'by',
  byName: 'PRASHANT INGOLE',
};

export const WORDS = {
  wordmark: 'WORDS',
  wordsub: 'Before the songs, there were words.',
  lines: [
    'I started with words.',
    'Those words became songs.',
    'Songs became films.',
    'Films became stories.',
  ],
  quote: '“Every song should tell a story.”',
  quoteAttribution: 'PRASHANT INGOLE — ON SONGWRITING',
};

export type SongMoment = {
  id: string;
  title: string;
  film: string;
  year: string;
  credit?: string;
  imagePlaceholder: string;
  story?: { label: string; text: string };
};

export const SONGS: SongMoment[] = [
  {
    id: 'party-on-my-mind',
    title: 'PARTY ON MY MIND',
    film: 'RACE 2',
    year: '2013',
    credit: 'LYRICS — PRASHANT INGOLE',
    imagePlaceholder: 'RACE 2 — film still or song artwork',
    story: {
      label: 'THE STORY',
      text: 'Written in a rush, approved almost immediately, and eventually becoming his first major hit.',
    },
  },
  {
    id: 'ziddi-dil',
    title: 'ZIDDI DIL',
    film: 'MARY KOM',
    year: '2014',
    imagePlaceholder: 'MARY KOM — film still or song artwork',
    story: {
      label: 'WHY THIS SONG EXISTS',
      text: 'He has said the song reflected his own experience — written at the point when he almost gave up.',
    },
  },
  {
    id: 'malhari',
    title: 'MALHARI',
    film: 'BAJIRAO MASTANI',
    year: '2015',
    imagePlaceholder: 'BAJIRAO MASTANI — film still or song artwork',
  },
  {
    id: 'gajanana',
    title: 'GAJANANA',
    film: 'BAJIRAO MASTANI',
    year: '2015',
    credit: 'LYRICS — PRASHANT INGOLE',
    imagePlaceholder: 'GAJANANA — film still or song artwork',
    story: {
      label: 'THE RESEARCH',
      text: 'For Gajanana, he researched the 108 names of Ganapati before writing a line.',
    },
  },
  {
    id: 'pal',
    title: 'PAL',
    film: 'JALEBI',
    year: '2018',
    credit: 'LYRICS — PRASHANT INGOLE',
    imagePlaceholder: 'PAL — film still or song artwork',
  },
];

export const BODY_OF_WORK = [
  { title: 'UDHAL HO', film: 'MALAAL', year: '2019' },
  { title: 'UTTH JA ZIDDI RE', film: '83', year: '2021' },
];

export const CINEMA = {
  fragments: ['WORDS', 'MUSIC', 'STORIES', 'CINEMA'],
  title: 'BUDH',
  subtitle: 'AWAKENING',
  credits: ['WRITER', 'DIRECTOR', 'PRODUCER'],
  imagePlaceholder: 'BUDH — film still',
  frameCode: '02:39:1',
};

export const JOURNEY = {
  line: 'THE STORY IS STILL BEING WRITTEN.',
  infinity: '2026 → ∞',
};

export const CONNECT = {
  title: 'GODSOWN',
  name: 'PRASHANT INGOLE',
  links: [
    { label: 'CONTACT', href: '#' },
    { label: 'INSTAGRAM', href: '#' },
  ],
};
