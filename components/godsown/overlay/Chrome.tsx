'use client';

import { useEffect, useRef } from 'react';
import { CHAPTERS } from '../lib/curves';
import { scrollState } from '../lib/scrollState';
import { useGodsownStore } from '../lib/store';

/**
 * The persistent UI chrome: home button, chapter nav, scroll hint, sound
 * toggle, cursor light. Kept as one piece (matches the prototype's single
 * "UI" block) since none of it belongs to any one chapter.
 */
export function Chrome({ onNavigate, mobile }: { onNavigate: (i: number) => void; mobile: boolean }) {
  const activeChapter = useGodsownStore((s) => s.activeChapter);
  const soundOn = useGodsownStore((s) => s.soundOn);
  const toggleSound = useGodsownStore((s) => s.toggleSound);

  const hintRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Scroll hint + cursor light both need a continuous per-frame update driven
  // by scrollState, independent of React re-renders — same rationale as
  // CameraRig: this is a mutate-every-frame concern, not component state.
  useEffect(() => {
    if (mobile) return;
    let raf = 0;
    let hintAlpha = 0;
    let curX = -100;
    let curY = -100;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      hintAlpha += ((scrollState.introDone ? 1 : 0) - hintAlpha) * 0.03;
      const sp = Math.max(0, Math.min(1, scrollState.progress));
      if (hintRef.current) {
        hintRef.current.style.opacity = String(hintAlpha * (1 - Math.min(1, sp * 30)));
      }
      curX += (scrollState.clientX - curX) * 0.2;
      curY += (scrollState.clientY - curY) * 0.2;
      if (cursorRef.current) {
        cursorRef.current.style.opacity = scrollState.clientX > 0 ? '0.9' : '0';
        cursorRef.current.style.transform = `translate(${curX.toFixed(1)}px, ${curY.toFixed(1)}px)`;
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [mobile]);

  return (
    <>
      <button
        onClick={() => onNavigate(0)}
        style={{
          position: 'absolute',
          left: 'clamp(20px,3vw,44px)',
          top: 'clamp(20px,3vw,40px)',
          background: 'none',
          border: 0,
          padding: 0,
          cursor: 'pointer',
          font: 'inherit',
          fontSize: 11,
          letterSpacing: '.42em',
          color: '#ece6da',
        }}
      >
        GODSOWN
      </button>

      <nav
        aria-label="Chapters"
        style={{
          position: 'absolute',
          right: 'clamp(20px,3vw,44px)',
          top: 'clamp(20px,3vw,40px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 'clamp(6px,1vh,10px)',
        }}
      >
        {CHAPTERS.map((c, i) => {
          const current = i === activeChapter;
          return (
            <button
              key={c.n}
              className="gs-navbtn"
              onClick={() => onNavigate(i)}
              aria-current={current ? 'true' : undefined}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 12,
                background: 'none',
                border: 0,
                padding: '2px 0',
                cursor: 'pointer',
                font: 'inherit',
                fontSize: 10,
                letterSpacing: '.3em',
                color: current ? '#d4a05a' : '#8f887c',
                fontVariantNumeric: 'tabular-nums',
                opacity: current ? 1 : 0.6,
                transition: 'color .6s, opacity .6s',
              }}
            >
              <span style={{ fontSize: 9, color: '#8f887c' }}>{c.n}</span>
              <span>{c.label}</span>
            </button>
          );
        })}
      </nav>

      <div
        ref={hintRef}
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 'clamp(22px,4vh,40px)',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          pointerEvents: 'none',
          color: '#8f887c',
          opacity: 0,
        }}
      >
        <span style={{ fontSize: 9, letterSpacing: '.4em', textIndent: '.4em' }}>SCROLL</span>
        <span
          style={{
            display: 'block',
            width: 1,
            height: 28,
            background: '#8f887c',
            animation: 'gs-breathe 2.6s ease-in-out infinite',
          }}
        />
      </div>

      <button
        onClick={toggleSound}
        aria-pressed={soundOn}
        style={{
          position: 'absolute',
          right: 'clamp(20px,3vw,44px)',
          bottom: 'clamp(22px,4vh,40px)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'none',
          border: 0,
          padding: '8px 0',
          cursor: 'pointer',
          color: '#8f887c',
          font: 'inherit',
          fontSize: 9,
          letterSpacing: '.36em',
          minHeight: 44,
        }}
      >
        <span
          style={{
            display: 'block',
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: soundOn ? '#d4a05a' : '#4a453e',
          }}
        />
        <span>{soundOn ? 'SOUND ON' : 'SOUND OFF'}</span>
      </button>

      {!mobile && (
        <div
          ref={cursorRef}
          aria-hidden
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 6,
            height: 6,
            margin: '-3px 0 0 -3px',
            borderRadius: '50%',
            background: '#ece6da',
            boxShadow: '0 0 14px 3px rgba(236,230,218,.35)',
            pointerEvents: 'none',
            opacity: 0,
            willChange: 'transform',
          }}
        />
      )}
    </>
  );
}
