'use client';

import type { MutableRefObject } from 'react';
import { Driver } from './Driver';
import { Dust } from './Dust';
import { Milestones } from './Milestones';
import { Nebula } from './Nebula';
import { PostFX } from './PostFX';
import { StarField } from './StarField';
import type { QualityProfile } from '../lib/quality';
import type { Refs } from '../lib/textChoreography';

export function Scene({
  quality,
  refs,
  onActiveChapter,
}: {
  quality: QualityProfile;
  refs: MutableRefObject<Refs>;
  onActiveChapter: (i: number) => void;
}) {
  return (
    <>
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 300, 2400]} />
      <Driver refs={refs} reduced={quality.reduced} onActiveChapter={onActiveChapter} />
      <StarField count={quality.starCount} />
      <Dust count={quality.dustCount} />
      <Nebula />
      <Milestones />
      <PostFX bloom={quality.bloom} />
    </>
  );
}
