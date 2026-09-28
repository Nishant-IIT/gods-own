/**
 * ImageKit delivery, plus a TEMPORARY still fallback.
 *
 * Delivery is frame-driven: every URL asks ImageKit for the exact pixel box of
 * one of the six house frames in `content/frames.ts`, so what arrives already
 * matches the shape the slot is drawn at. Nothing here picks its own size.
 *
 * The fallback below is the temporary half.
 *
 * Every `ImageSlot` on the site currently has no real still assigned yet, so
 * rather than shipping empty placeholder frames we deal each slot a screen grab
 * from the ImageKit library. The mapping is a hash of the slot's own label, so
 * it is stable between server and client render (a genuinely random pick would
 * cause a hydration mismatch) while still scattering different stills across
 * the page. Once the real per-slot artwork exists, pass an explicit `src` to
 * each `ImageSlot` and delete this fallback.
 */

import { FRAMES, type FrameName } from '@/content/frames';

export const IK_ENDPOINT = 'https://ik.imagekit.io/godsown';

/** Screen grabs uploaded to /Screen Grabs — 1920x1080 (a few 1280x720). */
const STILLS = [
  'Screen Grabs/vlcsnap-2023-02-12-07h56m23s961.png',
  'Screen Grabs/vlcsnap-2023-02-12-07h56m29s148.png',
  'Screen Grabs/vlcsnap-2023-02-12-07h56m39s418.png',
  'Screen Grabs/vlcsnap-2023-02-12-07h57m24s244.png',
  'Screen Grabs/vlcsnap-2023-02-12-07h57m33s779.png',
  'Screen Grabs/vlcsnap-2023-02-12-07h58m47s088.png',
  'Screen Grabs/vlcsnap-2023-02-12-07h59m02s643.png',
  'Screen Grabs/vlcsnap-2023-02-12-07h59m28s179.png',
  'Screen Grabs/vlcsnap-2023-02-12-08h07m02s322.png',
  'Screen Grabs/vlcsnap-2023-02-12-08h07m08s064.png',
  'Screen Grabs/vlcsnap-2023-02-12-08h07m20s704.png',
  'Screen Grabs/vlcsnap-2023-02-12-08h11m15s194.png',
  'Screen Grabs/vlcsnap-2023-02-12-08h11m24s745.png',
  'Screen Grabs/vlcsnap-2023-02-12-08h11m34s409.png',
  'Screen Grabs/vlcsnap-2023-02-12-08h11m52s488.png',
  'Screen Grabs/vlcsnap-2023-02-12-08h12m04s392.png',
  'Screen Grabs/vlcsnap-2023-02-12-08h19m42s028.png',
  'Screen Grabs/vlcsnap-2023-02-12-08h20m07s943.png',
  'Screen Grabs/vlcsnap-2023-02-12-08h20m54s650.png',
  'Screen Grabs/vlcsnap-2023-02-12-08h52m46s096.png',
  'Screen Grabs/vlcsnap-2023-02-12-08h52m54s151.png',
  'Screen Grabs/vlcsnap-2023-05-11-10h27m05s791.png',
  'Screen Grabs/vlcsnap-2023-05-11-10h27m26s461.png',
  'Screen Grabs/vlcsnap-2023-07-03-07h19m52s372.png',
  'Screen Grabs/vlcsnap-2023-07-03-07h20m37s924.png',
  'Screen Grabs/vlcsnap-2023-07-05-00h48m37s024.png',
  'Screen Grabs/vlcsnap-2023-07-06-02h37m57s165.png',
  'Screen Grabs/vlcsnap-2023-07-07-01h37m42s707.png',
] as const;

/** The one portrait in the library — used for the founder portrait slots. */
const PORTRAIT = 'Prashant ingole';

/**
 * Builds a delivery URL. `path` is the media-library path with real spaces;
 * each segment is encoded so "Screen Grabs" reaches ImageKit as "Screen%20Grabs".
 */
export function ikUrl(path: string, tr: string) {
  const encoded = path.split('/').map(encodeURIComponent).join('/');
  return `${IK_ENDPOINT}/${encoded}?tr=${tr}`;
}

/**
 * Transformation string for a house frame. Naming both `w` and `h` puts
 * ImageKit in its default `c-maintain_ratio` mode, which scales the source and
 * centre-crops the overflow — so the delivered file is exactly the frame's
 * master box whatever shape the original was. Portraits get a little more
 * quality budget because compression shows on a face.
 *
 * No smart-crop focus is applied anywhere. Framing is a decision the artwork
 * makes, not the CDN: a slot that needs a different composition on a phone gets
 * a second image cut for it (`mobileSrc` on `ImageSlot`), never an algorithmic
 * guess at where the subject of the wide one was.
 */
export function frameTransform(frame: FrameName) {
  const { width, height } = FRAMES[frame];
  const quality = frame === 'portrait' ? 80 : 72;
  return `w-${width},h-${height},c-maintain_ratio,f-auto,q-${quality}`;
}

/** Delivery URL for a real media-library path, cropped to one of the frames. */
export function frameUrl(path: string, frame: FrameName) {
  return ikUrl(path, frameTransform(frame));
}

/**
 * FNV-1a plus an xorshift finalizer — small, stable, and spreads near-identical
 * labels ("look reference 1/2/3") apart. With 28 stills and up to 6 slots on a
 * page, the birthday paradox makes a repeat likely for any given seed, so the
 * offset basis below is nudged off FNV's standard 0x811c9dc5 to the nearest
 * value that deals no page a still twice. That tuning is specific to today's
 * slot labels; it only governs which temporary still appears where, so if a new
 * label reintroduces a visible repeat, bump the basis rather than debugging it.
 */
function hash(key: string) {
  let h = 0x811c9dcd;
  for (let i = 0; i < key.length; i += 1) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  h ^= h >>> 15;
  h = Math.imul(h, 0x2545f491);
  h ^= h >>> 13;
  return h >>> 0;
}

/**
 * Deterministic still for a slot label, cropped to the slot's frame. A slot
 * asking for the `portrait` frame gets the real portrait; everything else gets
 * a screen grab picked by hashing the label.
 */
export function stillFor(key: string, frame: FrameName) {
  if (frame === 'portrait') return frameUrl(PORTRAIT, frame);
  return frameUrl(STILLS[hash(key) % STILLS.length], frame);
}
