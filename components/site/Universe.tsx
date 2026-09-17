'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useState } from 'react';
import { Dust } from '@/components/godsown/canvas/Dust';
import { PostFX } from '@/components/godsown/canvas/PostFX';
import { StarField } from '@/components/godsown/canvas/StarField';
import { camFor } from '@/components/godsown/lib/curves';
import { detectQuality } from '@/components/godsown/lib/quality';
import { scrollState } from '@/components/godsown/lib/scrollState';
import { generateStars } from '@/components/godsown/lib/starData';
import { ShootingStars } from '@/components/godsown/overlay/ShootingStars';

/**
 * A lighter stand-in for the journey's `Driver` — same shared `scrollState`
 * and camera-depth curve, but reading plain document scroll instead of a
 * GSAP-driven track, and with no chapter/text choreography to run (the site
 * pages are ordinary pages, not the single scroll-locked journey).
 */
function SiteDriver({ reduced }: { reduced: boolean }) {
  useFrame((state, delta) => {
    const dt = Math.min(50, delta * 1000) / 16.67;
    scrollState.t += dt / 60;
    scrollState.introDone = true;

    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const p = Math.min(1, Math.max(0, window.scrollY / max));
    scrollState.progress = p;

    const target = camFor(p);
    const k = reduced ? 1 : 1 - Math.pow(0.9, dt);
    const prevCamZ = scrollState.camZ;
    const nextCamZ = prevCamZ + (target - prevCamZ) * k;
    scrollState.velocity = reduced ? 0 : (nextCamZ - prevCamZ) / dt;
    scrollState.camZ = nextCamZ;

    const fl = reduced ? 0 : 1;
    const driftX = (Math.sin(scrollState.t * 0.31) * 6 + scrollState.pointerX * 24) * fl;
    const driftY = (Math.cos(scrollState.t * 0.23) * 4 + scrollState.pointerY * 16) * fl;
    state.camera.position.x += (driftX - state.camera.position.x) * 0.08;
    state.camera.position.y += (driftY - state.camera.position.y) * 0.08;
    state.camera.position.z = -nextCamZ;
  });
  return null;
}

/**
 * Fixed full-bleed starfield behind the studio site's pages — reuses the
 * journey's R3F star rendering (StarField/Dust/PostFX/ShootingStars) instead
 * of porting the design file's plain-2D-canvas `universe.js`, so the whole
 * site shares one rendering system.
 */
export function Universe() {
  const [quality] = useState(() => detectQuality());
  const stars = useMemo(() => generateStars(quality.starCount), [quality.starCount]);

  useEffect(() => {
    scrollState.introDone = true;
    const onMove = (e: PointerEvent) => {
      scrollState.clientX = e.clientX;
      scrollState.clientY = e.clientY;
      scrollState.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <div
      aria-hidden
      style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', background: '#000000', pointerEvents: 'none' }}
    >
      <Canvas
        style={{ position: 'absolute', inset: 0 }}
        dpr={quality.dpr}
        camera={{ fov: 55, near: 0.1, far: 4000, position: [0, 0, 0] }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 300, 2400]} />
        <SiteDriver reduced={quality.reduced} />
        <StarField data={stars} cursorEnabled={!quality.mobile} />
        <Dust count={quality.dustCount} />
        <PostFX bloom={quality.bloom} />
      </Canvas>
      <ShootingStars reduced={quality.reduced} />
    </div>
  );
}
