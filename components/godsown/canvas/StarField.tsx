'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { envDensity } from '../lib/env';
import { scrollState } from '../lib/scrollState';
import type { StarData } from '../lib/starData';

const VERTEX = /* glsl */ `
  attribute float aSize;
  attribute float aTwinkle;
  attribute float aSpeed;
  attribute float aWarm;
  uniform float uTime;
  uniform vec2 uCursor;
  uniform vec2 uResolution;
  uniform float uCursorActive;
  varying float vTwinkle;
  varying float vDepth;
  varying float vWarm;
  varying float vProx;
  void main() {
    vWarm = aWarm;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float dist = max(0.001, -mvPosition.z);
    // fade the very-near flash-past and the far edge of the field
    vDepth = smoothstep(0.0, 50.0, dist) * (1.0 - smoothstep(2100.0, 2500.0, dist));
    float wobble = 0.5 + 0.5 * sin(aTwinkle + uTime * aSpeed * 1.7);
    vTwinkle = 0.42 + 0.58 * pow(wobble, 1.6) * (0.72 + 0.28 * sin(aTwinkle * 2.3 + uTime * aSpeed * 0.6));
    vec4 clip = projectionMatrix * mvPosition;
    gl_Position = clip;

    // stars brighten as the cursor passes near them
    float prox = 0.0;
    if (uCursorActive > 0.5 && clip.w > 0.0) {
      vec2 ndc = vec2(clip.x, -clip.y) / clip.w;
      vec2 diffPx = (ndc - uCursor) * uResolution * 0.5;
      prox = clamp(1.0 - length(diffPx) / 155.0, 0.0, 1.0);
    }
    vProx = prox;

    float size = aSize * (340.0 / dist) * (1.0 + prox * 1.2);
    gl_PointSize = clamp(size, 0.6, 6.0 + prox * 14.0);
  }
`;

const FRAGMENT = /* glsl */ `
  precision mediump float;
  uniform float uEnv;
  varying float vTwinkle;
  varying float vDepth;
  varying float vWarm;
  varying float vProx;
  void main() {
    vec2 c = gl_PointCoord - vec2(0.5);
    float d = length(c) * 2.0;
    if (d > 1.0) discard;
    float core = smoothstep(1.0, 0.4, d) * vTwinkle * vDepth;
    float halo = smoothstep(1.0, 0.0, d) * vProx * 0.6;
    vec3 cool = vec3(0.925, 0.902, 0.855);
    vec3 warm = vec3(0.910, 0.784, 0.604);
    vec3 color = mix(cool, warm, vWarm);
    color = mix(color, vec3(1.0, 0.97, 0.9), vProx * 0.5);
    float alpha = max(core, halo) * max(0.15, uEnv);
    gl_FragColor = vec4(color, alpha);
  }
`;

export function StarField({ data, cursorEnabled }: { data: StarData; cursorEnabled: boolean }) {
  const material = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(data.position, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(data.aSize, 1));
    geo.setAttribute('aTwinkle', new THREE.BufferAttribute(data.aTwinkle, 1));
    geo.setAttribute('aSpeed', new THREE.BufferAttribute(data.aSpeed, 1));
    geo.setAttribute('aWarm', new THREE.BufferAttribute(data.aWarm, 1));
    return geo;
  }, [data]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uEnv: { value: 1 },
      uCursor: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uCursorActive: { value: 0 },
    }),
    [],
  );

  useFrame((state, delta) => {
    if (!material.current) return;
    const u = material.current.uniforms;
    u.uTime.value += delta;
    u.uEnv.value = envDensity(scrollState.progress);
    u.uResolution.value.set(state.size.width, state.size.height);
    const active = cursorEnabled && scrollState.clientX > -50;
    u.uCursorActive.value = active ? 1 : 0;
    if (active) u.uCursor.value.set(scrollState.pointerX, scrollState.pointerY);
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={material}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
