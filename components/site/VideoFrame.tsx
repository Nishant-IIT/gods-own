'use client';

import { useState } from 'react';
import { ImageSlot } from '@/components/godsown/overlay/ImageSlot';

type Ratio = '16/9' | '21/9' | '4/5' | '2/3' | '1/1';

type Props = {
  label: string;
  meta?: string;
  /** YouTube/Vimeo URL, or any other embeddable URL. Omit while the film isn't live yet. */
  url?: string;
  placeholder?: string;
  ratio?: Ratio;
  note?: string;
};

function embedUrl(url: string) {
  const yt = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{6,})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0&modestbranding=1`;
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}?autoplay=1`;
  return url;
}

/**
 * Ported from VideoFrame.dc.html — poster-frame-first media block. The still
 * is the design; the embed only mounts once the visitor presses play, so a
 * page with no film yet still reads as a considered, finished frame rather
 * than an empty player.
 */
export function VideoFrame({ label, meta = '', url = '', placeholder, ratio = '16/9', note = 'STILL TO COME' }: Props) {
  const [playing, setPlaying] = useState(false);
  const trimmedUrl = url.trim();
  const isPlaying = playing && !!trimmedUrl;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: ratio,
        overflow: 'hidden',
        background: '#0a0a0a',
        boxShadow: 'inset 0 0 0 1px rgba(236,230,218,.1)',
      }}
    >
      {!isPlaying && (
        <div style={{ position: 'absolute', inset: 0 }}>
          <ImageSlot alt={label} placeholder={placeholder || `${label} — poster frame`} shape="rect" />
        </div>
      )}

      {isPlaying && (
        <iframe
          src={embedUrl(trimmedUrl)}
          title={label}
          allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, background: '#000' }}
        />
      )}

      {!isPlaying && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            gap: 'clamp(8px,1.4vh,14px)',
            padding: 'clamp(16px,2.6vw,32px)',
            background: 'linear-gradient(180deg,rgba(0,0,0,.05) 40%,rgba(0,0,0,.72))',
            pointerEvents: 'none',
          }}
        >
          {trimmedUrl && (
            <button
              onClick={() => setPlaying(true)}
              aria-label={`Play ${label}`}
              className="gs-hover-play"
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%,-50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 'clamp(46px,5vw,72px)',
                height: 'clamp(46px,5vw,72px)',
                padding: 0,
                border: 0,
                borderRadius: '50%',
                cursor: 'pointer',
                pointerEvents: 'auto',
                boxShadow: 'inset 0 0 0 1px rgba(236,230,218,.4)',
                background: 'rgba(0,0,0,.25)',
                transition: 'transform .5s cubic-bezier(.16,1,.3,1), box-shadow .5s, background .5s',
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: 0,
                  height: 0,
                  marginLeft: 3,
                  borderTop: '6px solid transparent',
                  borderBottom: '6px solid transparent',
                  borderLeft: '10px solid #ece6da',
                }}
              />
            </button>
          )}

          <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(15px,1.9vw,30px)', lineHeight: 1.1, letterSpacing: '.05em', color: '#ece6da' }}>
            {label}
          </span>
          <span style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(8px,1.4vw,20px)', fontSize: 'clamp(9px,.74vw,11px)', letterSpacing: '.28em', color: '#b3ab9d' }}>
            {meta}
          </span>
          <span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 9, letterSpacing: '.16em', color: trimmedUrl ? '#d4a05a' : '#8f887c' }}>
            {trimmedUrl ? 'PLAY' : note}
          </span>
        </div>
      )}
    </div>
  );
}
