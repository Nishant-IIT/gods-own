'use client';

import { useEffect, useRef } from 'react';

/**
 * Ported from Footer.dc.html — the shared foot of every site page. The
 * wordmark draws itself in once, then a soft light follows the pointer
 * across it.
 *
 * The reveal effect (footer slides up from under the page rather than just
 * scrolling into place) relies on `clip-path` making this `<footer>` the
 * containing block for its `position: fixed` inner pane — a real, if
 * unusual, piece of CSS, not a rendering hack.
 */
export function Footer() {
  const svgRef = useRef<SVGSVGElement>(null);
  const maskRef = useRef<SVGRadialGradientElement>(null);
  const drawRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let drawRaf = 0;
    const draw = drawRef.current;
    if (draw && !reduced) {
      draw.style.strokeDasharray = '1000';
      draw.style.strokeDashoffset = '1000';
      const t0 = performance.now();
      const step = (now: number) => {
        const u = Math.min(1, (now - t0) / 2600);
        const e = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
        draw.style.strokeDashoffset = String(1000 * (1 - e));
        if (u < 1) drawRaf = requestAnimationFrame(step);
      };
      drawRaf = requestAnimationFrame(step);
    }

    // The reveal light follows the pointer, in the svg's own user units.
    let raf = 0;
    const svg = svgRef.current;
    const mask = maskRef.current;
    let cx = 150;
    let cy = 31;
    let tx = 150;
    let ty = 31;
    let onMove: ((e: MouseEvent) => void) | undefined;
    if (svg && mask) {
      onMove = (e: MouseEvent) => {
        const r = svg.getBoundingClientRect();
        if (!r.width || !r.height) return;
        const inside = e.clientX >= r.left - 60 && e.clientX <= r.right + 60 && e.clientY >= r.top - 60 && e.clientY <= r.bottom + 60;
        if (!inside) {
          tx = 150;
          ty = -140;
          return;
        }
        tx = ((e.clientX - r.left) / r.width) * 300;
        ty = ((e.clientY - r.top) / r.height) * 62;
      };
      window.addEventListener('mousemove', onMove, { passive: true });
      const loop = () => {
        raf = requestAnimationFrame(loop);
        cx += (tx - cx) * 0.14;
        cy += (ty - cy) * 0.14;
        mask.setAttribute('cx', cx.toFixed(1));
        mask.setAttribute('cy', cy.toFixed(1));
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(drawRaf);
      cancelAnimationFrame(raf);
      if (onMove) window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        // The revealed pane is anchored to the bottom of the viewport, so this height is
        // the reveal window: anything taller than the pane's own content shows as dead
        // black above the social row. That content is sized off the wordmark, which is
        // vw-driven — hence a vw-driven height here, not the vh one it used to be.
        height: 'clamp(230px,calc(22vw + 140px),900px)',
        marginTop: 'clamp(24px,4vh,64px)',
        clipPath: 'polygon(0 0,100% 0,100% 100%,0 100%)',
      }}
    >
      <div style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', height: '100%' }}>
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            background: '#000',
            boxShadow: 'inset 0 1px 0 rgba(236,230,218,.1)',
          }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              background: 'radial-gradient(125% 125% at 50% 8%,rgba(0,0,0,0) 46%,rgba(212,160,90,.13) 100%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 2,
              maxWidth: 1320,
              margin: '0 auto',
              width: '100%',
              padding: 'clamp(40px,6vh,72px) clamp(20px,5vw,80px) clamp(18px,3vh,30px)',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 18 }}>
              {/* TODO: swap for the studio's real social handles once they exist.
                  Instagram and YouTube are recognizable public brand marks, not
                  fabricated imagery — their real colors render better than a
                  monochrome glyph, so these are left in full color. */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(14px,2vw,22px)' }}>
                <a
                  href="https://instagram.com/godsownmotionpictures"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="gs-hover-lift"
                  style={{ display: 'inline-flex', width: 26, height: 26, transition: 'transform .25s ease' }}
                >
                  <svg viewBox="0 0 24 24" aria-hidden style={{ width: '100%', height: '100%' }}>
                    <defs>
                      <linearGradient id="gsFooterIgGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#feda75" />
                        <stop offset="30%" stopColor="#fa7e1e" />
                        <stop offset="55%" stopColor="#d62976" />
                        <stop offset="80%" stopColor="#962fbf" />
                        <stop offset="100%" stopColor="#4f5bd5" />
                      </linearGradient>
                    </defs>
                    <rect x={1.5} y={1.5} width={21} height={21} rx={6} fill="url(#gsFooterIgGradient)" />
                    <rect x={6.3} y={6.3} width={11.4} height={11.4} rx={3.4} fill="none" stroke="#fff" strokeWidth={1.4} />
                    <circle cx={12} cy={12} r={3.4} fill="none" stroke="#fff" strokeWidth={1.4} />
                    <circle cx={16.1} cy={7.9} r={0.9} fill="#fff" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com/@godsownmotionpictures"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="gs-hover-lift"
                  style={{ display: 'inline-flex', width: 26, height: 26, transition: 'transform .25s ease' }}
                >
                  <svg viewBox="0 0 24 24" aria-hidden style={{ width: '100%', height: '100%' }}>
                    <path
                      d="M22.5 7.2c-.25-1.1-1.13-1.96-2.24-2.21C18.3 4.5 12 4.5 12 4.5s-6.3 0-8.26.49C2.63 5.24 1.75 6.1 1.5 7.2 1 9.14 1 12 1 12s0 2.86.5 4.8c.25 1.1 1.13 1.96 2.24 2.21C5.7 19.5 12 19.5 12 19.5s6.3 0 8.26-.49c1.11-.25 1.99-1.11 2.24-2.21.5-1.94.5-4.8.5-4.8s0-2.86-.5-4.8z"
                      fill="#ff0000"
                    />
                    <path d="M9.8 15.3V8.7l5.8 3.3-5.8 3.3z" fill="#fff" />
                  </svg>
                </a>
              </div>
              <span style={{ fontSize: 9, letterSpacing: '.3em', color: '#8f887c' }}>© {new Date().getFullYear()} GOD&apos;S OWN MOTION PICTURES</span>
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 1, width: '100%', lineHeight: 0 }}>
            <svg
              ref={svgRef}
              width="100%"
              viewBox="0 0 300 62"
              preserveAspectRatio="none"
              aria-hidden
              style={{ display: 'block', width: '100%', aspectRatio: '300/62', userSelect: 'none' }}
            >
              <defs>
                <linearGradient id="gsFooterInk" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="300" y2="100">
                  <stop offset="0%" stopColor="#d4a05a" />
                  <stop offset="50%" stopColor="#ece6da" />
                  <stop offset="100%" stopColor="#d4a05a" />
                </linearGradient>
                <radialGradient ref={maskRef} id="gsFooterReveal" gradientUnits="userSpaceOnUse" r={40} cx={150} cy={31}>
                  <stop offset="0%" stopColor="white" />
                  <stop offset="100%" stopColor="black" />
                </radialGradient>
                <mask id="gsFooterMask">
                  <rect x={-30} y={-30} width={360} height={122} fill="url(#gsFooterReveal)" />
                </mask>
              </defs>

              <text
                x={150}
                y={34}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="none"
                stroke="rgba(236,230,218,.14)"
                strokeWidth={0.35}
                textLength={296}
                lengthAdjust="spacingAndGlyphs"
                style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 58 }}
              >
                GOD&apos;S OWN
              </text>

              <text
                ref={drawRef}
                x={150}
                y={34}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="none"
                stroke="rgba(212,160,90,.42)"
                strokeWidth={0.35}
                textLength={296}
                lengthAdjust="spacingAndGlyphs"
                style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 58 }}
              >
                GOD&apos;S OWN
              </text>

              <text
                x={150}
                y={34}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="none"
                stroke="url(#gsFooterInk)"
                strokeWidth={0.6}
                mask="url(#gsFooterMask)"
                textLength={296}
                lengthAdjust="spacingAndGlyphs"
                style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 58 }}
              >
                GOD&apos;S OWN
              </text>
            </svg>
            <div
              style={{
                textAlign: 'center',
                marginTop: 'clamp(-80px,-3.22vw,-10px)',
                fontFamily: "'Oswald',sans-serif",
                fontWeight: 200,
                fontSize: '3.53vw',
                lineHeight: 'normal',
                letterSpacing: '.5em',
                color: '#8f887c',
              }}
            >
              MOTION PICTURES
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
