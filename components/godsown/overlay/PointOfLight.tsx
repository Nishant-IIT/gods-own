'use client';

import { useEffect, useRef } from 'react';
import { ramp } from '../lib/curves';
import { scrollState } from '../lib/scrollState';

/**
 * "The point of light: opening and closing shot" — ported directly from the
 * prototype's `draw()`. A single glowing point blooms at screen centre for
 * the opening few seconds (as the hero title arrives) and again as the
 * journey closes out (past p=0.945 — Journey/Connect). Landing there
 * directly (a nav jump straight to Connect) puts you right past that
 * threshold immediately, so the whole star field visually gives way to one
 * point of light rather than a title just appearing over the same starfield.
 */
export function PointOfLight() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const p = scrollState.progress;
      const t = scrollState.t;
      const dot = (1 - ramp(p, 0.02, 0.06)) * Math.min(1, t * 0.8) + ramp(p, 0.958, 0.978);
      const active = dot > 0.01 && (p < 0.08 || p > 0.945);
      const pr = 1.4 + 0.5 * Math.sin(t * 1.1) + (p < 0.5 ? ramp(p, 0, 0.06) * 1.5 : 0);

      if (glowRef.current) {
        glowRef.current.style.opacity = active ? (0.25 * dot).toFixed(3) : '0';
      }
      if (dotRef.current) {
        dotRef.current.style.opacity = active ? dot.toFixed(3) : '0';
        const size = (pr * 2).toFixed(2) + 'px';
        dotRef.current.style.width = size;
        dotRef.current.style.height = size;
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 180,
          height: 180,
          marginLeft: -90,
          marginTop: -90,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236,230,218,0.9) 0%, rgba(236,230,218,0) 70%)',
          opacity: 0,
          pointerEvents: 'none',
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          background: '#fff8ec',
          borderRadius: '50%',
          transform: 'translate(-50%,-50%)',
          opacity: 0,
          pointerEvents: 'none',
        }}
      />
    </>
  );
}
