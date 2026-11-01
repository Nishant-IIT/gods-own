'use client';

import { useEffect, useRef, useState } from 'react';
import CardDeckCarousel, { type Slide } from '@/components/ui/card-deck-carousel';

type Props = {
  slides: Slide[];
  background?: string;
  ink?: string;
  /** CSS aspect-ratio of a card — forwarded to CardDeckCarousel. */
  aspect?: string;
  /** Width of a card, any CSS length — forwarded to CardDeckCarousel. */
  cardWidth?: string;
};

/**
 * Pins the deck to the viewport while the visitor scrolls through it — the
 * section is as tall as `slides.length` screens, and scroll position within
 * that span maps straight to a card index. Once the last card is reached the
 * section runs out and scrolling carries on into whatever comes next, same
 * as it would release from any other sticky block.
 *
 * Deliberately page-scroll-driven rather than wheel-captured: no
 * `preventDefault`, so trackpad inertia, touch and keyboard scrolling all
 * just work, and the deck never traps the page.
 */
export function ScrollLockedDeck({ slides, background, ink, aspect, cardWidth }: Props) {
  const n = slides.length;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || n < 2) return;

    let raf = 0;
    const measure = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      setIndex(Math.min(n - 1, Math.floor(progress * n)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    measure();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [n]);

  return (
    <div ref={wrapRef} style={{ position: 'relative', height: `${n * 100}vh` }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <CardDeckCarousel
          slides={slides}
          height="100vh"
          autoplay={0}
          wheel={false}
          requestIndex={index}
          background={background}
          ink={ink}
          aspect={aspect}
          cardWidth={cardWidth}
        />
      </div>
    </div>
  );
}
