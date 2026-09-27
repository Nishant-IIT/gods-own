'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';
import { stillFor } from '@/content/media';

type Props = {
  /** Real still, once one is supplied — drop a file under public/media and pass its path here. */
  src?: string;
  alt: string;
  placeholder: string;
  shape?: 'rect' | 'rounded';
  className?: string;
  style?: CSSProperties;
  /** Opt out of the temporary ImageKit fallback and show the bare frame instead. */
  noFallback?: boolean;
};

/**
 * Replaces the design-canvas-only `<image-slot>` custom element (drag/drop
 * editing only works inside the Claude Design runtime). Renders `src` when one
 * is supplied. Otherwise — TEMPORARY, while the ImageKit integration is being
 * verified — it deals a library still keyed off the slot's own label (see
 * `content/media.ts`), so no slot is empty. The palette-matched placeholder
 * frame remains as the last resort for `noFallback` slots.
 */
export function ImageSlot({ src, alt, placeholder, shape = 'rect', className, style, noFallback }: Props) {
  const radius = shape === 'rounded' ? 18 : 2;
  const resolved = src ?? (noFallback ? undefined : stillFor(placeholder || alt));

  if (resolved) {
    return (
      <div
        className={className}
        style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: radius, ...style }}
      >
        <Image src={resolved} alt={alt} fill sizes="90vw" style={{ objectFit: 'cover' }} />
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
