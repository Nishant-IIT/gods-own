'use client';

import { useEffect, useRef } from 'react';
import { ImageSlot } from '@/components/godsown/overlay/ImageSlot';
import type { FrameName } from '@/content/frames';

type HeroItem = { label: string; ph?: string };

type Props = {
  eyebrow?: string;
  title?: string;
  sub?: string;
  hint?: string;
  items: HeroItem[];
  /** Scroll span the assembly animation plays across. */
  tall?: string;
};

type CellPlacement = readonly [colStart: number, colSpan: number, rowStart: number, rowSpan: number];

// Cell placement on an 8-column, 4-row field.
const WIDE: (CellPlacement | null)[] = [
  [1, 6, 1, 3],
  [7, 2, 1, 2],
  [7, 2, 3, 2],
  [1, 3, 4, 1],
  [4, 3, 4, 1],
];
const NARROW: (CellPlacement | null)[] = [
  [1, 8, 1, 3],
  null,
  null,
  [1, 4, 4, 1],
  [5, 4, 4, 1],
];
const ORIGIN = ['top right', 'center', 'bottom right', 'top right', 'center'];

/**
 * Frame per cell. Worked against the `1fr 0.5fr 0.5fr 1fr` rows the placements
 * land on, cells 0, 3 and 4 come out near 16:9 while the two right-hand cells
 * come out near 4:5 — so each asks ImageKit for the master that crops into its
 * own shape with the least thrown away.
 */
const CELL_FRAMES: FrameName[] = ['cinematic', 'editorial', 'editorial', 'cinematic', 'cinematic'];

/**
 * `sizes` per cell, read straight off the placements above: a cell spanning n
 * of the 8 columns is drawn at roughly n/8 of the viewport. Cells 1 and 2 drop
 * out below 768px, so their narrow branch is moot and they keep the wide share.
 */
const CELL_SIZES = WIDE.map((wide, i) => {
  const share = (p: CellPlacement | null) => `${Math.round((((p ?? wide)![1]) / 8) * 100)}vw`;
  return `(max-width: 767px) ${share(NARROW[i])}, ${share(wide)}`;
});

const ease = (x: number) => x * x * (3 - 2 * x);

/**
 * Ported from GalleryHero.dc.html — a bento gallery that assembles itself as
 * the hero title recedes. Progress is read from this block's own scroll
 * span (its rendered height minus one viewport) rather than a fixed
 * duration, so it plays correctly regardless of section height.
 */
export function GalleryHero({ eyebrow = 'PROOF', title = 'SELECTED WORK', sub = '', hint = 'SCROLL', items, tall = '260vh' }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const centreRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLSpanElement>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);

  const cells = items.slice(0, 5);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let laidOutWide: boolean | null = null;
    let laidOutAt = -1;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    function layout() {
      if (window.innerWidth < 2) {
        clearTimeout(retryTimer);
        retryTimer = setTimeout(() => {
          layout();
          tick();
        }, 120);
        return;
      }
      const wide = window.innerWidth >= 768;
      if (laidOutWide === wide && laidOutAt === window.innerWidth) return;
      laidOutWide = wide;
      laidOutAt = window.innerWidth;
      const grid = gridRef.current;
      if (grid) {
        grid.style.gridTemplateColumns = 'repeat(8,1fr)';
        grid.style.gridTemplateRows = '1fr 0.5fr 0.5fr 1fr';
      }
      const plan = wide ? WIDE : NARROW;
      plan.forEach((p, i) => {
        const el = cellRefs.current[i];
        if (!el) return;
        if (!p) {
          el.style.display = 'none';
          return;
        }
        el.style.display = 'block';
        el.style.gridColumn = `${p[0]} / span ${p[1]}`;
        el.style.gridRow = `${p[2]} / span ${p[3]}`;
        el.style.transformOrigin = ORIGIN[i];
      });
    }

    function tick() {
      const sc = scrollRef.current;
      const centre = centreRef.current;
      if (!sc || !centre) return;
      if (laidOutAt !== window.innerWidth) layout();

      const r = sc.getBoundingClientRect();
      const offsetParent = sc.offsetParent as HTMLElement | null;
      const host = offsetParent && offsetParent.scrollHeight > offsetParent.clientHeight + 4 ? offsetParent : null;
      const top = host ? sc.offsetTop - host.scrollTop : r.top;
      const vh = host ? host.clientHeight : window.innerHeight;
      const span = Math.max(1, r.height - vh);
      const p = reduced ? 1 : Math.min(1, Math.max(0, -top / span));

      const a = ease(Math.min(1, Math.max(0, (p - 0.1) / 0.8)));
      const scale = 0.5 + 0.5 * ease(Math.min(1, p / 0.9));
      const tx = (-35 + 35 * a).toFixed(2);
      for (const el of cellRefs.current) {
        if (!el || el.style.display === 'none') continue;
        el.style.transform = `translateX(${tx}%) scale(${scale.toFixed(3)})`;
      }

      const out = Math.min(1, p / 0.5);
      centre.style.opacity = (1 - out).toFixed(3);
      centre.style.transform = `translate(-50%,-50%) scale(${(1 - 0.72 * ease(out)).toFixed(3)})`;
      if (hintRef.current) hintRef.current.style.opacity = (1 - Math.min(1, p * 8)).toFixed(3);
    }

    layout();
    const onResize = () => {
      layout();
      tick();
    };
    window.addEventListener('resize', onResize);
    const onScroll = () => tick();
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    const onVis = () => {
      if (!document.hidden) {
        layout();
        tick();
      }
    };
    document.addEventListener('visibilitychange', onVis);

    let raf = requestAnimationFrame(function loop() {
      raf = requestAnimationFrame(loop);
      tick();
    });
    // A frame that never receives a scroll or resize event still lays out and positions.
    const poll = setInterval(() => {
      layout();
      tick();
    }, 400);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(retryTimer);
      clearInterval(poll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll, { capture: true } as EventListenerOptions);
      document.removeEventListener('visibilitychange', onVis);
    };
    // Mirrors the design canvas's mount/unmount lifecycle — `items` is static per page.
  }, []);

  return (
    <div ref={scrollRef} style={{ position: 'relative', width: '100%', height: tall }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100%',
          padding: 'clamp(70px,11vh,110px) clamp(10px,1.6vw,18px) clamp(14px,2vh,22px)',
          boxSizing: 'border-box',
        }}
      >
        <div ref={gridRef} style={{ position: 'relative', display: 'grid', gap: 'clamp(8px,1vw,16px)', width: '100%', height: '100%' }}>
          {cells.map((c, i) => (
            <div
              key={c.label || i}
              ref={(el) => {
                cellRefs.current[i] = el;
              }}
              style={{
                position: 'relative',
                overflow: 'hidden',
                background: '#0a0a0a',
                boxShadow: 'inset 0 0 0 1px rgba(236,230,218,.12)',
                willChange: 'transform',
              }}
            >
              <ImageSlot
                alt={c.label || c.ph || 'Still'}
                placeholder={c.ph || `${c.label || `Still ${i + 1}`} — still`}
                shape="rect"
                frame={CELL_FRAMES[i]}
                sizes={CELL_SIZES[i]}
                style={{ position: 'absolute', inset: 0 }}
              />
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: 'clamp(10px,1.2vw,18px)',
                  background: 'linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,.78))',
                  fontSize: 'clamp(8px,.68vw,10px)',
                  letterSpacing: '.26em',
                  color: '#b3ab9d',
                  pointerEvents: 'none',
                }}
              >
                {c.label}
              </span>
            </div>
          ))}
        </div>

        <div
          ref={centreRef}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'clamp(16px,2.6vh,30px)',
            width: 'min(92%,900px)',
            textAlign: 'center',
            pointerEvents: 'none',
            willChange: 'transform,opacity',
          }}
        >
          <span style={{ fontSize: 'clamp(9px,.72vw,10px)', letterSpacing: '.46em', textIndent: '.46em', color: '#d4a05a' }}>{eyebrow}</span>
          <h1
            style={{
              margin: 0,
              fontFamily: "'Oswald',sans-serif",
              fontWeight: 200,
              fontSize: 'clamp(32px,7vw,116px)',
              lineHeight: 1,
              letterSpacing: '.08em',
              textIndent: '.08em',
              color: '#ece6da',
              textShadow: '0 2px 40px rgba(0,0,0,.85)',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              margin: 0,
              maxWidth: '52ch',
              fontSize: 'clamp(12px,1.1vw,17px)',
              lineHeight: 1.7,
              color: '#ece6da',
              textShadow: '0 1px 24px rgba(0,0,0,.9)',
              textWrap: 'pretty',
            }}
          >
            {sub}
          </p>
          <span ref={hintRef} style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 10, letterSpacing: '.18em', color: '#8f887c' }}>
            {hint}
          </span>
        </div>
      </div>
    </div>
  );
}
