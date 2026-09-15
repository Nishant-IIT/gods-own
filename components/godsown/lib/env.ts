import { bell, ramp } from './curves';

/**
 * Environment density over the journey — ported from the prototype's `draw()`.
 * Void → sparse (Origin) → dense (Words into Sound) → sparse (Budh) → near-empty (end).
 * Drives star-field brightness, nebula opacity, and dust visibility so the
 * whole scene feels like one evolving organism rather than static sections.
 */
export function envDensity(p: number): number {
  return (
    0.3 +
    0.7 * ramp(p, 0.06, 0.18) -
    0.2 * bell(p, 0.27, 0.31, 0.04) +
    0.3 * bell(p, 0.33, 0.73, 0.04) -
    0.55 * bell(p, 0.836, 0.898, 0.03) -
    0.75 * ramp(p, 0.95, 0.99)
  );
}
