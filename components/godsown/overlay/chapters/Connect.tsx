'use client';

import { CONNECT } from '@/content/timeline';
import { useReg } from '../../lib/refRegistry';

export function Connect() {
  const reg = useReg();
  return (
    <div
      ref={reg('final')}
      data-screen-label="06 CONNECT"
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        opacity: 0,
        willChange: 'transform,opacity',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 18,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: "'Oswald',sans-serif",
          fontWeight: 300,
          fontSize: 'clamp(20px,2.2vw,30px)',
          letterSpacing: '.5em',
          textIndent: '.5em',
          color: '#ece6da',
          marginTop: 'clamp(40px,6vw,80px)',
        }}
      >
        {CONNECT.title}
      </div>
      <div style={{ fontSize: 'clamp(10px,.8vw,12px)', letterSpacing: '.38em', textIndent: '.38em', color: '#8f887c' }}>
        {CONNECT.name}
      </div>
      <div style={{ display: 'flex', gap: 28, marginTop: 26, fontSize: 10, letterSpacing: '.3em' }}>
        {CONNECT.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            style={{ color: '#8f887c', borderBottom: '1px solid rgba(143,136,124,.35)', paddingBottom: 4 }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
