'use client';

import { useMemo, type MutableRefObject } from 'react';
import { Driver } from './Driver';
import { Dust } from './Dust';
import { Milestones } from './Milestones';
import { PostFX } from './PostFX';
import { StarField } from './StarField';
import { StarStreaks } from './StarStreaks';
import type { QualityProfile } from '../lib/quality';
import { generateStars } from '../lib/starData';
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
  // Generated once and shared by StarField (the points) and StarStreaks (the
  // velocity-driven trails) so both draw calls agree on where every star is.
  const stars = useMemo(() => generateStars(quality.starCount), [quality.starCount]);

  return (
    <>
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 300, 2400]} />
      <Driver refs={refs} reduced={quality.reduced} onActiveChapter={onActiveChapter} />
      <StarField data={stars} cursorEnabled={!quality.mobile} />
      <StarStreaks data={stars} />
      <Dust count={quality.dustCount} />
      <Milestones />
      <PostFX bloom={quality.bloom} />
    </>
  );
}
