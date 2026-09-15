'use client';

import { ORIGIN } from '@/content/timeline';
import { useReg } from '../../lib/refRegistry';

export function Origin() {
  const reg = useReg();
  return (
    <div data-screen-label="01 ORIGIN" style={{ display: 'contents' }}>
      <div
        ref={reg('title')}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          opacity: 0,
          pointerEvents: 'none',
          willChange: 'transform,opacity,filter',
          fontFamily: "'Oswald',sans-serif",
          fontWeight: 200,
          fontSize: 'clamp(44px,9vw,148px)',
          lineHeight: 1,
          letterSpacing: '.6em',
          textIndent: '.6em',
          color: '#ece6da',
          whiteSpace: 'nowrap',
        }}
      >
        {ORIGIN.title}
      </div>
      <div
        ref={reg('tagline')}
        style={{
          position: 'absolute',
          left: '50%',
          top: 'calc(50% + clamp(48px,8vw,120px))',
          transform: 'translate(-50%,0)',
          opacity: 0,
          pointerEvents: 'none',
          willChange: 'transform,opacity',
          fontSize: 'clamp(10px,.8vw,12px)',
          letterSpacing: '.42em',
          textIndent: '.42em',
          color: '#8f887c',
          whiteSpace: 'nowrap',
          textAlign: 'center',
        }}
      >
        {ORIGIN.tagline}
      </div>
      <div
        ref={reg('byline')}
        style={{
          position: 'absolute',
          left: '50%',
          top: 'calc(50% + clamp(74px,11vw,164px))',
          transform: 'translate(-50%,0)',
          opacity: 0,
          pointerEvents: 'none',
          willChange: 'transform,opacity',
          display: 'flex',
          alignItems: 'baseline',
          gap: '.6em',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontFamily: "'Nanum Pen Script',cursive", fontSize: 'clamp(18px,1.6vw,24px)', color: '#b39b74' }}>
          {ORIGIN.byBy}
        </span>
        <span style={{ fontSize: 'clamp(10px,.8vw,12px)', letterSpacing: '.42em', color: '#ece6da' }}>{ORIGIN.byName}</span>
      </div>
    </div>
  );
}
