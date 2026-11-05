export type PrashantWorkItem = {
  title: string;
  status: string;
  /** ImageKit media-library path for the song's cover art, if uploaded. */
  src?: string;
};

export const PRASHANT_WORK: PrashantWorkItem[] = [
  { title: 'PARTY ON MY MIND', status: 'RACE 2 · 2013', src: 'Music/Party on my mind.jpeg' },
  { title: 'ZIDDI DIL', status: 'MARY KOM · 2014', src: 'Music/ziddi dil.jpeg' },
  { title: 'SAUDEBAAZI', status: 'MARY KOM · 2014', src: 'Music/SAUDEBAAZI.jpg' },
  { title: 'MALHARI', status: 'BAJIRAO MASTANI · 2015', src: 'Music/Malhari.jpg' },
  { title: 'GAJANANA', status: 'BAJIRAO MASTANI · 2015', src: 'Music/GAJANANA.jpeg' },
  { title: 'PAL', status: 'JALEBI · 2018', src: 'Music/Pal-From-Jalebi.jpg' },
  { title: 'AILA RE', status: 'MALAAL · 2019', src: 'Music/AILA RE.jpeg' },
  { title: 'UTTH JA ZIDDI RE', status: '83 · 2021', src: 'Music/UTTH JA ZIDDI RE.jpeg' },
];
