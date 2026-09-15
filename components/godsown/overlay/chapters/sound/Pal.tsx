'use client';

import { SONGS } from '@/content/timeline';
import { useReg } from '../../../lib/refRegistry';
import { ImageSlot } from '../../ImageSlot';

const song = SONGS[4];
const LETTERS = song.title.split('');

export function Pal() {
  const reg = useReg();
  return (
    <div data-screen-label="03 SOUND — Pal" style={{ display: 'contents' }}>
      <div
        ref={reg('sc5img')}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          opacity: 0,
          willChange: 'transform,opacity,filter',
          width: 'min(84vw,1140px)',
          aspectRatio: '21/9',
        }}
      >
        <ImageSlot alt={song.title} placeholder={song.imagePlaceholder} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(62% 74% at 50% 50%,rgba(22,20,18,.52),rgba(22,20,18,.9))',
            pointerEvents: 'none',
          }}
        />
      </div>
      <div
        ref={reg('sc5ghost')}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          opacity: 0,
          pointerEvents: 'none',
          willChange: 'transform,opacity',
          fontFamily: "'Oswald',sans-serif",
          fontWeight: 200,
          fontSize: 'clamp(64px,min(15vw,22vh),230px)',
          lineHeight: 1,
          letterSpacing: '.18em',
          textIndent: '.18em',
          whiteSpace: 'nowrap',
          color: '#d4a05a',
        }}
      >
        MOMENT
      </div>
      <div
        ref={reg('sc5')}
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
          gap: 'clamp(10px,1.8vh,22px)',
          width: 'min(92vw,1040px)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '.04em',
            fontFamily: "'Oswald',sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(44px,min(11vw,15vh),180px)',
            lineHeight: 1,
            letterSpacing: '.04em',
            color: '#ece6da',
          }}
        >
          {LETTERS.map((ch, i) => (
            <span key={i} ref={reg('q' + i)} style={{ display: 'block', willChange: 'transform,opacity' }}>
              {ch}
            </span>
          ))}
        </div>
        <div
          ref={reg('sc5gloss')}
          style={{ fontFamily: "'Nanum Pen Script',cursive", fontSize: 'clamp(20px,min(2.6vw,3.8vh),40px)', color: '#b39b74', opacity: 0, willChange: 'transform,opacity' }}
        >
          a moment
        </div>
        <div
          ref={reg('sc5meta')}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'clamp(14px,2.6vw,34px)',
            fontSize: 'clamp(10px,.78vw,12px)',
            letterSpacing: '.34em',
            color: '#8f887c',
            opacity: 0,
            willChange: 'opacity',
          }}
        >
          <span style={{ color: '#d4a05a' }}>{song.film}</span>
          <span>{song.year}</span>
          <span>{song.credit}</span>
        </div>
      </div>
    </div>
  );
}
