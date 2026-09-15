'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { CHAPTERS, DUR, HERO, camFor, ease } from '../lib/curves';
import { scrollState } from '../lib/scrollState';
import { applyChoreography, type Refs } from '../lib/textChoreography';

/**
 * The single per-frame orchestrator — camera dolly, DOM text choreography,
 * and the intro scroll-lock all come from one continuous progress value,
 * exactly like the prototype's one `loop()`. This has to run every animation
 * frame (not just on scroll events): several beats — the equalizer bars, the
 * Malhari letter-hit, the hero title reveal itself — are functions of
 * elapsed time, not just scroll position, so a locked or idle viewport still
 * has to keep animating.
 *
 * GSAP/ScrollTrigger (wired up in Experience) supplies `scrollState.rawScroll`,
 * the robust 0..1 scroll fraction; this driver blends that with the
 * time-based intro reveal and hands the result to `applyChoreography`, which
 * writes every element via `gsap.set`.
 */
export function Driver({
  refs,
  reduced,
  onActiveChapter,
}: {
  refs: React.MutableRefObject<Refs>;
  reduced: boolean;
  onActiveChapter: (i: number) => void;
}) {
  const t = useRef(0);
  const introT = useRef(0);
  const activeRef = useRef(0);

  useFrame((state, delta) => {
    const dt = Math.min(50, delta * 1000) / 16.67;
    t.current += dt / 60;
    scrollState.t = t.current;

    let p: number;
    if (!scrollState.introDone) {
      introT.current += reduced ? DUR : dt / 60;
      const u = Math.min(1, introT.current / DUR);
      p = HERO * ease(u);
      if (u >= 1) scrollState.introDone = true;
    } else {
      p = HERO + (1 - HERO) * scrollState.rawScroll;
    }
    scrollState.progress = p;

    const target = camFor(p);
    const k = reduced ? 1 : 1 - Math.pow(0.88, dt);
    const prevCamZ = scrollState.camZ;
    const nextCamZ = prevCamZ + (target - prevCamZ) * k;
    scrollState.velocity = reduced ? 0 : (nextCamZ - prevCamZ) / dt;
    scrollState.camZ = nextCamZ;

    const fl = reduced ? 0 : 1;
    const driftX = (Math.sin(t.current * 0.31) * 6 + scrollState.pointerX * 26) * fl;
    const driftY = (Math.cos(t.current * 0.23) * 4 + scrollState.pointerY * 18) * fl;
    state.camera.position.x += (driftX - state.camera.position.x) * 0.08;
    state.camera.position.y += (driftY - state.camera.position.y) * 0.08;
    state.camera.position.z = -nextCamZ;

    let active = 0;
    CHAPTERS.forEach((c, i) => {
      if (p >= c.from) active = i;
    });
    if (active !== activeRef.current) {
      activeRef.current = active;
      onActiveChapter(active);
    }

    applyChoreography(p, refs.current, { t: t.current, reduced });
  });

  return null;
}
