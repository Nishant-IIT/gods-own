'use client';

import type React from 'react';
import { useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';

const INK = '#ece6da';
const MUTED = '#b3ab9d';
const DIM = '#8f887c';
const LIVE_GREEN = '#34D399';

interface LocationMapProps {
  location?: string;
  coordinates?: string;
  /** Opened in a new tab when the card is clicked — typically a Google Maps directions link. */
  mapsUrl?: string;
  className?: string;
}

/**
 * A decorative "you are here" card — not a live map. Ported from a shadcn/
 * Tailwind reference component and restyled with this site's own palette
 * (inline styles, no utility classes) so it matches the rest of the
 * hand-built studio site instead of pulling in a Tailwind/shadcn token layer.
 * Always shown in its expanded state; clicking opens `mapsUrl` in a new tab.
 */
export function LocationMap({
  location = 'San Francisco, CA',
  coordinates = '37.7749° N, 122.4194° W',
  mapsUrl,
  className,
}: LocationMapProps) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-50, 50], [8, -8]);
  const rotateY = useTransform(mouseX, [-50, 50], [-8, 8]);

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }

  function handleClick() {
    if (mapsUrl) window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  }

  return (
    <motion.div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', width: '100%', maxWidth: 560, cursor: 'pointer', userSelect: 'none', perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <motion.div
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 16,
          width: '100%',
          aspectRatio: '9 / 7',
          background: '#0d0d0d',
          boxShadow: 'inset 0 0 0 1px rgba(236,230,218,.1)',
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(236,230,218,.05), transparent 55%, rgba(236,230,218,.08))',
          }}
        />

        <motion.div
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div style={{ position: 'absolute', inset: 0, borderRadius: 16, background: '#141414' }} />

          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="none">
            <motion.line
              x1="0%"
              y1="35%"
              x2="100%"
              y2="35%"
              stroke="rgba(236,230,218,.25)"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.line
              x1="0%"
              y1="65%"
              x2="100%"
              y2="65%"
              stroke="rgba(236,230,218,.25)"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            <motion.line
              x1="30%"
              y1="0%"
              x2="30%"
              y2="100%"
              stroke="rgba(236,230,218,.2)"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
            <motion.line
              x1="70%"
              y1="0%"
              x2="70%"
              y2="100%"
              stroke="rgba(236,230,218,.2)"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            />

            {[20, 50, 80].map((y, i) => (
              <motion.line
                key={`h-${i}`}
                x1="0%"
                y1={`${y}%`}
                x2="100%"
                y2={`${y}%`}
                stroke="rgba(236,230,218,.1)"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              />
            ))}
            {[15, 45, 55, 85].map((x, i) => (
              <motion.line
                key={`v-${i}`}
                x1={`${x}%`}
                y1="0%"
                x2={`${x}%`}
                y2="100%"
                stroke="rgba(236,230,218,.1)"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
              />
            ))}
          </svg>

          {[
            { top: '40%', left: '10%', h: '20%', w: '15%', a: 0.14 },
            { top: '15%', left: '35%', h: '15%', w: '12%', a: 0.11 },
            { top: '70%', left: '75%', h: '18%', w: '18%', a: 0.13 },
            { top: '20%', right: '10%', h: '25%', w: '10%', a: 0.1 },
            { top: '55%', left: '5%', h: '12%', w: '8%', a: 0.09 },
            { top: '8%', left: '75%', h: '10%', w: '14%', a: 0.1 },
          ].map((b, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                top: b.top,
                left: b.left,
                right: b.right,
                height: b.h,
                width: b.w,
                borderRadius: 2,
                background: `rgba(236,230,218,${b.a})`,
                boxShadow: `inset 0 0 0 1px rgba(236,230,218,${b.a * 0.7})`,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.03 }}
            />
          ))}

          <motion.div
            style={{ position: 'absolute', top: '50%', left: '50%', translate: '-50% -50%' }}
            initial={{ scale: 0, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.3 }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0 0 10px rgba(52,211,153,.5))' }}>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill={LIVE_GREEN} />
              <circle cx="12" cy="9" r="2.5" fill="#0d0d0d" />
            </svg>
          </motion.div>

          <motion.div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              translate: '-50% 0',
              marginTop: 28,
              whiteSpace: 'nowrap',
              fontSize: 9,
              letterSpacing: '.18em',
              textTransform: 'uppercase',
              color: INK,
              textShadow: '0 1px 6px rgba(0,0,0,.9)',
            }}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            GOD&apos;S OWN MOTION PICTURES
          </motion.div>

          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, #000, transparent 40%)',
              opacity: 0.6,
            }}
          />
        </motion.div>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'space-between', padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                borderRadius: 999,
                padding: '4px 8px',
                background: 'rgba(236,230,218,.05)',
              }}
              animate={{ scale: isHovered ? 1.05 : 1, background: isHovered ? 'rgba(236,230,218,.08)' : 'rgba(236,230,218,.05)' }}
              transition={{ duration: 0.2 }}
            >
              <span style={{ position: 'relative', display: 'inline-flex', height: 6, width: 6 }}>
                {!prefersReducedMotion && (
                  <motion.span
                    style={{ position: 'absolute', inset: 0, borderRadius: 999, background: LIVE_GREEN }}
                    animate={{ scale: [1, 2.2, 2.2], opacity: [0.6, 0, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                  />
                )}
                <span style={{ position: 'relative', height: 6, width: 6, borderRadius: 999, background: LIVE_GREEN }} />
              </span>
              <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase', color: MUTED }}>Live</span>
            </motion.div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <motion.h3
              style={{ margin: 0, fontFamily: "'Karla',system-ui,sans-serif", fontWeight: 500, fontSize: 14, letterSpacing: '.01em', color: INK }}
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {location}
            </motion.h3>

            <p style={{ margin: 0, fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 11, color: DIM }}>{coordinates}</p>

            <motion.div
              style={{
                height: 1,
                background: 'linear-gradient(to right, rgba(212,160,90,.5), rgba(212,160,90,.3), transparent)',
                transformOrigin: 'left',
              }}
              initial={{ scaleX: 0.3 }}
              animate={{ scaleX: isHovered ? 1 : 0.3 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>
      </motion.div>

      <motion.p
        style={{
          position: 'absolute',
          bottom: -22,
          left: '50%',
          x: '-50%',
          margin: 0,
          whiteSpace: 'nowrap',
          fontSize: 10,
          color: DIM,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 4 }}
        transition={{ duration: 0.2 }}
      >
        Get directions →
      </motion.p>
    </motion.div>
  );
}
