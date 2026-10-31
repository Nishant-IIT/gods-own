'use client';

import type { MouseEvent as ReactMouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

const INK = '#ece6da';
const MUTED = '#b3ab9d';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  className?: string;
}

/**
 * A general-purpose tilt-on-hover image card with a title/description
 * caption — inline-styled (no utility classes) to match this hand-built
 * site, same approach as CometCard and LocationMap.
 */
export function Card({ title, description, imageUrl, className }: CardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-10deg', '10deg']);

  function handleMouseMove(e: ReactMouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(300px,36vw,360px)',
        borderRadius: 16,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 16,
          transform: 'translateZ(60px)',
          transformStyle: 'preserve-3d',
          borderRadius: 14,
          overflow: 'hidden',
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: 'inset 0 0 0 1px rgba(236,230,218,.1)',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,.75), rgba(0,0,0,.2) 55%, transparent)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'flex-end',
            padding: 'clamp(18px,2.6vw,28px)',
            transform: 'translateZ(40px)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <h3 style={{ margin: 0, fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(20px,2.2vw,28px)', letterSpacing: '.02em', color: INK }}>
              {title}
            </h3>
            <p style={{ margin: 0, maxWidth: '34ch', fontSize: 'clamp(11px,.9vw,13px)', lineHeight: 1.5, color: MUTED }}>{description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
