/**
 * The house image frames.
 *
 * Every image on the site is cropped to one of these six shapes, and the
 * `width`/`height` below are the masters the art department exports to. Nothing
 * requests a size of its own: a slot names a frame, the frame supplies both the
 * CSS `aspect-ratio` its box is drawn at and the exact pixel box ImageKit is
 * asked to crop to, so the layout and the delivered file can never disagree.
 *
 * `editorial` and `portrait` are the same 4:5 numbers. They stay separate names
 * because a project card and a person are cropped for different reasons, and a
 * call site reads better saying which it is.
 */

import type { CSSProperties } from 'react';

/**
 * The phone/desktop boundary, in px. It is shared deliberately: the CSS below
 * flips the box's shape at `max-width: MOBILE_MAX`, and `ImageSlot` gates its
 * desktop `<source>` at `min-width: MOBILE_MAX + 1`. If those two ever drifted
 * apart there would be a band of widths where a 9:16 master is poured into a
 * 16:9 box, so they both read from here.
 */
export const MOBILE_MAX = 767;

export type FrameName = 'poster' | 'cinematic' | 'editorial' | 'vertical' | 'portrait' | 'square';

type Frame = {
  /** Value for CSS `aspect-ratio` on the slot's own box. */
  css: string;
  /** Master export — the largest crop ever requested from ImageKit. */
  width: number;
  height: number;
  /**
   * Default `sizes` hint for `next/image`: how wide this frame is typically
   * drawn. Without it the browser assumes 100vw and over-fetches every card.
   * Slots with an unusual layout pass their own.
   */
  sizes: string;
  /** What the frame is for — kept next to the numbers so it stays true. */
  use: string;
};

/**
 * Builds a `sizes` hint. Both branches are pinned to `MOBILE_MAX` so a slot's
 * width hint changes over at exactly the width its shape does — a hint that
 * turned over at some nearby-but-different number would leave a band of widths
 * asking for the wrong file size.
 */
const hint = (phone: string, desktop: string) => `(max-width: ${MOBILE_MAX}px) ${phone}, ${desktop}`;

export const FRAMES: Record<FrameName, Frame> = {
  poster: {
    css: '2 / 3',
    width: 1200,
    height: 1800,
    sizes: hint('74vw', '30vw'),
    use: 'Main film/project poster — classic theatrical feel',
  },
  cinematic: {
    css: '16 / 9',
    width: 1920,
    height: 1080,
    sizes: hint('100vw', '92vw'),
    use: 'Wide cinematic artwork — hero sections, film stills, trailer frames',
  },
  editorial: {
    css: '4 / 5',
    width: 1200,
    height: 1500,
    sizes: hint('92vw', '46vw'),
    use: 'Editorial/project card — balances well in grids',
  },
  vertical: {
    css: '9 / 16',
    width: 1080,
    height: 1920,
    // No desktop branch: a vertical frame is only ever served below MOBILE_MAX,
    // as the phone half of an art-directed slot, and there it is full-bleed.
    sizes: '100vw',
    use: 'Mobile/vertical feature — full-screen mobile storytelling',
  },
  portrait: {
    css: '4 / 5',
    width: 1200,
    height: 1500,
    sizes: hint('86vw', '34vw'),
    use: 'Portrait/person — founder, filmmaker, cast',
  },
  square: {
    css: '1 / 1',
    width: 1200,
    height: 1200,
    sizes: hint('86vw', '40vw'),
    use: 'Square utility — social links, logos, thumbnails',
  },
};

/**
 * Inline style carrying a slot's shape to the `.gs-frame` CSS rule.
 *
 * The site styles inline and a media query can't be written inline, so the two
 * ratios travel as custom properties and `app/globals.css` picks whichever the
 * viewport calls for. Pass `mobile` only where the slot genuinely restages for
 * a phone — most frames (a 4:5 card, a 2:3 poster) already read well there and
 * should keep one shape everywhere.
 */
export function frameVars(frame: FrameName, mobile?: FrameName) {
  return {
    '--gs-frame': FRAMES[frame].css,
    ...(mobile ? { '--gs-frame-mobile': FRAMES[mobile].css } : null),
  } as CSSProperties;
}
