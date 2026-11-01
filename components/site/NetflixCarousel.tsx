'use client';

import type { PointerEvent as ReactPointerEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ImageSlot } from '@/components/godsown/overlay/ImageSlot';
import { FRAMES, type FrameName } from '@/content/frames';

export type CarouselSlide = {
  title: string;
  meta?: string;
  placeholder: string;
};

type Props = {
  slides: CarouselSlide[];
  frame?: FrameName;
  /** Milliseconds between automatic slides. */
  interval?: number;
};

const SWIPE_THRESHOLD = 60;

/**
 * A full-bleed, auto-advancing image rail — the next slide takes over every
 * `interval` on its own, and a drag or swipe jumps straight there instead,
 * resetting the timer so the visitor's gesture always wins.
 */
export function NetflixCarousel({ slides, frame = 'cinematic', interval = 3000 }: Props) {
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [drag, setDrag] = useState(0);
  const [hovering, setHovering] = useState(false);
  const startX = useRef(0);
  const count = slides.length;

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + count) % count), [count]);

  // Paused on hover so a visitor reaching for an arrow never has the auto
  // advance land mid-click and collide with the one they asked for.
  useEffect(() => {
    if (count < 2 || dragging || hovering) return;
    const id = setInterval(() => go(1), interval);
    return () => clearInterval(id);
  }, [index, count, interval, dragging, hovering, go]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    setDragging(true);
    startX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setDrag(e.clientX - startX.current);
  };
  const endDrag = () => {
    if (!dragging) return;
    setDragging(false);
    if (drag <= -SWIPE_THRESHOLD) go(1);
    else if (drag >= SWIPE_THRESHOLD) go(-1);
    setDrag(0);
  };

  return (
    <div
      className="gs-carousel"
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: FRAMES[frame].css,
        overflow: 'hidden',
        background: '#0a0a0a',
        boxShadow: 'inset 0 0 0 1px rgba(236,230,218,.1)',
        touchAction: 'pan-y',
        cursor: count > 1 ? (dragging ? 'grabbing' : 'grab') : 'default',
      }}
      onPointerDown={count > 1 ? onPointerDown : undefined}
      onPointerMove={count > 1 ? onPointerMove : undefined}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onPointerCancel={endDrag}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          transform: `translateX(calc(${-index * 100}% + ${drag}px))`,
          transition: dragging ? 'none' : 'transform .6s cubic-bezier(.16,1,.3,1)',
        }}
      >
        {slides.map((slide, i) => {
          const isNear = i === index || i === (index + 1) % count || i === (index - 1 + count) % count;
          return (
            <div key={`${slide.title}-${i}`} style={{ position: 'relative', flex: '0 0 100%', height: '100%' }}>
              <ImageSlot alt={slide.title} placeholder={slide.placeholder} shape="rect" frame={frame} sizes="100vw" eager={isNear} />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  gap: 'clamp(8px,1.4vh,14px)',
                  padding: 'clamp(16px,2.6vw,32px)',
                  background: 'linear-gradient(180deg,rgba(0,0,0,.05) 40%,rgba(0,0,0,.72))',
                  pointerEvents: 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Oswald',sans-serif",
                    fontWeight: 300,
                    fontSize: 'clamp(15px,1.9vw,30px)',
                    lineHeight: 1.1,
                    letterSpacing: '.05em',
                    color: '#ece6da',
                  }}
                >
                  {slide.title}
                </span>
                {slide.meta && (
                  <span style={{ fontSize: 'clamp(9px,.74vw,11px)', letterSpacing: '.28em', color: '#b3ab9d' }}>
                    {slide.meta}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go(-1)}
            onPointerDown={(e) => e.stopPropagation()}
            className="gs-carousel-arrow"
            style={{ left: 'clamp(10px,1.8vw,22px)' }}
          >
            <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
              <path d="M12 2 2 11l10 9" stroke="#ece6da" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(1)}
            onPointerDown={(e) => e.stopPropagation()}
            className="gs-carousel-arrow"
            style={{ right: 'clamp(10px,1.8vw,22px)' }}
          >
            <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
              <path d="M2 2l10 9-10 9" stroke="#ece6da" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      {count > 1 && (
        <div style={{ position: 'absolute', bottom: 14, right: 'clamp(16px,2.6vw,32px)', display: 'flex', gap: 8 }}>
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              onPointerDown={(e) => e.stopPropagation()}
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                border: 0,
                padding: 0,
                cursor: 'pointer',
                background: i === index ? '#ece6da' : 'rgba(236,230,218,.35)',
                transition: 'background .3s',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
