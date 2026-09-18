'use client';

import { useEffect, useRef } from 'react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { GeometryCollection, Topology } from 'topojson-specification';
import rawLand from 'world-atlas/land-110m.json';

type City = { name: string; lat: number; lng: number; dx: number; dy: number; anchor: 'start' | 'middle' | 'end' };

const HUB = { name: 'MUMBAI', lat: 19.076, lng: 72.8777 };
const CITIES: City[] = [
  { name: 'LONDON', lat: 51.5074, lng: -0.1278, dx: 0, dy: -11, anchor: 'middle' },
  { name: 'TORONTO', lat: 43.6532, lng: -79.3832, dx: -7, dy: -11, anchor: 'end' },
  { name: 'NEW YORK', lat: 40.7128, lng: -74.006, dx: 7, dy: 15, anchor: 'start' },
  { name: 'DUBAI', lat: 25.2048, lng: 55.2708, dx: 0, dy: -11, anchor: 'middle' },
  { name: 'SINGAPORE', lat: 1.3521, lng: 103.8198, dx: 8, dy: 4, anchor: 'start' },
  { name: 'SYDNEY', lat: -33.8688, lng: 151.2093, dx: 0, dy: 16, anchor: 'middle' },
];

const W = 1000;
const H = 500;
const PAD = 10;
const AMBER = '#d4a05a';
const INK = '#ece6da';
const PITCH = 5.2;
const DOT_R = 0.95;

// Real land geometry (world-atlas, 110m resolution) fitted to the viewBox —
// same technique the design's world-map.html used, so the dotted coastline
// actually fills the frame instead of a handful of points floating on black.
const land = feature(rawLand as unknown as Topology, (rawLand as unknown as Topology).objects.land as GeometryCollection);
const projection = geoNaturalEarth1().fitExtent(
  [
    [PAD, PAD],
    [W - PAD, H - PAD],
  ],
  land,
);

function project(lat: number, lng: number) {
  const p = projection([lng, lat]);
  return p ? { x: p[0], y: p[1] } : { x: W / 2, y: H / 2 };
}

function arcPath(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = Math.min(a.y, b.y) - Math.abs(b.x - a.x) * 0.18 - 26;
  return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
}

const DRAW = 2.1;
const STAGGER = 0.34;
const PAUSE = 2.2;

/**
 * Ported from world-map.html (used inline as a Contact-page iframe in the
 * design) — a dotted world, rasterised from real land geometry and sampled
 * on a grid (same technique as the source: fill land onto an offscreen
 * canvas once, then sample that mask — far cheaper than a point-in-polygon
 * test per dot), with arcs of light from Mumbai to the studio's reach drawn
 * in on a loop over it.
 */
export function ReachMap() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);

  // Rasterise the dotted landmass onto the display canvas, restyled to fit
  // whatever size the wrapper actually renders at.
  useEffect(() => {
    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = W;
    maskCanvas.height = H;
    const mctx = maskCanvas.getContext('2d');
    if (mctx) {
      const path = geoPath(projection, mctx);
      mctx.fillStyle = '#fff';
      mctx.beginPath();
      path(land);
      mctx.fill();
    }
    const mask = mctx?.getImageData(0, 0, W, H).data;

    function drawDots() {
      const canvas = canvasRef.current;
      const wrap = wrapRef.current;
      if (!canvas || !wrap || !mask) return;
      const w = Math.max(1, wrap.clientWidth);
      const h = Math.max(1, wrap.clientHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const sx = w / W;
      const sy = h / H;
      for (let y = 0; y < H; y += PITCH) {
        for (let x = 0; x < W; x += PITCH) {
          const px = Math.min(W - 1, Math.round(x));
          const py = Math.min(H - 1, Math.round(y));
          if (mask[(py * W + px) * 4 + 3] < 40) continue;
          ctx.beginPath();
          ctx.arc(x * sx, y * sy, DOT_R * Math.min(sx, sy) * 1.4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(236,230,218,0.26)';
          ctx.fill();
        }
      }
    }

    drawDots();
    const ro = typeof ResizeObserver === 'function' ? new ResizeObserver(drawDots) : null;
    if (ro && wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener('resize', drawDots);
    return () => {
      window.removeEventListener('resize', drawDots);
      ro?.disconnect();
    };
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const lengths = CITIES.map((_, i) => {
      const path = pathRefs.current[i];
      return path ? path.getTotalLength() : 0;
    });

    let t0: number | null = null;
    const cycle = CITIES.length * STAGGER + DRAW + PAUSE;
    let raf = requestAnimationFrame(function loop(now) {
      raf = requestAnimationFrame(loop);
      if (t0 === null) t0 = now;
      const t = ((now - t0) / 1000) % cycle;

      CITIES.forEach((_, i) => {
        const path = pathRefs.current[i];
        const dot = dotRefs.current[i];
        const len = lengths[i];
        if (!path || !dot || !len) return;
        const local = (t - i * STAGGER) / DRAW;
        const u = Math.min(1, Math.max(0, local));
        const e = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
        path.style.strokeDashoffset = String(len * (1 - e));
        if (u > 0 && u < 1) {
          const q = path.getPointAtLength(len * e);
          dot.setAttribute('cx', q.x.toFixed(1));
          dot.setAttribute('cy', q.y.toFixed(1));
          dot.setAttribute('opacity', String(Math.sin(u * Math.PI) * 0.9));
        } else {
          dot.setAttribute('opacity', '0');
        }
      });
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  const hub = project(HUB.lat, HUB.lng);
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div ref={wrapRef} style={{ position: 'relative', width: '100%', aspectRatio: '2/1', overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          maskImage: 'linear-gradient(to bottom,transparent,#000 12%,#000 88%,transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom,transparent,#000 12%,#000 88%,transparent)',
        }}
      />
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        aria-label="Reach map"
        style={{ position: 'absolute', inset: 0, display: 'block', width: '100%', height: '100%' }}
      >
        <defs>
          <linearGradient id="gsReachArc" x1="0%" x2="100%">
            <stop offset="0%" stopColor={AMBER} stopOpacity={0} />
            <stop offset="12%" stopColor={AMBER} stopOpacity={0.95} />
            <stop offset="88%" stopColor={AMBER} stopOpacity={0.95} />
            <stop offset="100%" stopColor={AMBER} stopOpacity={0} />
          </linearGradient>
        </defs>

        {CITIES.map((c, i) => {
          const p = project(c.lat, c.lng);
          const d = arcPath(hub, p);
          return (
            <path
              key={c.name}
              ref={(el) => {
                pathRefs.current[i] = el;
              }}
              d={d}
              fill="none"
              stroke="url(#gsReachArc)"
              strokeWidth={1}
              strokeLinecap="round"
            />
          );
        })}

        {CITIES.map((c, i) => {
          const p = project(c.lat, c.lng);
          return (
            <circle
              key={`dot-${c.name}`}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              r={2.6}
              fill={INK}
              opacity={0}
              cx={p.x}
              cy={p.y}
            />
          );
        })}

        {CITIES.map((c, i) => {
          const p = project(c.lat, c.lng);
          return (
            <g key={`mark-${c.name}`}>
              <circle cx={p.x} cy={p.y} r={2.4} fill={AMBER} />
              {!reducedMotion && (
                <circle cx={p.x} cy={p.y} r={2.4} fill={AMBER} opacity={0.5}>
                  <animate attributeName="r" from={2.4} to={11} dur="2.6s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" from={0.5} to={0} dur="2.6s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                </circle>
              )}
              <text x={p.x + c.dx} y={p.y + c.dy} textAnchor={c.anchor} style={{ fontSize: 9, letterSpacing: '.24em', fill: '#b3ab9d' }}>
                {c.name}
              </text>
            </g>
          );
        })}

        <circle cx={hub.x} cy={hub.y} r={3.4} fill={INK} />
        {!reducedMotion && (
          <circle cx={hub.x} cy={hub.y} r={3.4} fill={INK} opacity={0.55}>
            <animate attributeName="r" from={3.4} to={15} dur="2.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" from={0.55} to={0} dur="2.6s" repeatCount="indefinite" />
          </circle>
        )}
        <text x={hub.x} y={hub.y + 18} textAnchor="middle" style={{ fontSize: 9, letterSpacing: '.24em', fill: INK }}>
          MUMBAI
        </text>
      </svg>
    </div>
  );
}
