'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { scrollState } from '../lib/scrollState';
import type { StarData } from '../lib/starData';

const VERTEX = /* glsl */ `
  precision mediump float;
  attribute float aIsEnd;
  uniform float uVelocity;
  varying float vFade;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vFade = 1.0 - aIsEnd;
    // ported directly from the prototype's per-star streak: the trailing
    // endpoint is projected as if the camera were v*9 further/nearer,
    // i.e. "where this star was a moment ago" - a real, perspective-correct
    // motion blur (short for slow scrolls, longer only for a genuinely fast
    // flick), not an arbitrary radiating burst.
    if (aIsEnd > 0.5) {
      mvPosition.z -= uVelocity * 9.0;
    }
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT = /* glsl */ `
  precision mediump float;
  uniform float uStreakAlpha;
  varying float vFade;
  void main() {
    float alpha = vFade * uStreakAlpha;
    if (alpha < 0.004) discard;
    gl_FragColor = vec4(0.925, 0.902, 0.855, alpha);
  }
`;

/**
 * Per-star motion-blur trail, driven by camera velocity — ported from the
 * prototype's `draw()`: `if (streak > 0.05) { line from f/(dz+v*9) to f/dz }`.
 * Subtle at ordinary scroll speeds by design; only reads as a "streak" during
 * a genuinely fast flick or a big jump.
 */
export function StarStreaks({ data }: { data: StarData }) {
  const material = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const n = data.count;
    const position = new Float32Array(n * 2 * 3);
    const aIsEnd = new Float32Array(n * 2);
    for (let i = 0; i < n; i++) {
      const x = data.position[i * 3];
      const y = data.position[i * 3 + 1];
      const z = data.position[i * 3 + 2];
      for (const end of [0, 1]) {
        const j = i * 2 + end;
        position[j * 3] = x;
        position[j * 3 + 1] = y;
        position[j * 3 + 2] = z;
        aIsEnd[j] = end;
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(position, 3));
    geo.setAttribute('aIsEnd', new THREE.BufferAttribute(aIsEnd, 1));
    return geo;
  }, [data]);

  const uniforms = useMemo(() => ({ uVelocity: { value: 0 }, uStreakAlpha: { value: 0 } }), []);

  useFrame(() => {
    if (!material.current) return;
    const v = scrollState.velocity;
    material.current.uniforms.uVelocity.value = v;
    // matches the prototype's `a * 0.5 * streak` — half-strength, only
    // showing up once velocity clears a real threshold.
    const streak = Math.min(1, Math.abs(v) / 6);
    material.current.uniforms.uStreakAlpha.value = streak > 0.05 ? streak * 0.5 : 0;
  });

  return (
    <lineSegments geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={material}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}
