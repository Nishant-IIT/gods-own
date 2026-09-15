'use client';

import { BODY_OF_WORK } from '@/content/timeline';
import { useReg } from '../../../lib/refRegistry';

export function BodyOfWork() {
  const reg = useReg();
  return (
    <div
      ref={reg('works')}
      data-screen-label="03 SOUND — body of work"
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        opacity: 0,
        pointerEvents: 'none',
        willChange: 'transform,opacity,filter',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(14px,2.6vh,32px)',
        width: 'min(90vw,1000px)',
      }}
    >
      <div
        ref={reg('wlabel')}
        style={{ fontSize: 'clamp(9px,.75vw,11px)', letterSpacing: '.5em', textIndent: '.5em', color: '#d4a05a', opacity: 0, willChange: 'opacity' }}
      >
        THE BODY OF WORK
      </div>
      {BODY_OF_WORK.map((w, i) => (
        <div
          key={w.title}
          ref={reg('w' + i)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(6px,1vh,12px)',
            opacity: 0,
            willChange: 'transform,opacity,filter',
            marginLeft: i === 0 ? 'clamp(20px,5vw,110px)' : 'clamp(10px,2.5vw,54px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(12px,2vw,30px)', flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: "'Oswald',sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(24px,min(4.4vw,6.2vh),66px)',
                lineHeight: 1,
                letterSpacing: '.03em',
                color: '#ece6da',
              }}
            >
              {w.title}
            </span>
            <span style={{ fontSize: 'clamp(10px,.8vw,12px)', letterSpacing: '.34em', color: '#8f887c' }}>
              {w.film} — {w.year}
            </span>
          </div>
          <span
            ref={reg('r' + i)}
            style={{ display: 'block', height: 1, background: 'rgba(236,230,218,.2)', transform: 'scaleX(0)', transformOrigin: 'left', willChange: 'transform' }}
          />
        </div>
      ))}
    </div>
  );
}
