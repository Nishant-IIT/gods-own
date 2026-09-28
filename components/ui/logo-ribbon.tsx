'use client';

import Image from 'next/image';
import { useEffect, useRef, type CSSProperties } from 'react';
import { BRANDS, type Brand } from '@/components/site/data/brands';

const MUTED = '#b3ab9d';
const DIM = '#8f887c';
const ACCENT = '#d4a05a';

/** Height of the logo well inside each cell; every mark is contained within it. */
const MARK_HEIGHT = 'clamp(30px,3.6vw,46px)';

/** Drift, in px per second. Slow enough to read a mark without chasing it. */
const DRIFT = 34;

/**
 * How far from the cursor, in px, a mark still answers at all.
 *
 * Tuned against the ~196px cell pitch so the response spans a couple of marks
 * either side rather than picking out one: at this radius the mark under the
 * cursor weighs 1, its neighbours 0.37, the next pair 0.01, and everything
 * beyond exactly 0. Widen it and the whole row lifts as one; tighten it and
 * this stops being proximity and becomes plain hover.
 */
const RADIUS = 520;

/**
 * Width of the gaussian bell, as a share of `RADIUS`. Well inside the radius on
 * purpose: the bell does the shaping and the window only closes the tail, so
 * the mark under the cursor leads clearly instead of dragging its neighbours up
 * with it.
 */
const SIGMA = RADIUS * 0.34;

/** Rest opacity. Marks sit back until the cursor asks one forward. */
const REST_OPACITY = 0.5;
const LIFT = 7;
const GROWTH = 0.26;

/** Seconds to ease between drifting and held — a hard stop reads as a stutter. */
const EASE = 0.12;

/**
 * Proximity weight for one mark: a gaussian bell, windowed by a smoothstep so
 * it reaches exactly zero at `RADIUS` instead of trailing off forever.
 *
 * The window is what makes this usable. A bare gaussian never quite reaches
 * zero, so every mark in the ribbon sits fractionally scaled and the whole row
 * shimmers as the cursor moves; multiplying by `smoothstep` gives the kernel
 * compact support, and marks outside the radius are left exactly alone.
 */
function proximity(distance: number) {
  if (distance >= RADIUS) return 0;
  const t = 1 - distance / RADIUS;
  const window = t * t * (3 - 2 * t);
  const bell = Math.exp(-(distance * distance) / (2 * SIGMA * SIGMA));
  return window * bell;
}

type Props = {
  eyebrow?: string;
  subtitle?: string;
  brands?: Brand[];
  className?: string;
  style?: CSSProperties;
};

/**
 * The brand ribbon — client marks drifting in a continuous loop, holding when
 * the cursor enters, and answering to its proximity with a smoothstep-windowed
 * gaussian (see `proximity` above).
 *
 * The marks are still a credit list rather than controls, which is why none of
 * them is a link, none takes a border or a pointer cursor, and the whole strip
 * is `cursor: default`. Proximity lights a mark up; it never offers a click.
 *
 * The row is rendered twice. The second copy is `aria-hidden` and exists only
 * so the loop has something to wrap onto — the track resets by exactly one
 * copy's width, which puts the first copy back where the second was, with no
 * seam to see.
 *
 * Motion is driven from one rAF loop writing transforms directly, never React
 * state: at ~32 marks a re-render per frame would be hopeless. Positions are
 * measured once per layout so the loop stays pure arithmetic and never reads
 * back from the DOM.
 *
 * Marks are shown in their true colours, straight on the page with no plate
 * behind them.
 *
 * Inline-styled rather than utility-classed: this site ships without
 * Tailwind's layer (see app/globals.css), so classNames would be inert.
 */
export function LogoRibbon({
  eyebrow = 'BRAND WORK',
  subtitle = "Commercials, brand films and long-form content directed by the studio's founders.",
  brands = BRANDS,
  className,
  style,
}: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const markRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cellRefs = useRef<(HTMLLIElement | null)[]>([]);
  const pointerRef = useRef<number | null>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    // The global `prefers-reduced-motion` rule in app/globals.css only stops CSS
    // animation; this loop is rAF, so it has to bow out on its own. It leaves
    // the ribbon parked, and `.gs-ribbon` makes it scrollable to compensate.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // A coarse pointer has no hover to pause on and no cursor to be near, so
    // touch gets the drift and nothing else.
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    let offset = 0;
    let speed = DRIFT;
    // One copy's width — the distance the track travels before it has scrolled
    // itself exactly onto its own repeat.
    let span = 0;
    // Layout, cached per resize: the loop must not read the DOM per frame.
    let centres: number[] = [];
    let raf = 0;
    let last = performance.now();

    function measure() {
      const cells = cellRefs.current;
      const first = cells[0];
      const repeat = cells[brands.length];
      if (!first || !repeat) return;
      span = repeat.offsetLeft - first.offsetLeft;
      centres = cells.map((cell) => (cell ? cell.offsetLeft + cell.offsetWidth / 2 : 0));
    }

    function frame(now: number) {
      // Seconds, clamped: a backgrounded tab returns one enormous delta, which
      // would otherwise fling the ribbon most of the way round in a single step.
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const pointer = pointerRef.current;
      const target = pointer === null ? DRIFT : 0;
      speed += (target - speed) * Math.min(1, dt / EASE);

      if (span > 0) {
        offset -= speed * dt;
        if (offset <= -span) offset += span;
        track!.style.transform = `translate3d(${offset.toFixed(2)}px,0,0)`;
      }

      for (let i = 0; i < markRefs.current.length; i += 1) {
        const mark = markRefs.current[i];
        if (!mark) continue;
        const base = Number(mark.dataset.scale) || 1;
        const weight = pointer === null ? 0 : proximity(Math.abs(centres[i] + offset - pointer));
        mark.style.opacity = (REST_OPACITY + (1 - REST_OPACITY) * weight).toFixed(3);
        mark.style.transform = `translate3d(0,${(-LIFT * weight).toFixed(2)}px,0) scale(${(base * (1 + GROWTH * weight)).toFixed(4)})`;
      }

      raf = requestAnimationFrame(frame);
    }

    function onPointerMove(event: PointerEvent) {
      // Read the rect here rather than in the loop: once per pointer event is
      // cheap, once per frame per mark is a layout thrash.
      pointerRef.current = event.clientX - viewport!.getBoundingClientRect().left;
    }

    function onPointerLeave() {
      pointerRef.current = null;
    }

    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(track);

    // This page runs to several thousand pixels and the ribbon sits near the
    // end of it, so left alone the loop would drive 32 marks for minutes while
    // nothing was on screen. Parked off-screen, it costs nothing, and the drift
    // resumes from where it left off rather than jumping.
    const onScreen = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !raf) {
          last = performance.now();
          raf = requestAnimationFrame(frame);
        } else if (!entry.isIntersecting && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
          pointerRef.current = null;
        }
      },
      { rootMargin: '200px 0px' },
    );
    onScreen.observe(viewport);

    if (fine) {
      viewport.addEventListener('pointermove', onPointerMove);
      viewport.addEventListener('pointerleave', onPointerLeave);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      resize.disconnect();
      onScreen.disconnect();
      viewport.removeEventListener('pointermove', onPointerMove);
      viewport.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [brands.length]);

  // Twice through, so the loop has a repeat to wrap onto.
  const run = [...brands, ...brands];

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(26px,4.4vh,50px)',
        width: '100%',
        textAlign: 'center',
        ...style,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px,2vh,20px)' }}>
        <span style={{ fontSize: 'clamp(9px,.72vw,10px)', letterSpacing: '.46em', textIndent: '.46em', color: ACCENT }}>
          {eyebrow}
        </span>
        <p style={{ margin: 0, maxWidth: '56ch', fontSize: 'clamp(12px,1.05vw,16px)', lineHeight: 1.7, color: MUTED, textWrap: 'balance' }}>
          {subtitle}
        </p>
      </div>

      <div
        ref={viewportRef}
        className="gs-ribbon"
        style={{
          position: 'relative',
          // Bleeds the strip past the 1180px column it sits in, so marks enter
          // and leave at the window edge rather than at an invisible boundary.
          // The parent centres its children, so a child wider than the column
          // simply overhangs it evenly — which is the bleed, with no negative
          // margin to keep in step with the column width. `body` already hides
          // horizontal overflow, so 100vw is safe next to a classic scrollbar.
          alignSelf: 'center',
          width: '100vw',
          // Clipping and the reduced-motion escape hatch live in `.gs-ribbon`.
          cursor: 'default',
          // Feathers both ends instead of guillotining a mark mid-stroke.
          maskImage: 'linear-gradient(90deg,transparent,#000 9%,#000 91%,transparent)',
          WebkitMaskImage: 'linear-gradient(90deg,transparent,#000 9%,#000 91%,transparent)',
        }}
      >
        <ul
          ref={trackRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(10px,2vw,30px)',
            width: 'max-content',
            margin: 0,
            padding: 0,
            listStyle: 'none',
            willChange: 'transform',
          }}
        >
          {run.map((brand, i) => {
            const repeat = i >= brands.length;
            return (
              <li
                key={`${brand.name}-${i}`}
                ref={(el) => {
                  cellRefs.current[i] = el;
                }}
                // The repeat is scenery for the loop; one reading of the client
                // list is enough for a screen reader.
                aria-hidden={repeat || undefined}
                data-repeat={repeat || undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: '0 0 auto',
                  width: 'clamp(118px,13vw,166px)',
                  height: 'clamp(76px,9vw,104px)',
                  padding: 'clamp(12px,1.6vw,22px)',
                  boxSizing: 'border-box',
                }}
              >
                <span
                  ref={(el) => {
                    markRefs.current[i] = el;
                  }}
                  data-scale={brand.scale ?? 1}
                  style={{
                    position: 'relative',
                    display: 'block',
                    width: '100%',
                    height: MARK_HEIGHT,
                    opacity: REST_OPACITY,
                    transform: `scale(${brand.scale ?? 1})`,
                    willChange: 'transform, opacity',
                  }}
                >
                  {brand.src ? (
                    <Image
                      src={brand.src}
                      alt={repeat ? '' : `${brand.name} logo`}
                      fill
                      sizes="170px"
                      // SVG is served untouched: the optimizer refuses it unless
                      // `images.dangerouslyAllowSVG` is on, and these are our own
                      // static files under public/.
                      unoptimized
                      style={{ objectFit: 'contain' }}
                    />
                  ) : (
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        fontFamily: "'Oswald',sans-serif",
                        fontWeight: 300,
                        fontSize: 'clamp(13px,1.4vw,18px)',
                        letterSpacing: '.14em',
                        color: '#ece6da',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {brand.name}
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <p style={{ margin: 0, fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 10, letterSpacing: '.16em', color: DIM }}>
        BRAND MARKS SHOWN FOR CREDIT ONLY — EACH REMAINS THE PROPERTY OF ITS OWNER
      </p>
    </div>
  );
}
