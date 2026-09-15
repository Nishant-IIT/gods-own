'use client';

import { SONGS } from '@/content/timeline';
import { useReg } from '../../../lib/refRegistry';
import { ImageSlot } from '../../ImageSlot';

const song = SONGS[1];
const WORDS_ = ['STRUGGLE', 'DETERMINATION', 'REFUSAL TO QUIT'];

export function ZiddiDil() {
  const reg = useReg();
  return (
    <div data-screen-label="03 SOUND — Ziddi Dil" style={{ display: 'contents' }}>
      <div
        ref={reg('sc2img')}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          opacity: 0,
          willChange: 'transform,opacity,filter',
          width: 'min(58vw,720px)',
          aspectRatio: '4/5',
        }}
      >
        <ImageSlot alt={song.title} placeholder={song.imagePlaceholder} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg,rgba(22,20,18,.5),rgba(22,20,18,.8))',
            pointerEvents: 'none',
          }}
        />
      </div>
      <div
        ref={reg('sc2')}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          opacity: 0,
          pointerEvents: 'none',
          willChange: 'transform,opacity,filter',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 14,
          whiteSpace: 'nowrap',
        }}
      >
        <div
          style={{
            fontFamily: "'Oswald',sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(44px,9.5vw,150px)',
            lineHeight: 0.95,
            letterSpacing: '.02em',
            color: '#ece6da',
          }}
        >
          {song.title}
        </div>
        <div
          ref={reg('sc2meta')}
          style={{ display: 'flex', gap: 'clamp(16px,3vw,36px)', fontSize: 'clamp(10px,.8vw,12px)', letterSpacing: '.36em', color: '#8f887c', opacity: 0 }}
        >
          <span style={{ color: '#ece6da' }}>{song.film}</span>
          <span>{song.year}</span>
        </div>
      </div>
      <div
        ref={reg('sc2words')}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          opacity: 0,
          pointerEvents: 'none',
          willChange: 'transform,opacity',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(10px,2.2vh,24px)',
          fontFamily: "'Oswald',sans-serif",
          fontWeight: 200,
          letterSpacing: '.34em',
          textIndent: '.34em',
          textAlign: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        {WORDS_.map((w, i) => (
          <div
            key={w}
            ref={reg('zw' + i)}
            style={{ fontSize: 'clamp(20px,3vw,46px)', color: i === 2 ? '#d4a05a' : '#ece6da', willChange: 'transform,opacity' }}
          >
            {w}
          </div>
        ))}
      </div>
      {song.story && (
        <div
          ref={reg('sc2why')}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            opacity: 0,
            pointerEvents: 'none',
            willChange: 'transform,opacity,filter',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            width: 'min(88vw,720px)',
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
