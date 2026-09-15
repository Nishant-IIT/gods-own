/**
 * The tuned choreography math from the GODSOWN.dc.html prototype, ported verbatim.
 *
 * These numbers (breakpoints, the camera-depth keyframe table, the easing-window
 * helpers) are the expensive, hand-validated part of the design. Everything here
 * is pure and framework-agnostic — the renderer around it changed (canvas-2D →
 * WebGL/R3F, manual DOM writes → GSAP), the curve itself did not.
 */

/** End of the locked hero intro, as a fraction of total scroll progress. */
export const HERO = 0.1;
/** Seconds the hero title-reveal takes before scroll unlocks. */
export const DUR = 4.5;

export type Chapter = {
  n: string;
  label: string;
  /** Scroll-progress (0..1) this chapter's nav entry jumps to. */
  p: number;
  /** Scroll-progress at which this chapter becomes "active" for the nav highlight. */
  from: number;
};

export const CHAPTERS: Chapter[] = [
  { n: '01', label: 'ORIGIN', p: HERO, from: 0 },
  { n: '02', label: 'WORDS', p: 0.145, from: 0.138 },
  { n: '03', label: 'SOUND', p: 0.322, from: 0.316 },
  { n: '04', label: 'CINEMA', p: 0.794, from: 0.788 },
  { n: '05', label: 'JOURNEY', p: 0.958, from: 0.952 },
  { n: '06', label: 'CONNECT', p: 0.994, from: 0.982 },
];

/** Smoothstep-eased 0..1 ramp between two progress values. */
export function ramp(p: number, a: number, b: number): number {
  return Math.min(1, Math.max(0, (p - a) / (b - a)));
}

/** A ramp up from a→b that holds at 1 until c, then ramps back down to 0 by d. */
export function win(p: number, a: number, b: number, c: number, d: number): number {
  return Math.min(ramp(p, a, b), 1 - ramp(p, c, d));
}

/** A bell curve: ramps up into [a,b] and back down over [b,b+w] around the window. */
export function bell(x: number, a: number, b: number, w: number): number {
  return Math.min(ramp(x, a - w, a), 1 - ramp(x, b, b + w));
}

/** Smoothstep easing of a 0..1 value. */
export function ease(x: number): number {
  return x * x * (3 - 2 * x);
}

/** Piecewise-smoothstep camera-depth curve: scroll progress (0..1) → camera z. */
const CAMERA_KEYFRAMES: Array<[number, number]> = [
  [0, 0], [0.1, 40], [0.14, 80], [0.24, 160], [0.31, 250], [0.322, 262],
  [0.388, 306], [0.414, 326], [0.474, 378], [0.5, 398], [0.576, 450],
  [0.6, 466], [0.664, 496], [0.73, 528], [0.794, 552], [0.85, 578],
  [0.904, 604], [0.958, 626], [1, 720],
];

export function camFor(p: number): number {
  for (let i = 1; i < CAMERA_KEYFRAMES.length; i++) {
    const [pa, za] = CAMERA_KEYFRAMES[i - 1];
    const [pb, zb] = CAMERA_KEYFRAMES[i];
    if (p <= pb) {
      const t = (p - pa) / (pb - pa);
      return za + (zb - za) * ease(t);
    }
  }
  return 720;
}

export type Milestone = {
  x: number;
  y: number;
  z: number;
  /** Relative "gravity" — how large/bright the glow reads. */
  g: number;
  /** Override color [r,g,b]; null falls back to the current accent. */
  col: [number, number, number] | null;
  main?: boolean;
};

/** Milestone stars — gravity scales with the weight of the memory. */
export const MILESTONES: Milestone[] = [
  { x: -130, y: -60, z: 326, g: 0.5, col: null },
  { x: 150, y: 70, z: 396, g: 0.55, col: null },
  { x: 30, y: -30, z: 464, g: 1.2, col: [196, 70, 58] },
  { x: -165, y: 95, z: 526, g: 0.62, col: null },
  { x: 70, y: -40, z: 601, g: 1, col: null, main: true },
];

export const ACCENT_AMBER: [number, number, number] = [212, 160, 90];
export const ACCENT_RED: [number, number, number] = [200, 70, 50];
