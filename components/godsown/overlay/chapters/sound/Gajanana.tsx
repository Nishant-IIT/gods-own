'use client';

import { FRAMES } from '@/content/frames';
import { SONGS } from '@/content/timeline';
import { useReg } from '../../../lib/refRegistry';
import { ImageSlot } from '../../ImageSlot';

const song = SONGS[3];
const LETTERS = song.title.split('');

export function Gajanana() {
  const reg = useReg();
  return (
    <div data-screen-label="03 SOUND — Gajanana" style={{ display: 'contents' }}>
      <div
        ref={reg('sc4img')}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          opacity: 0,
          willChange: 'transform,opacity,filter',
          width: 'min(84vw,1140px)',
          aspectRatio: FRAMES.cinematic.css,
        }}
      >
        <ImageSlot alt={song.title} placeholder={song.imagePlaceholder} frame="cinematic" sizes="min(84vw,1140px)" />
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
        ref={reg('sc4ghost')}
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
          fontSize: 'clamp(160px,min(38vw,58vh),600px)',
          lineHeight: 1,
          letterSpacing: '.04em',
          color: '#d4a05a',
        }}
      >
        108
      </div>
      <div
        ref={reg('sc4')}
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
            gap: '.03em',
            fontFamily: "'Oswald',sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(32px,min(7.6vw,11vh),124px)',
            lineHeight: 1,
            letterSpacing: '.02em',
            color: '#ece6da',
          }}
        >
          {LETTERS.map((ch, i) => (
            <span key={i} ref={reg('j' + i)} style={{ display: 'block', willChange: 'transform,opacity' }}>
              {ch}
            </span>
          ))}
        </div>
        <div
          ref={reg('sc4meta')}
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
        {song.story && (
          <div
            ref={reg('sc4note')}
            style={{
              opacity: 0,
              willChange: 'transform,opacity,filter',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'clamp(8px,1.4vh,16px)',
              maxWidth: '52ch',
              marginTop: 'clamp(8px,2vh,26px)',
            }}
          >
            <div style={{ fontSize: 'clamp(9px,.75vw,11px)', letterSpacing: '.5em', textIndent: '.5em', color: '#d4a05a' }}>
              {song.story.label}
            </div>
            <div
              style={{
                fontFamily: "'Oswald',sans-serif",
                fontWeight: 200,
                fontSize: 'clamp(14px,min(1.8vw,2.8vh),27px)',
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
    </div>
  );
}
