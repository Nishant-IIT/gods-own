'use client';

import { FRAMES } from '@/content/frames';
import { CINEMA } from '@/content/timeline';
import { useReg } from '../../lib/refRegistry';
import { ImageSlot } from '../ImageSlot';

const LETTERS = CINEMA.title.split('');

export function Cinema() {
  const reg = useReg();
  return (
    <div data-screen-label="04 CINEMA" style={{ display: 'contents' }}>
      {CINEMA.fragments.map((word, i) => (
        <div
          key={word}
          ref={reg('frag' + i)}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            opacity: 0,
            pointerEvents: 'none',
            willChange: 'transform,opacity,filter',
            fontFamily: "'Oswald',sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(22px,3vw,44px)',
            letterSpacing: '.3em',
            color: '#ece6da',
          }}
        >
          {word}
        </div>
      ))}
      <div
        ref={reg('budh')}
        style={{
          position: 'absolute',
          left: '50%',
          top: '44%',
          transform: 'translate(-50%,-50%)',
          opacity: 0,
          pointerEvents: 'none',
          willChange: 'transform,opacity,filter',
          display: 'flex',
          gap: '.08em',
          fontFamily: "'Oswald',sans-serif",
          fontWeight: 400,
          fontSize: 'clamp(84px,18vw,260px)',
          lineHeight: 1,
          color: '#ece6da',
        }}
      >
        {LETTERS.map((ch, i) => (
          <span key={i} ref={reg('b' + i)} style={{ display: 'block', willChange: 'transform,opacity' }}>
            {ch}
          </span>
        ))}
      </div>
      <div
        ref={reg('awak')}
        style={{
          position: 'absolute',
          left: '50%',
          top: 'calc(44% + clamp(54px,10vw,150px))',
          transform: 'translate(-50%,0)',
          opacity: 0,
          pointerEvents: 'none',
          willChange: 'transform,opacity',
          fontSize: 'clamp(10px,.85vw,13px)',
          letterSpacing: '.5em',
          textIndent: '.5em',
          color: '#d4a05a',
          whiteSpace: 'nowrap',
        }}
      >
        {CINEMA.subtitle}
      </div>
      <div
        ref={reg('credits')}
        style={{
          position: 'absolute',
          left: '50%',
          top: 'calc(44% + clamp(84px,13vw,196px))',
          transform: 'translate(-50%,0)',
          opacity: 0,
          pointerEvents: 'none',
          willChange: 'transform,opacity',
          display: 'flex',
          gap: 'clamp(18px,3vw,40px)',
          fontSize: 'clamp(10px,.75vw,11px)',
          letterSpacing: '.3em',
          color: '#8f887c',
          whiteSpace: 'nowrap',
        }}
      >
        {CINEMA.credits.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>
      <div
        ref={reg('frame')}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          opacity: 0,
          willChange: 'transform,opacity,filter',
          width: 'min(72vw,880px)',
          aspectRatio: FRAMES.cinematic.css,
        }}
      >
        <ImageSlot alt={CINEMA.title} placeholder={CINEMA.imagePlaceholder} frame="cinematic" sizes="min(72vw,880px)" />
        <span
          style={{
            position: 'absolute',
            left: 14,
            bottom: 12,
            fontFamily: 'ui-monospace,Menlo,monospace',
            fontSize: 10,
            letterSpacing: '.18em',
            color: '#8f887c',
            pointerEvents: 'none',
          }}
        >
          {CINEMA.frameCode}
        </span>
      </div>
    </div>
  );
}
