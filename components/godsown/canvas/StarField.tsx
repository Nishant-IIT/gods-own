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
  attribute float aTemp;
  attribute float aFlare;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform vec2 uCursor;
  uniform vec2 uResolution;
  uniform float uCursorActive;
  varying float vTwinkle;
  varying float vDepth;
  varying float vTemp;
  varying float vProx;
  varying float vFlare;
  varying float vCoreFrac;
  void main() {
    vTemp = aTemp;
    vFlare = aFlare;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float dist = max(0.001, -mvPosition.z);
    // fade the very-near flash-past and the far edge of the field
    vDepth = smoothstep(0.0, 50.0, dist) * (1.0 - smoothstep(2100.0, 2500.0, dist));
    // apparent brightness climbs with class, so the sky reads as a mix of
    // faint and blazing stars rather than one uniform intensity. This is the
    // variety lever that does not make anything physically bigger.
    float lum = mix(0.6, 1.0, clamp((aSize - 0.55) / 4.05, 0.0, 1.0));
    float wobble = 0.5 + 0.5 * sin(aTwinkle + uTime * aSpeed * 1.7);
    // wide, bright stars scintillate far less than dwarfs, so the twinkle
    // swing shrinks as the star gets bigger
    float swing = mix(0.58, 0.2, clamp((aSize - 0.55) / 4.0, 0.0, 1.0));
    vTwinkle = ((1.0 - swing) + swing * pow(wobble, 1.6) * (0.72 + 0.28 * sin(aTwinkle * 2.3 + uTime * aSpeed * 0.6))) * lum;
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

    // core size in CSS pixels. The floor has to stay low or M, K and half of
    // G all pile onto it at the field's median depth and three classes render
    // as the same dot - it is the floor, not the scale, that flattens the sky.
    float core = aSize * (900.0 / dist) * (1.0 + prox * 1.2);
    core = clamp(core, 1.0, 16.0 + prox * 12.0);
    // flared stars need a quad wider than their core to have room for the
    // spikes, so the fragment shader is told what fraction of it is core
    float quad = 1.0 + aFlare * 1.5;
    vCoreFrac = 1.0 / quad;
    // gl_PointSize is in device pixels — without this stars shrink on retina
    gl_PointSize = core * quad * uPixelRatio;
  }
`;

const FRAGMENT = /* glsl */ `
  precision mediump float;
  uniform float uEnv;
  varying float vTwinkle;
  varying float vDepth;
  varying float vTemp;
  varying float vProx;
  varying float vFlare;
  varying float vCoreFrac;

  // blue-white (hot) through cream to deep amber (cool) - pushed a little
  // past true star colour, which is too desaturated to read on a web page
  vec3 spectral(float t) {
    vec3 c = mix(vec3(0.47, 0.65, 1.0), vec3(0.80, 0.88, 1.0), smoothstep(0.0, 0.3, t));
    c = mix(c, vec3(1.0, 0.96, 0.85), smoothstep(0.28, 0.56, t));
    c = mix(c, vec3(1.0, 0.76, 0.47), smoothstep(0.56, 0.8, t));
    return mix(c, vec3(1.0, 0.53, 0.33), smoothstep(0.8, 1.0, t));
  }

  void main() {
    vec2 c = gl_PointCoord - vec2(0.5);
    float r = length(c) * 2.0;
    // distance measured in core-radii, so flared stars keep a tight centre
    float dn = r / max(0.001, vCoreFrac);
    float lit = vTwinkle * vDepth;
    float core = smoothstep(1.0, 0.4, dn) * lit;
    // the bright classes carry their own soft bloom
    float glow = smoothstep(1.9, 0.0, dn) * vFlare * 0.26 * lit;
    float halo = smoothstep(1.0, 0.0, r) * vProx * 0.6;
    float spikes = 0.0;
    if (vFlare > 0.01) {
      vec2 a = abs(c) * 2.0;
      float h = smoothstep(0.09, 0.0, a.y) * (1.0 - smoothstep(0.08, 1.0, a.x));
      float v = smoothstep(0.09, 0.0, a.x) * (1.0 - smoothstep(0.08, 1.0, a.y));
      spikes = max(h, v) * vFlare * 0.5 * lit;
    }
    vec3 color = spectral(vTemp);
    // a blown-out centre goes white on any real exposure, but only the very
    // brightest pixel of the very brightest stars - push it any wider and
    // every class collapses back to the same white dot
    color = mix(color, vec3(1.0, 0.99, 0.96), smoothstep(0.75, 1.0, core) * 0.35);
    color = mix(color, vec3(1.0, 0.97, 0.9), vProx * 0.5);
    float alpha = max(max(core, spikes), max(glow, halo)) * max(0.15, uEnv);
    if (alpha < 0.004) discard;
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
    geo.setAttribute('aTemp', new THREE.BufferAttribute(data.aTemp, 1));
    geo.setAttribute('aFlare', new THREE.BufferAttribute(data.aFlare, 1));
    return geo;
  }, [data]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uEnv: { value: 1 },
      uPixelRatio: { value: 1 },
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
    u.uPixelRatio.value = state.viewport.dpr;
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
