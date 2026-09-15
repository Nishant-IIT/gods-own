'use client';

import { SONGS } from '@/content/timeline';
import { useReg } from '../../../lib/refRegistry';
import { ImageSlot } from '../../ImageSlot';

const song = SONGS[0];
const WAVE_HEIGHTS = [
  12, 34, 58, 26, 72, 44, 90, 38, 18, 64, 100, 48, 22, 76, 40, 58, 30, 84, 52, 16, 68, 36, 92, 44, 24, 60, 32, 78, 46, 20, 56, 14,
];
const ACCENT_BARS = new Set([2, 6, 10, 17, 26]);

export function PartyOnMyMind() {
  const reg = useReg();
  const titleLines = ['PARTY', 'ON MY', 'MIND'];
  return (
    <div data-screen-label="03 SOUND — Party On My Mind" style={{ display: 'contents' }}>
      <div
        ref={reg('sc1img')}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          opacity: 0,
          willChange: 'transform,opacity,filter',
          width: 'min(76vw,1000px)',
          aspectRatio: '16/9',
        }}
      >
        <ImageSlot alt={song.title} placeholder={song.imagePlaceholder} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg,rgba(22,20,18,.55),rgba(22,20,18,.78))',
            pointerEvents: 'none',
          }}
        />
      </div>
      <div
        ref={reg('sc1')}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          opacity: 0,
          pointerEvents: 'none',
          willChange: 'transform,opacity,filter',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: "'Oswald',sans-serif",
          fontWeight: 400,
          fontSize: 'clamp(46px,10vw,158px)',
          lineHeight: 0.92,
          letterSpacing: '.02em',
          color: '#ece6da',
        }}
      >
        {titleLines.map((line, i) => (
          <span
            key={line}
            ref={reg('p' + i)}
            style={{ display: 'block', marginLeft: i === 1 ? '.18em' : i === 2 ? '.36em' : undefined, willChange: 'transform,opacity' }}
          >
            {line}
          </span>
        ))}
      </div>
      <div
        ref={reg('wave')}
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '22%',
          transform: 'translateX(-50%)',
          opacity: 0,
          pointerEvents: 'none',
          willChange: 'transform,opacity',
          display: 'flex',
          alignItems: 'flex-end',
          gap: 3,
          height: 54,
        }}
      >
        {WAVE_HEIGHTS.map((h, i) => (
          <span key={i} style={{ width: 2, height: `${h}%`, background: ACCENT_BARS.has(i) ? '#d4a05a' : '#8f887c' }} />
        ))}
      </div>
      <div
        ref={reg('sc1meta')}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          opacity: 0,
          pointerEvents: 'none',
          willChange: 'transform,opacity',
          display: 'flex',
          gap: 'clamp(18px,3vw,42px)',
          fontSize: 'clamp(10px,.8vw,12px)',
          letterSpacing: '.36em',
          color: '#8f887c',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ color: '#ece6da' }}>{song.film}</span>
        <span>{song.year}</span>
        <span>{song.credit}</span>
      </div>
      {song.story && (
        <div
          ref={reg('sc1story')}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            opacity: 0,
            pointerEvents: 'none',
            willChange: 'transform,opacity,filter',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            width: 'min(88vw,700px)',
          }}
        >
          <div style={{ fontSize: 'clamp(9px,.75vw,11px)', letterSpacing: '.5em', textIndent: '.5em', color: '#d4a05a' }}>
            {song.story.label}
          </div>
          <div
            style={{
              fontFamily: "'Oswald',sans-serif",
              fontWeight: 200,
              fontSize: 'clamp(17px,2vw,30px)',
              lineHeight: 1.45,
              letterSpacing: '.04em',
              color: '#ece6da',
              textWrap: 'pretty',
            }}
          >
            {song.story.text}
          </div>
        </div>
      )}
    </div>
  );
}
