'use client';

import { useEffect, useRef } from 'react';
import { bell } from '../lib/curves';
import { scrollState } from '../lib/scrollState';

/**
 * The moment light swallows the screen as the camera passes through the Budh
 * star (prototype: `bell(camZ, 596, 608, 8)`). A plain full-viewport overlay
 * whose opacity is a continuous function of camera depth, so — like the
 * choreography driver — it needs its own rAF loop rather than reacting only
 * to discrete scroll events.
 */
export function LightSwallow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const sw = bell(scrollState.camZ, 596, 608, 8);
      if (ref.current) ref.current.style.opacity = String(Math.min(0.97, sw));
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        background: '#e8d9bd',
        opacity: 0,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
      }}
    />
  );
}
