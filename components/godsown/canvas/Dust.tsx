'use client';

// See the note in StarField.tsx: useFrame mutating memoized three.js state
// every animation frame is the standard R3F pattern, not a purity bug.
/* eslint-disable react-hooks/purity, react-hooks/immutability */

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { envDensity } from '../lib/env';
import { scrollState } from '../lib/scrollState';
import { ramp } from '../lib/curves';

type Particle = { x: number; y: number; z: number; r: number; a: number; dx: number; dy: number };

const VERTEX = /* glsl */ `
  attribute float aRadius;
  attribute float aAlpha;
  varying float vAlpha;
  void main() {
    vAlpha = aAlpha;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aRadius * (220.0 / max(0.001, -mvPosition.z)) * 8.0;
  }
`;

const FRAGMENT = /* glsl */ `
  precision mediump float;
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - vec2(0.5);
    float d = length(c);
    if (d > 0.5) discard;
    float edge = smoothstep(0.5, 0.1, d);
    gl_FragColor = vec4(0.851, 0.804, 0.722, edge * vAlpha);
  }
`;

/**
 * Near-camera atmospheric dust. Unlike the main star field (which the camera
 * only ever travels partway into), dust has to stay close to the camera for
 * the whole journey, so — same as the prototype — particles recycle forward
 * once the camera passes them.
 */
export function Dust({ count }: { count: number }) {
  const material = useRef<THREE.ShaderMaterial>(null);

  const { geometry, particles } = useMemo(() => {
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: rnd(-500, 500),
      y: rnd(-350, 350),
      z: rnd(10, 320),
      r: rnd(1.5, 4.5),
      a: rnd(0.03, 0.09),
      dx: rnd(-0.08, 0.08),
      dy: rnd(-0.05, 0.05),
    }));
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    geo.setAttribute('aRadius', new THREE.BufferAttribute(new Float32Array(count), 1));
    geo.setAttribute('aAlpha', new THREE.BufferAttribute(new Float32Array(count), 1));
    return { geometry: geo, particles };
  }, [count]);

  useFrame(() => {
    const camZ = scrollState.camZ;
    const env = envDensity(scrollState.progress);
    const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
    const radiusAttr = geometry.getAttribute('aRadius') as THREE.BufferAttribute;
    const alphaAttr = geometry.getAttribute('aAlpha') as THREE.BufferAttribute;
    const fadeOut = 1 - ramp(scrollState.progress, 0.95, 0.99);

    for (let i = 0; i < particles.length; i++) {
      const d = particles[i];
      d.x += d.dx;
      d.y += d.dy;
      let dz = d.z - camZ;
      if (dz < 4) {
        d.z += 320;
        dz = d.z - camZ;
      }
      if (dz > 340) {
        d.z -= 320;
        dz = d.z - camZ;
      }
      posAttr.setXYZ(i, d.x, d.y, -d.z);
      radiusAttr.setX(i, d.r);
      alphaAttr.setX(i, d.a * Math.min(1, dz / 40) * (0.5 + 0.5 * env) * fadeOut);
    }
    posAttr.needsUpdate = true;
    radiusAttr.needsUpdate = true;
    alphaAttr.needsUpdate = true;
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={material}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}
