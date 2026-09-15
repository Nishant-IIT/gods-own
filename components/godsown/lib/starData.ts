export type StarData = {
  count: number;
  position: Float32Array;
  aSize: Float32Array;
  aTwinkle: Float32Array;
  aSpeed: Float32Array;
  aWarm: Float32Array;
};

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
  const aWarm = new Float32Array(count);
  const rnd = (a: number, b: number) => a + Math.random() * (b - a);
  for (let i = 0; i < count; i++) {
    position[i * 3] = rnd(-700, 700);
    position[i * 3 + 1] = rnd(-450, 450);
    position[i * 3 + 2] = -rnd(0, 2400);
    aSize[i] = 0.35 + Math.pow(Math.random(), 2.2) * 1.5;
    aTwinkle[i] = rnd(0, 6.28);
    aSpeed[i] = rnd(0.4, 1.4);
    aWarm[i] = Math.random() < 0.14 ? 1 : 0;
  }
  return { count, position, aSize, aTwinkle, aSpeed, aWarm };
}
