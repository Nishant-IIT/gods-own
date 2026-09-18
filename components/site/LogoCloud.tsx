'use client';

import { useEffect, useRef } from 'react';
import { ImageSlot } from '@/components/godsown/overlay/ImageSlot';

type Props = {
  eyebrow?: string;
  subtitle?: string;
  note?: string;
  brands?: string[];
  /** Gap, in ms, between one mark's wipe finishing and the next starting. */
  interval?: number;
};

const DEFAULT_BRANDS = [
  'IDFC FIRST BANK',
  'TRUECALLER',
  'COCA-COLA',
  'KINLEY',
  'UPSTOX',
  'ZARA',
  'TATA MUTUAL FUND',
  'EBAY',
  'BRIDGESTONE',
  "L'ORÉAL INDIA",
  'SUZLON',
  'BIBA',
  'DELTIN',
  'WNS',
  'TRIDENT INDIA',
  'ZEE MUSIC',
];

const DUR = 0.92;
const STAGGER = 0.11;
const ease = (x: number) => x * x * (3 - 2 * x);

/**
 * Ported from LogoCloud.dc.html — a wipe passes across the row on a loop,
 * one mark after another, driven from a single RAF loop (rather than a
 * per-tile CSS animation) so every tile stays on the same beat. Skipped
 * entirely for visitors who have asked for reduced motion.
 */
export function LogoCloud({
  eyebrow = 'BRAND WORK',
  subtitle = "Commercials, brand films and long-form content directed by the studio's founders.",
  note = "DROP EACH BRAND'S OWN LOGO FILE ONTO ITS TILE",
  brands = DEFAULT_BRANDS,
  interval = 3200,
}: Props) {
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const n = brands.length;
    const gap = interval / 1000;
    const cycle = n * STAGGER + DUR + gap;
    let t0: number | null = null;

    let raf = requestAnimationFrame(function loop(now) {
      raf = requestAnimationFrame(loop);
      if (t0 === null) t0 = now;
      const t = ((now - t0) / 1000) % cycle;

      for (let i = 0; i < n; i++) {
        const el = tileRefs.current[i];
        if (!el) continue;
        const u = (t - i * STAGGER) / DUR;
        if (u <= 0 || u >= 1) {
          if (el.dataset.wiping) {
            el.style.clipPath = 'none';
            el.style.filter = 'none';
            el.style.opacity = '1';
            delete el.dataset.wiping;
          }
          continue;
        }
        el.dataset.wiping = '1';
        // out to a full wipe by 40% of the beat, then back
        const k = u < 0.4 ? u / 0.4 : 1 - (u - 0.4) / 0.6;
        const e = ease(k);
        el.style.clipPath = `inset(0 ${(e * 100).toFixed(1)}% 0 0)`;
        el.style.filter = e > 0.02 ? `blur(${(e * 8).toFixed(1)}px)` : 'none';
        el.style.opacity = (1 - e * 0.8).toFixed(3);
      }
    });

    return () => cancelAnimationFrame(raf);
  }, [brands, interval]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(26px,4.4vh,50px)', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px,2vh,20px)' }}>
        <span style={{ fontSize: 'clamp(9px,.72vw,10px)', letterSpacing: '.46em', textIndent: '.46em', color: '#d4a05a' }}>{eyebrow}</span>
        <p style={{ margin: 0, maxWidth: '56ch', fontSize: 'clamp(12px,1.05vw,16px)', lineHeight: 1.7, color: '#b3ab9d', textWrap: 'pretty' }}>{subtitle}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,170px),1fr))', gap: 'clamp(8px,1.2vw,14px)' }}>
        {brands.map((name, i) => (
          <div
            key={name}
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            className="gs-hover-brand"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 'clamp(132px,15vw,172px)',
              padding: 'clamp(14px,1.8vw,22px)',
              background: '#000',
              boxShadow: 'inset 0 0 0 1px rgba(236,230,218,.1)',
              textAlign: 'center',
              willChange: 'clip-path,filter,opacity',
              transition: 'color .45s, box-shadow .45s',
            }}
          >
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: '100%' }}>
              <span style={{ position: 'relative', display: 'block', width: '100%', height: 'clamp(62px,7vw,80px)' }}>
                <ImageSlot alt={name} placeholder="logo" shape="rect" />
              </span>
              <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(10px,.95vw,13px)', lineHeight: 1.25, letterSpacing: '.18em', color: 'inherit' }}>
                {name}
              </span>
            </span>
          </div>
        ))}
      </div>

      <p style={{ margin: 0, fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 10, letterSpacing: '.16em', color: '#8f887c' }}>{note}</p>
    </div>
  );
}
