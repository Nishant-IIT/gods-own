export type SlateCategory = 'FILM' | 'SERIES' | 'MUSIC' | 'DIGITAL';

export type SlateProject = {
  slug: string;
  title: string;
  /** Card subtitle on the Slate index, e.g. "Feature Film · Sci-Fi / Thriller". */
  format: string;
  status: string;
  cat: SlateCategory;
  /** Whether this counts toward the "ORIGINAL IP" filter. */
  ip: boolean;
  /** The three kicker lines on the detail masthead: type, genre, status. */
  kicker: [string, string];
  logline: string;
  /**
   * Key art for the detail masthead — two separate uploads, not one image
   * cropped twice: `wide` is composed for the 16:9 frame, `phone` for the 9:16
   * one a handset gets. Both are ImageKit media-library paths. Optional as a
   * pair, never as a half, so a project can't ship art for one device only.
   */
  keyArt?: { wide: string; phone: string };
  rows: { label: string; body: string }[];
};

export const SLATE_PROJECTS: SlateProject[] = [
  {
    slug: 'orion',
    title: 'ORION',
    format: 'Feature Film · Sci-Fi / Thriller',
    status: 'IN DEVELOPMENT',
    cat: 'FILM',
    ip: true,
    kicker: ['FEATURE FILM', 'SCI-FI / THRILLER'],
    logline:
      'A signal arrives from somewhere that should be empty. The only man who can read it has spent twenty years insisting he never heard it.',
    rows: [
      { label: 'THE WORLD', body: 'India, fifteen years from now. Not a dystopia — a country that has simply kept going, where a decommissioned deep-space array outside Pune has become farmland with a fence around it.' },
      { label: 'THE AUDIENCE', body: 'Genre audiences at home and abroad who came to Indian cinema through streaming, and who watch subtitled science fiction by default.' },
      { label: 'THE FORMAT', body: 'Feature film, written as the first chapter of a three-part story. A limited series extension exists in outline.' },
      { label: 'STATUS', body: 'In development. Second draft complete, director conversations under way, no cast attached.' },
      { label: 'IP POTENTIAL', body: 'Trilogy structure, a self-contained mythology and a lead character built to carry animation, graphic novel and game extensions.' },
      { label: 'COMPARABLES', body: 'To be confirmed with the finance plan.' },
    ],
  },
  {
    slug: 'raga',
    title: 'RAGA',
    format: 'Limited Series · Musical Drama',
    status: 'SCRIPT DEVELOPMENT',
    cat: 'SERIES',
    ip: true,
    kicker: ['LIMITED SERIES', 'MUSICAL DRAMA'],
    logline: 'Three generations of one family inherit the same unfinished composition. None of them can play it the way it was written.',
    rows: [
      { label: 'THE WORLD', body: 'A gharana in decline across sixty years — from a Kolhapur courtyard in 1964 to a Bandra studio where the grandson sells the same melody to a sneaker advertisement.' },
      { label: 'THE AUDIENCE', body: 'Viewers who came for the music and stayed for the family. Strong crossover into diaspora and international arthouse.' },
      { label: 'THE FORMAT', body: 'Limited series, six episodes. Each episode centres on one recording, one song, one betrayal.' },
      { label: 'STATUS', body: 'Script development. Episodes one and two drafted, series bible complete, composer conversations under way.' },
      { label: 'IP POTENTIAL', body: 'An original album that exists independently of the series, plus a live performance format built from the same repertoire.' },
      { label: 'COMPARABLES', body: 'To be confirmed with the finance plan.' },
    ],
  },
  {
    slug: 'arya',
    title: 'ARYA',
    format: 'Series · Fantasy / Adventure',
    status: 'EARLY DEVELOPMENT',
    cat: 'SERIES',
    ip: true,
    kicker: ['SERIES', 'FANTASY / ADVENTURE'],
    logline: 'A girl who can hear what the river remembers is asked to forget it. She refuses, and the water rises.',
    rows: [
      { label: 'THE WORLD', body: 'A river valley where the myth is not metaphor. Contemporary in its voice, mythic in its source, built so a child and an adult read the same scene differently.' },
      { label: 'THE AUDIENCE', body: 'Family and young-adult audiences at home; internationally, the fantasy audience that arrives through subtitles without hesitation.' },
      { label: 'THE FORMAT', body: 'Series, eight episodes, designed for multiple seasons. Animation extension outlined in parallel.' },
      { label: 'STATUS', body: 'Early development. World bible and character set complete, pilot outline in progress.' },
      { label: 'IP POTENTIAL', body: 'The strongest character property on the slate — built to carry animation, licensing and digital formats beyond the series itself.' },
      { label: 'COMPARABLES', body: 'To be confirmed with the finance plan.' },
    ],
  },
  {
    slug: 'do-ghar',
    title: 'DO GHAR',
    format: 'Feature Film · Drama',
    status: 'IN DEVELOPMENT',
    cat: 'FILM',
    ip: false,
    kicker: ['FEATURE FILM', 'DRAMA'],
    logline: 'Two brothers inherit one house and cannot agree on which half of it their mother loved.',
    rows: [
      { label: 'THE WORLD', body: 'A single property in a small Maharashtrian town, and the twelve months in which a family decides what it is worth.' },
      { label: 'THE AUDIENCE', body: 'Hindi-language drama audiences, festival-first with a theatrical and streaming life to follow.' },
      { label: 'THE FORMAT', body: 'Feature film, contained cast, single principal location.' },
      { label: 'STATUS', body: 'In development. First draft complete, budget being built against a contained shooting plan.' },
      { label: 'IP POTENTIAL', body: 'Limited by design. This is a film, not a franchise — it belongs on the slate on the strength of the writing.' },
      { label: 'COMPARABLES', body: 'To be confirmed with the finance plan.' },
    ],
  },
  {
    slug: 'neon-monsoon',
    title: 'NEON MONSOON',
    format: 'Music Project · Original Album',
    status: 'IN PRODUCTION',
    cat: 'MUSIC',
    ip: true,
    kicker: ['MUSIC PROJECT', 'ORIGINAL ALBUM'],
    logline: 'Twelve songs about a city that only makes sense between June and September.',
    rows: [
      { label: 'THE WORLD', body: 'Mumbai in the rain, recorded as a place rather than described as one. Each track is fixed to a location and an hour.' },
      { label: 'THE AUDIENCE', body: 'Streaming-first music audiences, with a visual release for each single.' },
      { label: 'THE FORMAT', body: 'Original album, twelve tracks, with four accompanying short films.' },
      { label: 'STATUS', body: 'In production. Six tracks recorded, two visuals shot.' },
      { label: 'IP POTENTIAL', body: 'Music IP owned outright — sync, live performance and the visual films as separate assets.' },
      { label: 'COMPARABLES', body: 'To be confirmed with the finance plan.' },
    ],
  },
  {
    slug: 'the-last-take',
    title: 'THE LAST TAKE',
    format: 'Short-Form Series · Digital',
    status: 'UPCOMING',
    cat: 'DIGITAL',
    ip: false,
    kicker: ['SHORT-FORM SERIES', 'DIGITAL'],
    logline: 'Every episode is the final take of a scene that never made it into the film.',
    rows: [
      { label: 'THE WORLD', body: 'Film sets, after the unit has packed up. An anthology built entirely from the moments a production throws away.' },
      { label: 'THE AUDIENCE', body: 'Vertical-first audiences under thirty who watch on a phone and share in a group.' },
      { label: 'THE FORMAT', body: 'Short-form series, twenty episodes of four to six minutes, shot vertical.' },
      { label: 'STATUS', body: 'Upcoming. Format locked, first five episodes written, production window being scheduled.' },
      { label: 'IP POTENTIAL', body: 'A repeatable format rather than a single story — built to be remade in other languages and markets.' },
      { label: 'COMPARABLES', body: 'To be confirmed with the finance plan.' },
    ],
  },
];

export function getSlateProject(slug: string): SlateProject | undefined {
  return SLATE_PROJECTS.find((p) => p.slug === slug);
}
