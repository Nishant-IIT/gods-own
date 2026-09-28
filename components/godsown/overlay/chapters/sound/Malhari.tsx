'use client';

import { FRAMES } from '@/content/frames';
import { SONGS } from '@/content/timeline';
import { useReg } from '../../../lib/refRegistry';
import { ImageSlot } from '../../ImageSlot';

const song = SONGS[2];
const LETTERS = song.title.split('');

export function Malhari() {
  const reg = useReg();
  return (
    <div data-screen-label="03 SOUND — Malhari" style={{ display: 'contents' }}>
      <div
        ref={reg('sc3img')}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          opacity: 0,
          willChange: 'transform,opacity,filter',
          width: 'min(86vw,1200px)',
          aspectRatio: FRAMES.cinematic.css,
        }}
      >
        <ImageSlot alt={song.title} placeholder={song.imagePlaceholder} frame="cinematic" sizes="min(86vw,1200px)" />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(60% 70% at 50% 50%,rgba(22,20,18,.55),rgba(22,20,18,.88))',
            pointerEvents: 'none',
          }}
        />
      </div>
      <div
        ref={reg('mal')}
        style={{
          position: 'absolute',
          left: '50%',
          top: '46%',
          transform: 'translate(-50%,-50%)',
          opacity: 0,
          pointerEvents: 'none',
          willChange: 'transform,opacity,filter',
          display: 'flex',
          gap: '.05em',
          fontFamily: "'Oswald',sans-serif",
          fontWeight: 400,
          fontSize: 'clamp(62px,15vw,230px)',
          lineHeight: 1,
          color: '#ece6da',
        }}
      >
        {LETTERS.map((ch, i) => (
          <span key={i} ref={reg('m' + i)} style={{ display: 'block', willChange: 'transform,opacity' }}>
            {ch}
          </span>
        ))}
      </div>
      <div
        ref={reg('malcred')}
        style={{
          position: 'absolute',
          left: '50%',
          top: 'calc(46% + clamp(64px,11vw,168px))',
          transform: 'translate(-50%,0)',
          opacity: 0,
          pointerEvents: 'none',
          willChange: 'transform,opacity',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 'clamp(16px,3vw,46px)',
          fontSize: 'clamp(10px,.78vw,12px)',
          letterSpacing: '.3em',
          color: '#8f887c',
          textAlign: 'center',
        }}
      >
        <span style={{ color: '#c4463a' }}>
          {song.film} — {song.year}
        </span>
        <span>
          LYRICS <span style={{ color: '#ece6da' }}>PRASHANT INGOLE</span>
        </span>
        <span>
          MUSIC <span style={{ color: '#ece6da' }}>SANJAY LEELA BHANSALI</span>
        </span>
      </div>
    </div>
  );
}
