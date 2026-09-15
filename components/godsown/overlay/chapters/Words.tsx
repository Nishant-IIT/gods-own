'use client';

import { WORDS } from '@/content/timeline';
import { useReg } from '../../lib/refRegistry';

export function Words() {
  const reg = useReg();
  return (
    <div data-screen-label="02 WORDS" style={{ display: 'contents' }}>
      <div
        ref={reg('wordmark')}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          opacity: 0,
          pointerEvents: 'none',
          willChange: 'transform,opacity,filter',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(18px,3vh,34px)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: "'Oswald',sans-serif",
            fontWeight: 200,
            fontSize: 'clamp(52px,12vw,190px)',
            lineHeight: 0.9,
            letterSpacing: '.22em',
            textIndent: '.22em',
            color: '#ece6da',
          }}
        >
          {WORDS.wordmark}
        </div>
        <div
          ref={reg('wordsub')}
          style={{
            fontFamily: "'Oswald',sans-serif",
            fontWeight: 200,
            fontSize: 'clamp(15px,1.7vw,24px)',
            letterSpacing: '.18em',
            color: '#8f887c',
            maxWidth: '86vw',
            textWrap: 'balance',
            opacity: 0,
          }}
        >
          {WORDS.wordsub}
        </div>
      </div>

      {WORDS.lines.map((line, i) => (
        <div
          key={line}
          ref={reg('line' + i)}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            opacity: 0,
            pointerEvents: 'none',
            willChange: 'transform,opacity,filter',
            fontFamily: i === 3 ? "'Nanum Pen Script',cursive" : "'Oswald',sans-serif",
            fontWeight: i === 3 ? undefined : 200,
            fontSize: i === 3 ? 'clamp(30px,3.8vw,56px)' : 'clamp(20px,2.6vw,38px)',
            letterSpacing: i === 3 ? undefined : '.12em',
            color: i === 3 ? '#b39b74' : '#ece6da',
            whiteSpace: 'nowrap',
          }}
        >
          {line}
        </div>
      ))}

      <div
        ref={reg('quote')}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          opacity: 0,
          pointerEvents: 'none',
          willChange: 'transform,opacity,filter',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(22px,4vh,44px)',
          width: 'min(88vw,1180px)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: "'Oswald',sans-serif",
            fontWeight: 200,
            fontSize: 'clamp(32px,6.4vw,104px)',
            lineHeight: 1.06,
            letterSpacing: '.02em',
            color: '#ece6da',
            textWrap: 'balance',
          }}
        >
          {WORDS.quote}
        </div>
        <div style={{ fontSize: 'clamp(9px,.75vw,11px)', letterSpacing: '.4em', textIndent: '.4em', color: '#8f887c' }}>
          {WORDS.quoteAttribution}
        </div>
      </div>
    </div>
  );
}
