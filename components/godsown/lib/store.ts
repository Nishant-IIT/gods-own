import { create } from 'zustand';
import { detectQuality, type QualityProfile } from './quality';

type GodsownState = {
  activeChapter: number;
  setActiveChapter: (i: number) => void;
  soundOn: boolean;
  toggleSound: () => void;
  quality: QualityProfile;
  setQuality: (q: QualityProfile) => void;
};

export const useGodsownStore = create<GodsownState>((set) => ({
  activeChapter: 0,
  setActiveChapter: (i) => set((s) => (s.activeChapter === i ? s : { activeChapter: i })),
  soundOn: false,
  toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),
  quality: detectQuality(),
  setQuality: (quality) => set({ quality }),
}));
