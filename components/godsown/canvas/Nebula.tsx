'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { bell } from '../lib/curves';
import { envDensity } from '../lib/env';
import { scrollState } from '../lib/scrollState';

function radialGradientTexture(color: [number, number, number]): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, `rgba(${color[0]},${color[1]},${color[2]},0.35)`);
  g.addColorStop(1, `rgba(${color[0]},${color[1]},${color[2]},0)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

const ACCENT: [number, number, number] = [212, 160, 90];
const RED: [number, number, number] = [196, 70, 58];
const GREY: [number, number, number] = [150, 140, 130];

/**
 * Two soft, slowly-drifting background nebulae — a warm one (leaning red near
 * the Malhari peak) and a cool grey one — ported from the prototype's
 * `nebSprite()` canvas-gradient trick, now a billboarded WebGL sprite instead
 * of a redrawn 2D canvas.
 */
export function Nebula() {
  const warmRef = useRef<THREE.Sprite>(null);
  const coolRef = useRef<THREE.Sprite>(null);
  const { viewport } = useThree();

  const warmTex = useMemo(() => radialGradientTexture(ACCENT), []);
  const redTex = useMemo(() => radialGradientTexture(RED), []);
  const coolTex = useMemo(() => radialGradientTexture(GREY), []);

  useFrame(({ camera, clock }) => {
    const p = scrollState.progress;
    const env = envDensity(p);
    const redness = bell(p, 0.516, 0.585, 0.04);
    const t = clock.elapsedTime;
    const scale = Math.max(viewport.width, viewport.height) * 1.4;

    if (warmRef.current) {
      warmRef.current.material.map = redness > 0.5 ? redTex : warmTex;
      warmRef.current.material.opacity = Math.min(1, env * 1.4) * (0.35 + 0.25 * redness);
      warmRef.current.material.needsUpdate = true;
      warmRef.current.scale.setScalar(scale * (1.6 + redness * 0.6));
      warmRef.current.position.set(
        camera.position.x + Math.sin(t * 0.05) * 40 - 120,
        camera.position.y + 60,
        camera.position.z - 260,
      );
    }
    if (coolRef.current) {
      coolRef.current.material.opacity = Math.min(1, env) * 0.3;
      coolRef.current.scale.setScalar(scale * 1.3);
      coolRef.current.position.set(camera.position.x + 180, camera.position.y - 80, camera.position.z - 340);
    }
  });

  return (
    <>
      <sprite ref={warmRef}>
        <spriteMaterial map={warmTex} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      <sprite ref={coolRef}>
        <spriteMaterial map={coolTex} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
    </>
  );
}
