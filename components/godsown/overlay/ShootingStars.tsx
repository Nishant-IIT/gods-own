'use client';

import { useEffect, useRef } from 'react';
import { envDensity } from '../lib/env';
import { scrollState } from '../lib/scrollState';

type Shot = { x: number; y: number; vx: number; vy: number; life: number; span: number; len: number };

/**
 * Rare, thin meteors crossing the sky — ported from the prototype's `shots`
 * array in `draw()`. Kept as a plain 2D canvas overlay rather than a 3D
 * object: the original treats them as a screen-space event (spawn anywhere
 * in the upper frame, streak off at an angle, fade), which a flat overlay
 * reproduces directly without re-deriving it in world space.
 */
export function ShootingStars({ reduced }: { reduced: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let raf = 0;
    let last = performance.now();
    let nextShot = 2.5 + Math.random() * 4;
    const shots: Shot[] = [];
    let W = 1;
    let H = 1;

    const resize = () => {
      W = Math.max(1, window.innerWidth);
      H = Math.max(1, window.innerHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(50, now - last) / 1000;
      last = now;
      ctx.clearRect(0, 0, W, H);
      const env = envDensity(scrollState.progress);

      nextShot -= dt;
      if (nextShot <= 0) {
        nextShot = 3.5 + Math.random() * 7;
        const ang = (-0.62 + (Math.random() - 0.5) * 0.5) * (Math.random() < 0.5 ? 1 : -1);
        shots.push({
          x: Math.random() * W * 1.2 - W * 0.1,
          y: Math.random() * H * 0.55,
          vx: Math.cos(ang) * (9 + Math.random() * 7) * (Math.random() < 0.5 ? 1 : -1) * 60,
          vy: Math.abs(Math.sin(ang)) * (5 + Math.random() * 5) * 60,
          life: 0,
          span: 0.7 + Math.random() * 0.5,
          len: 90 + Math.random() * 150,
        });
      }

      for (let i = shots.length - 1; i >= 0; i--) {
        const s = shots[i];
        s.life += dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        const u = s.life / s.span;
        if (u >= 1) {
          shots.splice(i, 1);
          continue;
        }
        const a = Math.sin(u * Math.PI) * 0.85 * Math.max(0.25, env);
        const m = Math.hypot(s.vx, s.vy) || 1;
        const tx = s.x - (s.vx / m) * s.len;
        const ty = s.y - (s.vy / m) * s.len;
        const gradient = ctx.createLinearGradient(tx, ty, s.x, s.y);
        gradient.addColorStop(0, 'rgba(236,230,218,0)');
        gradient.addColorStop(1, `rgba(255,248,236,${a.toFixed(3)})`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
        ctx.fillStyle = '#fff8ec';
        ctx.globalAlpha = a;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', mixBlendMode: 'screen' }}
    />
  );
}
