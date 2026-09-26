'use client';

import { useEffect, useRef } from 'react';

type SocialKind = 'instagram' | 'youtube' | 'email';
type SocialLink = { label: string; href: string; kind: SocialKind };

const SOCIAL: SocialLink[] = [
  { label: 'INSTAGRAM', href: '#', kind: 'instagram' },
  { label: 'YOUTUBE', href: '#', kind: 'youtube' },
  { label: 'EMAIL', href: 'mailto:hello@godsownmotionpictures.com', kind: 'email' },
];

/** Instagram and YouTube are recognizable public brand marks, not fabricated imagery — their usual colors render better than a monochrome glyph. */
function SocialGlyph({ kind }: { kind: SocialKind }) {
  if (kind === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <defs>
          <linearGradient id="gsIgGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#feda75" />
            <stop offset="30%" stopColor="#fa7e1e" />
            <stop offset="55%" stopColor="#d62976" />
            <stop offset="80%" stopColor="#962fbf" />
            <stop offset="100%" stopColor="#4f5bd5" />
          </linearGradient>
        </defs>
        <rect x={2} y={2} width={20} height={20} rx={6} fill="url(#gsIgGradient)" />
        <circle cx={12} cy={12} r={5} fill="none" stroke="#fff" strokeWidth={1.6} />
        <circle cx={17.6} cy={6.4} r={1.1} fill="#fff" />
      </svg>
    );
  }
  if (kind === 'youtube') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <rect x={1.5} y={4.5} width={21} height={15} rx={4.5} fill="#ff0000" />
        <path d="M10 9v6l5.5-3-5.5-3z" fill="#fff" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#d4a05a" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x={2.5} y={5} width={19} height={14} rx={2.5} />
      <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
    </svg>
  );
}

/**
 * Ported from Footer.dc.html — the shared foot of every site page. The
 * wordmark draws itself in once, then a soft light follows the pointer
 * across it; each social link's icon rises out of its label on hover.
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
  const socialRefs = useRef<{ link: HTMLAnchorElement | null; icon: HTMLSpanElement | null }[]>(
    SOCIAL.map(() => ({ link: null, icon: null })),
  );

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const hideIcon = (icon: HTMLSpanElement) => {
      icon.style.transition = 'transform .2s ease, opacity .2s, filter .2s';
      icon.style.transform = 'translateY(-6px)';
      icon.style.filter = 'blur(2px)';
      icon.style.opacity = '0';
    };

    // An icon rises out of the label on hover, at a slight random tilt, while its siblings dim.
    function hoverSocial(i: number, on: boolean) {
      if (reduced) return;
      socialRefs.current.forEach((r, j) => {
        if (r.link) r.link.style.opacity = on && j !== i ? '0.5' : '1';
        const icon = r.icon;
        if (!icon) return;
        if (j !== i || !on) {
          hideIcon(icon);
          return;
        }
        const rot = (Math.random() * 20 - 10).toFixed(1);
        icon.style.transition = 'none';
        icon.style.transform = `translateY(-6px) rotate(${rot}deg)`;
        icon.style.filter = 'blur(2px)';
        icon.style.opacity = '0';
        requestAnimationFrame(() => {
          icon.style.transition = 'transform .24s cubic-bezier(.16,1,.3,1), opacity .24s, filter .24s';
          icon.style.transform = `translateY(-16px) rotate(${rot}deg)`;
          icon.style.filter = 'none';
          icon.style.opacity = '1';
        });
      });
    }

    const hoverHandlers = socialRefs.current.map((r, i) => {
      const enter = () => hoverSocial(i, true);
      const leave = () => hoverSocial(i, false);
      r.link?.addEventListener('mouseenter', enter);
      r.link?.addEventListener('mouseleave', leave);
      return { link: r.link, enter, leave };
    });

    // A click anywhere gives the lifted icon a short bounce.
    const onClick = () => {
      if (reduced) return;
      socialRefs.current.forEach((r) => {
        const icon = r.icon;
        if (!icon || icon.style.opacity !== '1') return;
        const base = icon.style.transform.replace(/ scale\([^)]*\)/, '');
        icon.style.transform = `${base} scale(1.3)`;
        setTimeout(() => {
          icon.style.transform = base;
        }, 200);
      });
    };
    window.addEventListener('click', onClick);

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
      window.removeEventListener('click', onClick);
      if (onMove) window.removeEventListener('mousemove', onMove);
      hoverHandlers.forEach(({ link, enter, leave }) => {
        link?.removeEventListener('mouseenter', enter);
        link?.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        height: 'clamp(460px,64vh,620px)',
        marginTop: 'clamp(40px,7vh,90px)',
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
              padding: 'clamp(96px,12vh,140px) clamp(20px,5vw,80px) clamp(18px,3vh,30px)',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 18 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(4px,1vw,14px)' }}>
                {SOCIAL.map((s, i) => (
                  <a
                    key={s.label}
                    ref={(el) => {
                      socialRefs.current[i].link = el;
                    }}
                    href={s.href}
                    aria-label={s.label}
                    className="gs-hover-accent"
                    style={{
                      position: 'relative',
                      display: 'inline-flex',
                      alignItems: 'center',
                      minHeight: 44,
                      padding: '0 clamp(6px,1vw,12px)',
                      fontSize: 10,
                      letterSpacing: '.3em',
                      color: '#8f887c',
                      transition: 'color .4s, opacity .25s',
                    }}
                  >
                    <span
                      ref={(el) => {
                        socialRefs.current[i].icon = el;
                      }}
                      aria-hidden
                      style={{
                        position: 'absolute',
                        left: '50%',
                        bottom: '100%',
                        width: 'clamp(44px,4.6vw,56px)',
                        height: 'clamp(44px,4.6vw,56px)',
                        marginLeft: 'calc(clamp(44px,4.6vw,56px) / -2)',
                        opacity: 0,
                        pointerEvents: 'none',
                        willChange: 'transform, opacity, filter',
                      }}
                    >
                      <SocialGlyph kind={s.kind} />
                    </span>
                    <span>{s.label}</span>
                  </a>
                ))}
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
