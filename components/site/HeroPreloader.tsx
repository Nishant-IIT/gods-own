'use client';

import { useEffect, useMemo, useState } from 'react';

const HOLD_MS = 1400;
const EXIT_MS = 700;
const STAR_COUNT = 70;

const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

type Phase = 'visible' | 'exiting' | 'done';

/**
 * A handful of CSS radial-gradient dots, cheap to paint and composited for
 * free with the slide transition — stands in for the real `<Universe/>`
 * starfield without a second WebGL canvas competing for frames during the
 * exit animation.
 */
function buildStarfield(count: number) {
  const stars = Array.from({ length: count }, () => {
    const x = (Math.random() * 100).toFixed(2);
    const y = (Math.random() * 100).toFixed(2);
    const size = Math.random() < 0.85 ? 1 : 2;
    const o = (0.3 + Math.random() * 0.6).toFixed(2);
    return `radial-gradient(${size}px ${size}px at ${x}% ${y}%, rgba(236,230,218,${o}), transparent 60%)`;
  });
  stars.push('radial-gradient(120% 120% at 50% 40%, rgba(0,0,0,0) 0%, rgba(0,0,0,.55) 70%, rgba(0,0,0,.85) 100%)');
  return stars.join(', ');
}

/**
 * Full-screen studio vanity card shown on every HomePage mount: the wordmark
 * racks into focus from a tight, blurred kerning, a gold line draws out
 * beneath it, then the whole card holds before sliding up to reveal the live
 * hero. Skipped entirely under prefers-reduced-motion rather than forcing a
 * timed wait on those users.
 */
export function HeroPreloader() {
  const [phase, setPhase] = useState<Phase>(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'done' : 'visible',
  );
  const [entered, setEntered] = useState(false);
  const starfield = useMemo(() => buildStarfield(STAR_COUNT), []);

  useEffect(() => {
    if (phase !== 'visible') return;
    const raf = requestAnimationFrame(() => setEntered(true));
    const holdTimer = setTimeout(() => setPhase('exiting'), HOLD_MS);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(holdTimer);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== 'exiting') return;
    const exitTimer = setTimeout(() => setPhase('done'), EXIT_MS);
    return () => clearTimeout(exitTimer);
  }, [phase]);

  if (phase === 'done') return null;

  const exiting = phase === 'exiting';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(16px,2.6vh,28px)',
        backgroundColor: '#000',
        backgroundImage: starfield,
        pointerEvents: exiting ? 'none' : 'auto',
        willChange: 'transform, opacity',
        transform: exiting ? 'translateY(-100%) scale(.985)' : 'translateY(0) scale(1)',
        opacity: exiting ? 0 : 1,
        transition: `transform ${EXIT_MS}ms cubic-bezier(.65,0,.35,1), opacity ${EXIT_MS}ms ease-in`,
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: GRAIN_URL,
          backgroundRepeat: 'repeat',
          opacity: 0.045,
          mixBlendMode: 'overlay',
        }}
      />
      <h1
        style={{
          margin: 0,
          textAlign: 'center',
          fontFamily: "'Oswald',sans-serif",
          fontWeight: 200,
          fontSize: 'clamp(34px,8vw,132px)',
          lineHeight: 0.98,
          color: '#ece6da',
          letterSpacing: entered ? '.18em' : '.03em',
          textIndent: entered ? '.18em' : '.03em',
          opacity: entered ? 1 : 0,
          filter: entered ? 'blur(0px)' : 'blur(10px)',
          transition:
            'opacity 600ms ease-out, filter 600ms ease-out, letter-spacing 650ms cubic-bezier(.22,1,.36,1), text-indent 650ms cubic-bezier(.22,1,.36,1)',
        }}
      >
        GOD&apos;S OWN
        <br />
        MOTION PICTURES
      </h1>
      <div
        style={{
          width: entered ? 'clamp(48px,6vw,84px)' : 0,
          height: 1,
          background: '#d4a05a',
          opacity: entered ? 1 : 0,
          transition: 'width 500ms cubic-bezier(.22,1,.36,1) 150ms, opacity 400ms ease-out 150ms',
        }}
      />
      <div
        style={{
          fontSize: 'clamp(9px,.82vw,12px)',
          letterSpacing: '.44em',
          textIndent: '.44em',
          color: '#8f887c',
          opacity: entered ? 1 : 0,
          transform: entered ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 450ms ease-out 350ms, transform 450ms ease-out 350ms',
        }}
      >
        STORIES WRITTEN. WORLDS CREATED.
      </div>
    </div>
  );
}
