'use client';

import Image, { getImageProps } from 'next/image';
import type { CSSProperties } from 'react';
import { FRAMES, MOBILE_MAX, type FrameName } from '@/content/frames';
import { frameUrl, stillFor } from '@/content/media';

type Props = {
  /** Real still. A `/media/...` path or absolute URL is used as-is; anything
   *  else is read as an ImageKit media-library path and cropped to `frame`. */
  src?: string;
  alt: string;
  placeholder: string;
  /**
   * Which house frame this slot is cropped to — see `content/frames.ts`. It
   * decides the pixel box requested from ImageKit and the default `sizes`
   * hint, and every slot must name one, which is why there is no default.
   * The box's own `aspect-ratio` is set by the layout around it, from
   * `FRAMES[frame].css`, so the shape is declared once per slot.
   */
  frame: FrameName;
  /**
   * Restage the slot for phones. Setting this turns the slot into a real
   * art-directed `<picture>`: below `MOBILE_MAX` the browser fetches the phone
   * image instead, and the box changes shape to match (the call site must carry
   * `frameVars(frame, mobileFrame)` and `className="gs-frame"`).
   * Only worth it where a slot genuinely restages — a 16:9 hero going 9:16 on a
   * phone. A 4:5 card or a 2:3 poster already reads well and should leave this
   * unset rather than ask for a second image.
   */
  mobileFrame?: FrameName;
  /**
   * The phone image — a separate upload, composed for `mobileFrame`, not a
   * re-crop of `src`. This is the whole point of the pairing: the wide image
   * and the tall one are two different photographs, and the browser picks one.
   *
   * Pair it with `src`: setting one real image without the other leaves a phone
   * showing a frame that was never composed for it, which `assertPaired` below
   * complains about in development.
   */
  mobileSrc?: string;
  shape?: 'rect' | 'rounded';
  /** Override the frame's default `sizes` where the layout is unusual. */
  sizes?: string;
  /** Override the mobile frame's default `sizes`. */
  mobileSizes?: string;
  className?: string;
  style?: CSSProperties;
  /** Opt out of the temporary ImageKit fallback and show the bare frame instead. */
  noFallback?: boolean;
};

/** A path we hand to `next/image` untouched — local asset or an absolute URL. */
function isLocalOrAbsolute(src: string) {
  return src.startsWith('/') || /^[a-z]+:/i.test(src);
}

/**
 * Half a pair is the one authoring slip this design can't catch at the type
 * level: the box still turns 9:16 on a phone (the call site said so), but the
 * only real image is the wide one, so `object-fit` would crop it blind — the
 * exact thing the pairing exists to avoid. Dev-only, and silent in production.
 */
function assertPaired(alt: string, src?: string, mobileFrame?: FrameName, mobileSrc?: string) {
  if (process.env.NODE_ENV === 'production') return;
  if (mobileFrame && src && !mobileSrc) {
    console.warn(
      `ImageSlot "${alt}": mobileFrame="${mobileFrame}" is set and src is a real image, but mobileSrc is missing. ` +
        `Phones will crop the desktop image to ${FRAMES[mobileFrame].css}. Upload a ${mobileFrame} image and pass it as mobileSrc.`,
    );
  }
}

/**
 * Replaces the design-canvas-only `<image-slot>` custom element (drag/drop
 * editing only works inside the Claude Design runtime). Renders `src` when one
 * is supplied. Otherwise — TEMPORARY, while the ImageKit integration is being
 * verified — it deals a library still keyed off the slot's own label (see
 * `content/media.ts`), so no slot is empty. The palette-matched placeholder
 * frame remains as the last resort for `noFallback` slots.
 */
export function ImageSlot({
  src,
  alt,
  placeholder,
  frame,
  mobileFrame,
  mobileSrc,
  shape = 'rect',
  sizes,
  mobileSizes,
  className,
  style,
  noFallback,
}: Props) {
  const radius = shape === 'rounded' ? 18 : 2;
  assertPaired(alt, src, mobileFrame, mobileSrc);

  // A real upload is delivered at its own frame's box; with nothing uploaded
  // yet the slot falls back to a library still cut to that same box, so the
  // layout is visible during development (see `content/media.ts` — temporary).
  const resolve = (candidate: string | undefined, f: FrameName) => {
    const own = candidate && (isLocalOrAbsolute(candidate) ? candidate : frameUrl(candidate, f));
    return own ?? (noFallback ? undefined : stillFor(placeholder || alt, f));
  };
  const resolved = resolve(src, frame);

  // Art-directed: two separate images, and the browser fetches only the one it
  // will show — a phone never pays for the wide upload. `<picture>` is pure
  // markup, which is what keeps this free of a hydration guess about viewport
  // width — no `useMediaQuery`, no flash of the wrong image.
  // `mobile` is undefined only when a `noFallback` slot has no phone upload; the
  // slot then serves one image at every width rather than passing the wide one
  // off as a phone frame.
  const mobile = mobileFrame ? resolve(mobileSrc, mobileFrame) : undefined;

  if (resolved && mobileFrame && mobile) {
    const common = { alt, fill: true as const };
    const wide = getImageProps({ ...common, src: resolved, sizes: sizes ?? FRAMES[frame].sizes });
    const tall = getImageProps({ ...common, src: mobile, sizes: mobileSizes ?? FRAMES[mobileFrame].sizes });

    return (
      <div
        className={className}
        style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: radius, ...style }}
      >
        <picture>
          <source media={`(min-width: ${MOBILE_MAX + 1}px)`} srcSet={wide.props.srcSet} sizes={wide.props.sizes} />
          {/* The phone image is the bare `<img>`, so it is what any browser
              that ignores `<source>` media falls back to. */}
          {/* `alt` is already in the spread; naming it again is what lets the
              a11y lint rule see it. */}
          <img {...tall.props} alt={alt} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        </picture>
      </div>
    );
  }

  if (resolved) {
    return (
      <div
        className={className}
        style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: radius, ...style }}
      >
        <Image src={resolved} alt={alt} fill sizes={sizes ?? FRAMES[frame].sizes} style={{ objectFit: 'cover' }} />
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: radius,
        border: '1px solid rgba(236,230,218,0.14)',
        background:
          'linear-gradient(155deg, rgba(212,160,90,0.08), rgba(236,230,218,0.02) 45%, rgba(196,70,58,0.05))',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        padding: 14,
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <span
        style={{
          fontSize: 10,
          letterSpacing: '.18em',
          color: '#8f887c',
          fontFamily: 'ui-monospace, Menlo, monospace',
        }}
      >
        {placeholder}
      </span>
    </div>
  );
}
