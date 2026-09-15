import gsap from 'gsap';
import { bell, ease, ramp, win } from './curves';

export type Refs = Record<string, HTMLElement | null | undefined>;

function setEl(el: HTMLElement | null | undefined, opacity: number, transform?: string, blur?: number) {
  if (!el) return;
  const vars: Record<string, string | number> = { opacity };
  if (transform !== undefined) vars.transform = transform;
  if (blur !== undefined) vars.filter = blur > 0.05 ? `blur(${blur.toFixed(1)}px)` : 'none';
  gsap.set(el, vars);
}

/**
 * Drives every chapter's typography from a single scroll progress value.
 * Ported near-verbatim from the prototype's `updateText()` — same breakpoints,
 * same easing windows — with `el.style.x =` swapped for `gsap.set()` so GSAP
 * owns the actual DOM writes (batched, GPU-friendly) while ScrollTrigger owns
 * turning scroll position into `progress`.
 */
export function applyChoreography(p: number, R: Refs, ctx: { t: number; reduced: boolean }) {
  const { t } = ctx;
  const fl = ctx.reduced ? 0 : 1;
  const W = typeof window !== 'undefined' ? window.innerWidth : 1440;
  const H = typeof window !== 'undefined' ? window.innerHeight : 900;

  // 01 ORIGIN — hero
  const ti = ease(ramp(p, 0.01, 0.05));
  const to = 1 - ramp(p, 0.105, 0.132);
  if (R.title) {
    R.title.style.letterSpacing = (0.62 - 0.44 * ti) + 'em';
    R.title.style.textIndent = (0.62 - 0.44 * ti) + 'em';
  }
  setEl(
    R.title,
    Math.min(ti, to),
    `translate(-50%,-50%) scale(${(0.96 + 0.04 * ti + 0.12 * (1 - to)).toFixed(3)})`,
    (1 - ti) * 14 + (1 - to) * 8,
  );
  const ta = win(p, 0.055, 0.08, 0.105, 0.128);
  setEl(R.tagline, ta, `translate(-50%,${((1 - ramp(p, 0.055, 0.08)) * 12).toFixed(1)}px)`);
  const by = win(p, 0.078, 0.098, 0.105, 0.128);
  setEl(R.byline, by, `translate(-50%,${((1 - ramp(p, 0.078, 0.098)) * 10).toFixed(1)}px)`);

  // 02 WORDS — wordmark; the absence is the design
  const wmi = ease(ramp(p, 0.145, 0.16));
  const wmo = 1 - ramp(p, 0.176, 0.185);
  const wordmarkFirstChild = R.wordmark?.firstElementChild;
  if (wordmarkFirstChild instanceof HTMLElement) {
    wordmarkFirstChild.style.letterSpacing = (0.4 - 0.18 * wmi) + 'em';
  }
  setEl(
    R.wordmark,
    Math.min(wmi, wmo),
    `translate(-50%,calc(-50% + ${((1 - wmi) * 20 - (1 - wmo) * 26).toFixed(1)}px)) scale(${(0.94 + 0.06 * wmi + (1 - wmo) * 0.18).toFixed(3)})`,
    (1 - wmi) * 12 + (1 - wmo) * 8,
  );
  setEl(R.wordsub, ramp(p, 0.16, 0.17));

  const linePos: Array<[number, number, number]> = [
    [0, -0.15, 0],
    [0, -0.05, 0],
    [0, 0.05, 0],
    [0, 0.16, -3],
  ];
  const lineAt = [0.192, 0.2, 0.208, 0.216];
  const linesOut = 1 - ramp(p, 0.238, 0.25);
  linePos.forEach(([u, v, rot], i) => {
    const a = lineAt[i];
    const li = ramp(p, a, a + 0.008);
    const prog = ease(li);
    const x = u * W + Math.sin(t * 0.5 + i) * 3 * fl;
    const y = v * H + (1 - prog) * 26 + Math.cos(t * 0.4 + i) * 2 * fl - (1 - linesOut) * 30;
    setEl(
      R['line' + i],
      Math.min(prog, linesOut),
      `translate(calc(-50% + ${x.toFixed(1)}px),calc(-50% + ${y.toFixed(1)}px)) rotate(${rot}deg) scale(${(0.9 + 0.1 * prog + (1 - linesOut) * 0.15).toFixed(3)})`,
      (1 - li) * 8 + (1 - linesOut) * 6,
    );
  });

  const qi = ease(ramp(p, 0.256, 0.274));
  const qo = 1 - ramp(p, 0.3, 0.316);
  setEl(
    R.quote,
    Math.min(qi, qo),
    `translate(-50%,calc(-50% + ${((1 - qi) * 30).toFixed(1)}px)) scale(${(0.96 + 0.04 * qi + (1 - qo) * 0.12).toFixed(3)})`,
    (1 - qi) * 14 + (1 - qo) * 10,
  );

  // 03 SOUND — scene 1: Party On My Mind, the breakthrough, fast
  const s1i = ease(ramp(p, 0.322, 0.34));
  const s1o = 1 - ramp(p, 0.388, 0.404);
  [0, 1, 2].forEach((i) => {
    const a = ramp(p, 0.322 + i * 0.007, 0.338 + i * 0.007);
    setEl(R['p' + i], a, `translateX(${((1 - ease(a)) * (i % 2 ? 46 : -46)).toFixed(1)}px)`);
  });
  setEl(
    R.sc1,
    Math.min(1, s1i * 1.4) * s1o,
    `translate(calc(-50% + ${(-W * 0.06 - (1 - s1o) * W * 0.3).toFixed(1)}px),calc(-50% + ${(-H * 0.04 + Math.sin(t * 0.5) * 3 * fl).toFixed(1)}px)) scale(${(0.9 + 0.1 * s1i + (1 - s1o) * 0.55).toFixed(3)})`,
    (1 - s1i) * 10 + (1 - s1o) * 10,
  );
  const imi = ease(ramp(p, 0.328, 0.346));
  const imo = 1 - ramp(p, 0.386, 0.402);
  setEl(
    R.sc1img,
    Math.min(imi, imo) * 0.85,
    `translate(-50%,-50%) scale(${(1.08 - 0.06 * imi + (1 - imo) * 0.2).toFixed(3)})`,
    (1 - imi) * 12 + (1 - imo) * 8,
  );
  const wv = win(p, 0.332, 0.346, 0.386, 0.4);
  const beat1 = 0.7 + 0.3 * Math.abs(Math.sin(t * 4.2));
  setEl(R.wave, wv * 0.8, `translateX(-50%) scaleY(${(ctx.reduced ? 1 : beat1).toFixed(3)})`);
  const mt = win(p, 0.34, 0.352, 0.386, 0.4);
  setEl(R.sc1meta, mt, `translate(calc(-50% + ${(-W * 0.06).toFixed(1)}px),calc(-50% + ${(H * 0.14).toFixed(1)}px))`);
  const sti = ease(ramp(p, 0.357, 0.37));
  const sto = 1 - ramp(p, 0.388, 0.404);
  setEl(
    R.sc1story,
    Math.min(sti, sto),
    `translate(calc(-50% + ${(W * 0.04).toFixed(1)}px),calc(-50% + ${(H * 0.3 + (1 - sti) * 26).toFixed(1)}px))`,
    (1 - sti) * 8 + (1 - sto) * 8,
  );

  // 03 SOUND — scene 2: Ziddi Dil, why the song exists
  const z1i = ease(ramp(p, 0.414, 0.43));
  const z1o = 1 - ramp(p, 0.474, 0.488);
  setEl(
    R.sc2,
    Math.min(z1i, z1o),
    `translate(calc(-50% + ${(-W * 0.16 + (1 - z1i) * W * 0.1 - (1 - z1o) * W * 0.2).toFixed(1)}px),calc(-50% + ${(-H * 0.22 + Math.cos(t * 0.45) * 3 * fl).toFixed(1)}px)) scale(${(0.9 + 0.1 * z1i).toFixed(3)})`,
    (1 - z1i) * 10 + (1 - z1o) * 8,
  );
  setEl(R.sc2meta, ramp(p, 0.428, 0.438));
  const z2i = ease(ramp(p, 0.432, 0.446));
  const z2o = 1 - ramp(p, 0.472, 0.486);
  setEl(
    R.sc2img,
    Math.min(z2i, z2o) * 0.8,
    `translate(calc(-50% + ${(W * 0.22).toFixed(1)}px),calc(-50% + ${(-H * 0.02).toFixed(1)}px)) scale(${(1.06 - 0.06 * z2i + (1 - z2o) * 0.16).toFixed(3)})`,
    (1 - z2i) * 12 + (1 - z2o) * 8,
  );
  setEl(
    R.sc2words,
    win(p, 0.434, 0.446, 0.472, 0.486),
    `translate(calc(-50% + ${(-W * 0.2).toFixed(1)}px),calc(-50% + ${(H * 0.1).toFixed(1)}px))`,
  );
  [0, 1, 2].forEach((i) => {
    const a = ramp(p, 0.434 + i * 0.008, 0.448 + i * 0.008);
    setEl(R['zw' + i], a, `translateY(${((1 - ease(a)) * 16).toFixed(1)}px)`);
  });
  const wyi = ease(ramp(p, 0.452, 0.464));
  const wyo = 1 - ramp(p, 0.474, 0.488);
  setEl(
    R.sc2why,
    Math.min(wyi, wyo),
    `translate(calc(-50% + ${(W * 0.02).toFixed(1)}px),calc(-50% + ${(H * 0.3 + (1 - wyi) * 26).toFixed(1)}px))`,
    (1 - wyi) * 8 + (1 - wyo) * 8,
  );

  // 03 SOUND — scene 3: Malhari, the climax; letters find the beat
  const mi = ease(ramp(p, 0.5, 0.538));
  const mo = 1 - ramp(p, 0.576, 0.59);
  const moffs: Array<[number, number]> = [
    [-260, -120], [-150, 90], [-60, -160], [0, 140], [70, -90], [170, 120], [280, -60],
  ];
  const beatOn = bell(p, 0.538, 0.574, 0.012) * (ctx.reduced ? 0 : 1);
  moffs.forEach(([dx, dy], i) => {
    const a = ramp(p, 0.5 + i * 0.005, 0.532 + i * 0.005);
    const hit = Math.pow(Math.max(0, Math.sin(t * 4.2 - i * 0.32)), 6) * beatOn;
    setEl(
      R['m' + i],
      a,
      `translate(${(dx * (1 - mi)).toFixed(1)}px,${(dy * (1 - mi) - hit * 14).toFixed(1)}px) scale(${(1 + hit * 0.06).toFixed(3)})`,
    );
  });
  setEl(R.malcred, win(p, 0.544, 0.558, 0.576, 0.588), `translate(-50%,${((1 - ramp(p, 0.544, 0.558)) * 12).toFixed(1)}px)`);
  setEl(
    R.mal,
    Math.min(1, mi * 1.4) * mo,
    `translate(-50%,-50%) scale(${(0.92 + 0.08 * mi + (1 - mo) * 0.5).toFixed(3)})`,
    (1 - mo) * 10,
  );
  const m3i = ease(ramp(p, 0.522, 0.542));
  const m3o = 1 - ramp(p, 0.574, 0.588);
  setEl(
    R.sc3img,
    Math.min(m3i, m3o) * 0.7,
    `translate(-50%,-50%) scale(${(1.1 - 0.08 * m3i + (1 - m3o) * 0.2).toFixed(3)})`,
    (1 - m3i) * 14 + (1 - m3o) * 8,
  );

  // 03 SOUND — scene 4: Gajanana — the research becomes the scene
  const g4i = ease(ramp(p, 0.578, 0.6));
  const g4o = 1 - ramp(p, 0.638, 0.652);
  setEl(
    R.sc4,
    Math.min(1, g4i * 1.3) * g4o,
    `translate(-50%,calc(-50% + ${((1 - g4i) * 30 - (1 - g4o) * 34).toFixed(1)}px)) scale(${(0.95 + 0.05 * g4i + (1 - g4o) * 0.16).toFixed(3)})`,
    (1 - g4o) * 8,
  );
  for (let i = 0; i < 8; i++) {
    const a = ramp(p, 0.578 + i * 0.0035, 0.598 + i * 0.0035);
    setEl(R['j' + i], a, `translateY(${((1 - ease(a)) * 44).toFixed(1)}px)`, (1 - a) * 7);
  }
  setEl(R.sc4meta, ramp(p, 0.606, 0.618));
  const gni = ease(ramp(p, 0.618, 0.63));
  setEl(R.sc4note, gni, `translateY(${((1 - gni) * 20).toFixed(1)}px)`, (1 - gni) * 6);
  const ggi = ease(ramp(p, 0.584, 0.608));
  setEl(
    R.sc4ghost,
    Math.min(ggi, g4o) * 0.06,
    `translate(-50%,calc(-50% + ${(Math.sin(t * 0.25) * 6 * fl).toFixed(1)}px)) scale(${(0.88 + 0.12 * ggi).toFixed(3)})`,
  );
  const g4mi = ease(ramp(p, 0.582, 0.606));
  setEl(
    R.sc4img,
    Math.min(g4mi, g4o) * 0.62,
    `translate(-50%,-50%) scale(${(1.08 - 0.08 * g4mi + (1 - g4o) * 0.18).toFixed(3)})`,
    (1 - g4mi) * 12 + (1 - g4o) * 8,
  );

  // 03 SOUND — scene 5: Pal — the moment
  const p5i = ease(ramp(p, 0.664, 0.686));
  const p5o = 1 - ramp(p, 0.716, 0.73);
  setEl(
    R.sc5,
    Math.min(1, p5i * 1.3) * p5o,
    `translate(-50%,calc(-50% + ${((1 - p5i) * 30 - (1 - p5o) * 34).toFixed(1)}px)) scale(${(0.95 + 0.05 * p5i + (1 - p5o) * 0.16).toFixed(3)})`,
    (1 - p5o) * 8,
  );
  for (let i = 0; i < 3; i++) {
    const a = ramp(p, 0.664 + i * 0.006, 0.686 + i * 0.006);
    setEl(R['q' + i], a, `translateY(${((1 - ease(a)) * 40).toFixed(1)}px)`, (1 - a) * 7);
  }
  const p5g = ease(ramp(p, 0.69, 0.702));
  setEl(R.sc5gloss, p5g, `translateY(${((1 - p5g) * 14).toFixed(1)}px) rotate(-3deg)`);
  setEl(R.sc5meta, ramp(p, 0.698, 0.71));
  const p5h = ease(ramp(p, 0.668, 0.692));
  setEl(
    R.sc5ghost,
    Math.min(p5h, p5o) * 0.07,
    `translate(-50%,calc(-50% + ${(Math.sin(t * 0.22) * 6 * fl).toFixed(1)}px)) scale(${(0.9 + 0.1 * p5h).toFixed(3)})`,
  );
  const p5m = ease(ramp(p, 0.666, 0.69));
  setEl(
    R.sc5img,
    Math.min(p5m, p5o) * 0.6,
    `translate(-50%,-50%) scale(${(1.08 - 0.08 * p5m + (1 - p5o) * 0.18).toFixed(3)})`,
    (1 - p5m) * 12 + (1 - p5o) * 8,
  );

  // 03 SOUND — the body of work: two points passing, each drawing its own line
  const wi = ease(ramp(p, 0.722, 0.736));
  const wo = 1 - ramp(p, 0.768, 0.782);
  setEl(
    R.works,
    Math.min(1, wi * 1.4) * wo,
    `translate(-50%,calc(-50% + ${((1 - wi) * 34 - (1 - wo) * H * 0.16).toFixed(1)}px)) scale(${(0.96 + 0.04 * wi + (1 - wo) * 0.12).toFixed(3)})`,
    (1 - wo) * 7,
  );
  setEl(R.wlabel, ramp(p, 0.722, 0.732));
  [0, 1].forEach((i) => {
    const a = ramp(p, 0.726 + i * 0.009, 0.742 + i * 0.009);
    const e = ease(a);
    setEl(R['w' + i], a, `translateX(${((1 - e) * -44).toFixed(1)}px)`, (1 - a) * 6);
    const rl = R['r' + i];
    if (rl) rl.style.transform = `scaleX(${ease(ramp(p, 0.733 + i * 0.009, 0.751 + i * 0.009)).toFixed(3)})`;
  });

  // 04 CINEMA — words become worlds
  const starts: Array<[number, number]> = [[-0.24, -0.2], [0.22, -0.11], [-0.17, 0.17], [0.23, 0.15]];
  const ins = [0.794, 0.802, 0.81, 0.818];
  const conv = ease(ramp(p, 0.824, 0.836));
  const out = 1 - ramp(p, 0.83, 0.838);
  starts.forEach(([u, v], i) => {
    const a = ramp(p, ins[i], ins[i] + 0.007);
    const o = Math.min(a, out);
    const x = u * W * (1 - conv) + Math.sin(t * 0.4 + i) * 5 * fl * (1 - conv);
    const y = v * H * (1 - conv) + Math.cos(t * 0.35 + i * 2) * 4 * fl * (1 - conv);
    const sc = 0.55 + 0.45 * ease(a) - 0.25 * conv;
    setEl(
      R['frag' + i],
      o,
      `translate(calc(-50% + ${x.toFixed(1)}px),calc(-50% + ${y.toFixed(1)}px)) scale(${sc.toFixed(3)})`,
      (1 - a) * 10 + conv * 6,
    );
  });
  const bi = ease(ramp(p, 0.834, 0.85));
  const bo = 1 - ramp(p, 0.888, 0.898);
  const offs: Array<[number, number]> = [[-190, -70], [-60, 110], [70, -120], [200, 50]];
  offs.forEach(([dx, dy], i) =>
    setEl(
      R['b' + i],
      ramp(p, 0.834 + i * 0.003, 0.846 + i * 0.003),
      `translate(${(dx * (1 - bi)).toFixed(1)}px,${(dy * (1 - bi)).toFixed(1)}px)`,
    ),
  );
  setEl(R.budh, Math.min(1, bi * 1.5) * bo, `translate(-50%,-50%) scale(${(1 + (1 - bo) * 0.7).toFixed(3)})`, (1 - bo) * 10);
  setEl(R.awak, win(p, 0.854, 0.862, 0.888, 0.898), `translate(-50%,${((1 - ramp(p, 0.854, 0.862)) * 10).toFixed(1)}px)`);
  setEl(R.credits, win(p, 0.864, 0.872, 0.888, 0.898), `translate(-50%,${((1 - ramp(p, 0.864, 0.872)) * 10).toFixed(1)}px)`);
  const fi = ease(ramp(p, 0.904, 0.918));
  const fo = 1 - ramp(p, 0.942, 0.954);
  setEl(
    R.frame,
    fi * fo * 0.92,
    `translate(-50%,calc(-50% + ${(H * 0.3 * (1 - fi) + Math.sin(t * 0.3) * 3 * fl).toFixed(1)}px)) scale(${(0.7 + 0.3 * fi + (1 - fo) * 0.5).toFixed(3)})`,
    (1 - fi) * 10 + (1 - fo) * 8,
  );

  // 05 JOURNEY / 06 CONNECT
  const fu = win(p, 0.958, 0.966, 0.976, 0.984);
  const fuIn = ease(ramp(p, 0.958, 0.966));
  setEl(R.future, fu, `translate(-50%,-50%) scale(${(1.06 - 0.06 * fuIn).toFixed(3)})`, (1 - fuIn) * 8);
  setEl(R.inf, win(p, 0.966, 0.972, 0.976, 0.984), `translate(-50%,${((1 - ramp(p, 0.966, 0.972)) * 8).toFixed(1)}px)`);
  const fn = ease(ramp(p, 0.982, 0.99));
  setEl(R.final, fn, `translate(-50%,-50%) translateY(${((1 - fn) * 14).toFixed(1)}px)`);
}
