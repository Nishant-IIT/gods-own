'use client';

import { JOURNEY } from '@/content/timeline';
import { useReg } from '../../lib/refRegistry';

export function Journey() {
  const reg = useReg();
  return (
    <div data-screen-label="05 JOURNEY" style={{ display: 'contents' }}>
      <div
        ref={reg('future')}
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
          fontSize: 'clamp(18px,2.4vw,34px)',
          letterSpacing: 'clamp(.12em,1.4vw,.32em)',
          textIndent: 'clamp(.12em,1.4vw,.32em)',
          color: '#ece6da',
          maxWidth: '86vw',
          textWrap: 'balance',
          lineHeight: 1.35,
          textAlign: 'center',
        }}
      >
        {JOURNEY.line}
      </div>
      <div
        ref={reg('inf')}
        style={{
          position: 'absolute',
          left: '50%',
          top: 'calc(50% + clamp(56px,7vw,86px))',
          transform: 'translate(-50%,0)',
          opacity: 0,
          pointerEvents: 'none',
          willChange: 'transform,opacity',
          fontSize: 'clamp(11px,.9vw,13px)',
          letterSpacing: '.4em',
          color: '#8f887c',
          whiteSpace: 'nowrap',
        }}
      >
        {JOURNEY.infinity}
      </div>
    </div>
  );
}
