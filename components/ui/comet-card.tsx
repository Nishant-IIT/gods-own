'use client';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import type { CSSProperties, PointerEvent, ReactNode } from 'react';
import { useRef } from 'react';

type Props = {
  children: ReactNode;
  /** Max tilt in degrees on each axis. */
  rotateDepth?: number;
  /** Max parallax shift in px on each axis. */
  translateDepth?: number;
  className?: string;
  style?: CSSProperties;
};

const SPRING = { stiffness: 100, damping: 30, mass: 0.6 } as const;

/**
 * Pointer-tracked 3D tilt with a specular glare sweep — the "comet" card.
 * Inline-styled rather than utility-classed: this site ships without
 * Tailwind's layer (see app/globals.css), so classNames would be inert.
 * Honours prefers-reduced-motion by rendering the children flat and still.
 */
export function CometCard({
  children,
  rotateDepth = 15,
  translateDepth = 14,
  className,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);
  const springGlare = useSpring(glareOpacity, { stiffness: 120, damping: 26 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [`${rotateDepth}deg`, `-${rotateDepth}deg`]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [`-${rotateDepth}deg`, `${rotateDepth}deg`]);
  const translateX = useTransform(springX, [-0.5, 0.5], [`-${translateDepth}px`, `${translateDepth}px`]);
  const translateY = useTransform(springY, [-0.5, 0.5], [`${translateDepth}px`, `-${translateDepth}px`]);

  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(236,230,218,.16), rgba(212,160,90,.07) 34%, rgba(0,0,0,0) 62%)`;

  if (reduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px - 0.5);
    y.set(py - 0.5);
    glareX.set(px * 100);
    glareY.set(py * 100);
    glareOpacity.set(1);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
    glareOpacity.set(0);
  };

  return (
    <div
      ref={ref}
      className={className}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ perspective: 1000, ...style }}
    >
      <motion.div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          rotateX,
          rotateY,
          translateX,
          translateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
        <motion.div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 4,
            background: glare,
            opacity: springGlare,
            mixBlendMode: 'screen',
            pointerEvents: 'none',
          }}
        />
      </motion.div>
    </div>
  );
}
