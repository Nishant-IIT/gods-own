export type StarData = {
  count: number;
  position: Float32Array;
  aSize: Float32Array;
  aTwinkle: Float32Array;
  aSpeed: Float32Array;
  /** Spectral temperature: 0 = hot blue-white (O/B) … 1 = cool red (M). */
  aTemp: Float32Array;
  /** Diffraction-spike strength: 0 for ordinary stars … 1 for the brightest. */
  aFlare: Float32Array;
};

type SpectralClass = {
  weight: number;
  size: readonly [number, number];
  temp: readonly [number, number];
  flare: number;
  speed: readonly [number, number];
};

/**
 * The classes the field is drawn from — a loose nod to the main sequence
 * rather than real astrophysics: mostly small red and orange dwarfs, fewer
 * white and blue giants, and a scattering of supergiant beacons bright
 * enough to throw diffraction spikes. `weight` is relative, not a percentage.
 *
 * Bigger stars get a slower `speed` because atmospheric scintillation is what
 * twinkling really is — the brighter, wider sources shimmer far less.
 */
const CLASSES: readonly SpectralClass[] = [
  // M — red dwarf: the most common star in the sky, small and deep orange-red
  { weight: 30, size: [0.55, 0.95], temp: [0.88, 1.0], flare: 0.0, speed: [0.9, 1.8] },
  // K — orange dwarf
  { weight: 22, size: [0.8, 1.3], temp: [0.68, 0.86], flare: 0.0, speed: [0.7, 1.5] },
  // G — sun-like, cream yellow
  { weight: 18, size: [1.1, 1.7], temp: [0.46, 0.66], flare: 0.14, speed: [0.55, 1.2] },
  // A/F — white
  { weight: 15, size: [1.5, 2.3], temp: [0.24, 0.44], flare: 0.38, speed: [0.4, 0.9] },
  // B — blue giant
  { weight: 10, size: [2.1, 3.1], temp: [0.04, 0.22], flare: 0.62, speed: [0.3, 0.7] },
  // supergiant beacon — the full temp range, so both Rigel-blue and Betelgeuse-red turn up
  { weight: 5, size: [3.2, 4.6], temp: [0.0, 1.0], flare: 1.0, speed: [0.2, 0.5] },
];

const TOTAL_WEIGHT = CLASSES.reduce((sum, c) => sum + c.weight, 0);

function pickClass(): SpectralClass {
  let r = Math.random() * TOTAL_WEIGHT;
  for (const c of CLASSES) {
    r -= c.weight;
    if (r <= 0) return c;
  }
  return CLASSES[0];
}

/**
 * Generates the star field once. Shared by `StarField` (the points
 * themselves) and `StarStreaks` (the velocity-driven light trails) so both
 * draw calls agree on exactly where every star is — call this once per
 * mount (in `Scene`) and pass the result down, rather than letting each
 * component generate its own random field.
 */
export function generateStars(count: number): StarData {
  const position = new Float32Array(count * 3);
  const aSize = new Float32Array(count);
  const aTwinkle = new Float32Array(count);
  const aSpeed = new Float32Array(count);
  const aTemp = new Float32Array(count);
  const aFlare = new Float32Array(count);
  const rnd = (a: number, b: number) => a + Math.random() * (b - a);
  for (let i = 0; i < count; i++) {
    position[i * 3] = rnd(-700, 700);
    position[i * 3 + 1] = rnd(-450, 450);
    position[i * 3 + 2] = -rnd(0, 2400);
    const c = pickClass();
    aSize[i] = rnd(c.size[0], c.size[1]);
    aTemp[i] = rnd(c.temp[0], c.temp[1]);
    aFlare[i] = c.flare === 0 ? 0 : c.flare * rnd(0.7, 1);
    aSpeed[i] = rnd(c.speed[0], c.speed[1]);
    aTwinkle[i] = rnd(0, 6.28);
  }
  return { count, position, aSize, aTwinkle, aSpeed, aTemp, aFlare };
}
