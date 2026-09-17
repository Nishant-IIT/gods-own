'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode, type Ref } from 'react';

type Tag = 'div' | 'h1' | 'h2' | 'a';

type Props = {
  children: ReactNode;
  as?: Tag;
  /** Stagger, in ms — pass `i * 70` for the i-th item in a revealed group. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  /** Only meaningful with `as="a"`. */
  href?: string;
};

/**
 * Replaces the design canvas's `data-reveal` attribute + the page script's
 * `arm()`/`reveal()` scroll pass: fades an element up out of a slight blur
 * the first time it scrolls into view, staggered by `delay` within a group.
 */
export function Reveal({ children, as = 'div', delay = 0, className, style, href }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    el.style.transition = `opacity .9s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .9s cubic-bezier(.16,1,.3,1) ${delay}ms, filter .9s ease ${delay}ms`;
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.filter = 'blur(4px)';

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.filter = 'none';
        io.disconnect();
      },
      { threshold: 0, rootMargin: '0px 0px -12% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  switch (as) {
    case 'h1':
      return (
        <h1 ref={ref as Ref<HTMLHeadingElement>} className={className} style={style}>
          {children}
        </h1>
      );
    case 'h2':
      return (
        <h2 ref={ref as Ref<HTMLHeadingElement>} className={className} style={style}>
          {children}
        </h2>
      );
    case 'a':
      return (
        <a ref={ref as Ref<HTMLAnchorElement>} href={href} className={className} style={style}>
          {children}
        </a>
      );
    default:
      return (
        <div ref={ref as Ref<HTMLDivElement>} className={className} style={style}>
          {children}
        </div>
      );
  }
}
