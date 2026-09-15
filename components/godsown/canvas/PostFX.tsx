'use client';

import { Bloom, EffectComposer, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

export function PostFX({ bloom }: { bloom: boolean }) {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        mipmapBlur
        intensity={bloom ? 0.9 : 0}
        luminanceThreshold={0.35}
        luminanceSmoothing={0.2}
      />
      <Noise opacity={0.025} blendFunction={BlendFunction.OVERLAY} premultiply />
    </EffectComposer>
  );
}
