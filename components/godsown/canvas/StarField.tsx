'use client';

/**
 * eslint-disable react-hooks/purity, react-hooks/immutability --
 * the new React Compiler-oriented hook rules assume everything reachable
 * during render must be pure/immutable. This component's `useMemo` builds a
 * one-time random star layout (never meant to change once `count` is fixed)
 * and `useFrame` — which runs entirely outside React's render cycle, once per
 * animation frame — mutates the resulting three.js objects imperatively.
 * That's the standard, correct react-three-fiber pattern (see the library's
 * own docs: "mutate refs in useFrame"), not a purity violation in practice.
 */
/* eslint-disable react-hooks/purity */

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { envDensity } from '../lib/env';
import { scrollState } from '../lib/scrollState';

const VERTEX = /* glsl */ `
  attribute float aSize;
  attribute float aTwinkle;
  attribute float aSpeed;
  attribute float aWarm;
  uniform float uTime;
  varying float vTwinkle;
  varying float vDepth;
  varying float vWarm;
  void main() {
    vWarm = aWarm;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float dist = max(0.001, -mvPosition.z);
    // fade the very-near flash-past and the far edge of the field
    vDepth = smoothstep(0.0, 50.0, dist) * (1.0 - smoothstep(2100.0, 2500.0, dist));
    float wobble = 0.5 + 0.5 * sin(aTwinkle + uTime * aSpeed * 1.7);
    vTwinkle = 0.42 + 0.58 * pow(wobble, 1.6) * (0.72 + 0.28 * sin(aTwinkle * 2.3 + uTime * aSpeed * 0.6));
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = clamp(aSize * (340.0 / dist), 0.6, 6.0);
  }
`;

const FRAGMENT = /* glsl */ `
  precision mediump float;
  uniform float uEnv;
  varying float vTwinkle;
  varying float vDepth;
  varying float vWarm;
  void main() {
    vec2 c = gl_PointCoord - vec2(0.5);
    float d = length(c);
    if (d > 0.5) discard;
    float edge = smoothstep(0.5, 0.3, d);
    vec3 cool = vec3(0.925, 0.902, 0.855);
    vec3 warm = vec3(0.910, 0.784, 0.604);
    vec3 color = mix(cool, warm, vWarm);
    float alpha = edge * vDepth * vTwinkle * max(0.15, uEnv);
    gl_FragColor = vec4(color, alpha);
  }
`;

export function StarField({ count }: { count: number }) {
  const material = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
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
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(position, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(aSize, 1));
    geo.setAttribute('aTwinkle', new THREE.BufferAttribute(aTwinkle, 1));
    geo.setAttribute('aSpeed', new THREE.BufferAttribute(aSpeed, 1));
    geo.setAttribute('aWarm', new THREE.BufferAttribute(aWarm, 1));
    return geo;
  }, [count]);

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uEnv: { value: 1 } }),
    [],
  );

  useFrame((_, delta) => {
    if (!material.current) return;
    material.current.uniforms.uTime.value += delta;
    material.current.uniforms.uEnv.value = envDensity(scrollState.progress);
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
