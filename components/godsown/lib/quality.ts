export type QualityTier = 'high' | 'medium' | 'low' | 'reduced-motion';

export type QualityProfile = {
  tier: QualityTier;
  reduced: boolean;
  mobile: boolean;
  starCount: number;
  dustCount: number;
  farStarCount: number;
  dpr: [number, number];
  bloom: boolean;
  grainDefault: boolean;
};

/** Detects a rough device tier once on mount. Not reactive to changes mid-session. */
export function detectQuality(): QualityProfile {
  if (typeof window === 'undefined') {
    return {
      tier: 'medium',
      reduced: false,
      mobile: false,
      starCount: 340,
      dustCount: 48,
      farStarCount: 120,
      dpr: [1, 2],
      bloom: true,
      grainDefault: false,
    };
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const mobile = window.innerWidth <= 768 || coarse;
  const lowMem =
    'deviceMemory' in navigator && (navigator as Navigator & { deviceMemory?: number }).deviceMemory !== undefined
      ? (navigator as Navigator & { deviceMemory?: number }).deviceMemory! <= 4
      : false;

  if (reduced) {
    return {
      tier: 'reduced-motion',
      reduced: true,
      mobile,
      starCount: mobile ? 90 : 170,
      dustCount: 12,
      farStarCount: 60,
      dpr: [1, 1],
      bloom: false,
      grainDefault: false,
    };
  }
  if (mobile || lowMem) {
    return {
      tier: mobile ? 'medium' : 'low',
      reduced: false,
      mobile,
      starCount: 170,
      dustCount: 22,
      farStarCount: 60,
      dpr: [1, 1.5],
      bloom: mobile,
      grainDefault: false,
    };
  }
  return {
    tier: 'high',
    reduced: false,
    mobile: false,
    starCount: 340,
    dustCount: 48,
    farStarCount: 120,
    dpr: [1, 2],
    bloom: true,
    grainDefault: false,
  };
}
