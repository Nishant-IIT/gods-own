'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';

type Props = {
  /** Real still, once one is supplied — drop a file under public/media and pass its path here. */
  src?: string;
  alt: string;
  placeholder: string;
  shape?: 'rect' | 'rounded';
  className?: string;
  style?: CSSProperties;
};

/**
 * Replaces the design-canvas-only `<image-slot>` custom element (drag/drop
 * editing only works inside the Claude Design runtime). Renders a real image
 * the moment `src` is supplied; until then, an elegant placeholder frame that
 * matches the site's palette instead of a broken image or fabricated stock art —
 * the brief is explicit: don't invent career imagery that doesn't exist yet.
 */
export function ImageSlot({ src, alt, placeholder, shape = 'rect', className, style }: Props) {
  const radius = shape === 'rounded' ? 18 : 2;

  if (src) {
    return (
      <div
        className={className}
        style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: radius, ...style }}
      >
        <Image src={src} alt={alt} fill sizes="90vw" style={{ objectFit: 'cover' }} />
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
