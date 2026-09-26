'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { ImageSlot } from '@/components/godsown/overlay/ImageSlot';

type CarouselItem = { title: string; status: string; href: string; ph?: string };

type Props = {
  items: CarouselItem[];
  /** Cylinder radius, in px, clamped to the viewport at layout time. */
  radius?: number;
  /** Idle auto-rotation, in degrees per frame at 60fps. */
  autoRotate?: number;
};

const CARD_W = 'clamp(132px,20vw,240px)';

/**
 * Ported from PosterCarousel.dc.html — a 3D cylinder of poster cards, turned
 * by drag, horizontal wheel/trackpad swipe, or arrow keys, with momentum and
 * a slow idle drift. Rotation is driven by this stage's own visibility, not
 * document scroll, so it never needs a tall spacer and never fights the page.
 */
export function PosterCarousel({ items, radius = 560, autoRotate = 0.035 }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const n = items.length;
    const angle = 360 / n;

    let laidOutAt = -1;
    let cylRadius = radius;
    let rot = 0;
    let drift = 0;
    let manual = 0;
    let vel = 0;
    let dragging = false;
    let moved = 0;
    let px = 0;
    let suppressClick = 0;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    function layout() {
      if (window.innerWidth < 2) {
        clearTimeout(retryTimer);
        retryTimer = setTimeout(() => {
          layout();
          tick(1);
        }, 120);
        return;
      }
      const w = Math.min(window.innerWidth, 1600);
      cylRadius = Math.max(190, Math.min(radius, w * 0.42));
      laidOutAt = window.innerWidth;
      for (let i = 0; i < n; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        el.style.transform = `rotateY(${(i * angle).toFixed(2)}deg) translateZ(${cylRadius.toFixed(0)}px)`;
      }
    }

    function tick(dt: number) {
      const stage = stageRef.current;
      const ring = ringRef.current;
      if (!stage || !ring) return;
      if (laidOutAt !== window.innerWidth) layout();

      const r = stage.getBoundingClientRect();
      if (r.bottom < -200 || r.top > window.innerHeight + 200) return;

      if (!dragging && Math.abs(vel) > 0.01) {
        manual += vel * dt;
        vel *= Math.pow(0.94, dt);
      }
      const idle = !dragging && Math.abs(vel) < 0.05;
      if (!reduced && idle) drift += autoRotate * dt;
      rot = manual + drift;
      ring.style.transform = `rotateY(${rot.toFixed(2)}deg)`;

      for (let i = 0; i < n; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const rel = (((i * angle + rot) % 360) + 360) % 360;
        const off = rel > 180 ? 360 - rel : rel;
        el.style.opacity = Math.max(0.22, 1 - off / 168).toFixed(3);
        el.style.zIndex = String(Math.round(400 - off));
        el.style.pointerEvents = off < 42 ? 'auto' : 'none';
      }
    }

    layout();
    const onResize = () => {
      layout();
      tick(1);
    };
    window.addEventListener('resize', onResize);
    const onScroll = () => tick(1);
    window.addEventListener('scroll', onScroll, { passive: true });
    const onVis = () => {
      if (!document.hidden) {
        layout();
        tick(1);
      }
    };
    document.addEventListener('visibilitychange', onVis);

    // Turned by hand: drag left/right, or a horizontal wheel/trackpad swipe.
    // Vertical page scrolling is left alone so the carousel never hijacks it.
    const stage = stageRef.current;
    let cleanupDrag = () => {};
    if (stage) {
      stage.style.touchAction = 'pan-y';
      stage.style.cursor = 'grab';
      const deg = (dx: number) => dx * 0.32;
      const clientX = (e: MouseEvent | TouchEvent) => ('touches' in e ? e.touches[0].clientX : e.clientX);

      const down = (e: MouseEvent | TouchEvent) => {
        if ('button' in e && e.button !== 0) return;
        dragging = true;
        moved = 0;
        px = clientX(e);
        vel = 0;
        stage.style.cursor = 'grabbing';
      };
      const move = (e: MouseEvent | TouchEvent) => {
        if (!dragging) return;
        const x = clientX(e);
        const dx = x - px;
        px = x;
        moved += Math.abs(dx);
        manual += deg(dx);
        vel = deg(dx);
        if (e.cancelable && Math.abs(moved) > 6) e.preventDefault();
        tick(1);
      };
      const up = () => {
        if (!dragging) return;
        dragging = false;
        stage.style.cursor = 'grab';
        // A click that never travelled should still follow the poster's link.
        if (moved > 6) suppressClick = Date.now();
      };

      stage.addEventListener('mousedown', down);
      window.addEventListener('mousemove', move, { passive: false });
      window.addEventListener('mouseup', up);
      stage.addEventListener('touchstart', down, { passive: true });
      stage.addEventListener('touchmove', move, { passive: false });
      window.addEventListener('touchend', up);

      const onClickCapture = (e: MouseEvent) => {
        if (suppressClick && Date.now() - suppressClick < 250) {
          e.preventDefault();
          e.stopPropagation();
        }
      };
      stage.addEventListener('click', onClickCapture, true);

      // Horizontal wheel / trackpad swipe turns it; vertical is left to the page.
      const onWheel = (e: WheelEvent) => {
        if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
        e.preventDefault();
        manual -= e.deltaX * 0.18;
        vel = -e.deltaX * 0.18;
        tick(1);
      };
      stage.addEventListener('wheel', onWheel, { passive: false });

      stage.setAttribute('tabindex', '0');
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        e.preventDefault();
        manual += (e.key === 'ArrowRight' ? -1 : 1) * angle;
        tick(1);
      };
      stage.addEventListener('keydown', onKeyDown);

      cleanupDrag = () => {
        stage.removeEventListener('mousedown', down);
        window.removeEventListener('mousemove', move);
        window.removeEventListener('mouseup', up);
        stage.removeEventListener('touchstart', down);
        stage.removeEventListener('touchmove', move);
        window.removeEventListener('touchend', up);
        stage.removeEventListener('click', onClickCapture, true);
        stage.removeEventListener('wheel', onWheel);
        stage.removeEventListener('keydown', onKeyDown);
      };
    }

    let last = performance.now();
    let raf = requestAnimationFrame(function loop(now) {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(50, now - last) / 16.67;
      last = now;
      tick(dt);
    });
    // A tab that never receives a frame still lays out and positions.
    const poll = setInterval(() => {
      if (performance.now() - last > 400) {
        last = performance.now();
        tick(1);
      }
    }, 400);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(retryTimer);
      clearInterval(poll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVis);
      cleanupDrag();
    };
    // Mirrors the design canvas's mount/unmount lifecycle — `items` is static per page.
  }, [items, radius, autoRotate]);

  return (
    <div
      ref={stageRef}
      role="region"
      aria-label="Poster carousel"
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(300px,44vw,560px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        perspective: '2000px',
      }}
    >
      <div ref={ringRef} style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d', willChange: 'transform' }}>
        {items.map((c, i) => (
          <Link
            key={c.title}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            href={c.href}
            aria-label={c.title}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: CARD_W,
              aspectRatio: '2/3',
              marginLeft: `calc(${CARD_W} / -2)`,
              marginTop: `calc(${CARD_W} * 1.5 / -2)`,
              color: '#ece6da',
              willChange: 'transform, opacity',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                background: '#0a0a0a',
                boxShadow: 'inset 0 0 0 1px rgba(236,230,218,.14), 0 24px 60px rgba(0,0,0,.6)',
              }}
            >
              <ImageSlot alt={c.title} placeholder={c.ph || `${c.title} — poster (2:3)`} shape="rect" style={{ position: 'absolute', inset: 0 }} />
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  padding: 'clamp(12px,1.4vw,20px)',
                  background: 'linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,.82))',
                  pointerEvents: 'none',
                }}
              >
                <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(12px,1.25vw,20px)', lineHeight: 1.1, letterSpacing: '.06em', color: '#ece6da' }}>
                  {c.title}
                </span>
                <span style={{ fontSize: 9, letterSpacing: '.26em', color: '#d4a05a' }}>{c.status}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
