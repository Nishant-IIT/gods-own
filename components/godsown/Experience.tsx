'use client';

import { useGSAP } from '@gsap/react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { Scene } from './canvas/Scene';
import { CHAPTERS, HERO } from './lib/curves';
import { RefRegistryProvider } from './lib/refRegistry';
import { scrollState } from './lib/scrollState';
import { useGodsownStore } from './lib/store';
import type { Refs } from './lib/textChoreography';
import { Chrome } from './overlay/Chrome';
import { Cinema } from './overlay/chapters/Cinema';
import { Connect } from './overlay/chapters/Connect';
import { Journey } from './overlay/chapters/Journey';
import { Origin } from './overlay/chapters/Origin';
import { BodyOfWork } from './overlay/chapters/sound/BodyOfWork';
import { Gajanana } from './overlay/chapters/sound/Gajanana';
import { Malhari } from './overlay/chapters/sound/Malhari';
import { Pal } from './overlay/chapters/sound/Pal';
import { PartyOnMyMind } from './overlay/chapters/sound/PartyOnMyMind';
import { ZiddiDil } from './overlay/chapters/sound/ZiddiDil';
import { Words } from './overlay/chapters/Words';
import { LightSwallow } from './overlay/LightSwallow';
import { PointOfLight } from './overlay/PointOfLight';
import { ShootingStars } from './overlay/ShootingStars';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

export default function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const refs = useRef<Refs>({});
  const audioRef = useRef<HTMLAudioElement>(null);

  const quality = useGodsownStore((s) => s.quality);
  const setActiveChapter = useGodsownStore((s) => s.setActiveChapter);
  const soundOn = useGodsownStore((s) => s.soundOn);

  useGSAP(
    () => {
      if (!trackRef.current) return;
      const trigger = ScrollTrigger.create({
        trigger: trackRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          scrollState.rawScroll = self.progress;
        },
      });
      return () => trigger.kill();
    },
    { scope: trackRef },
  );

  // Intro lock: swallow scroll input until the hero title-reveal finishes —
  // ported behaviour, not a GSAP concern (plain wheel/touchmove interception).
  useEffect(() => {
    window.scrollTo(0, 0);
    const lock = (e: Event) => {
      if (!scrollState.introDone) {
        e.preventDefault();
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener('wheel', lock, { passive: false });
    window.addEventListener('touchmove', lock, { passive: false });
    return () => {
      window.removeEventListener('wheel', lock);
      window.removeEventListener('touchmove', lock);
    };
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      scrollState.clientX = e.clientX;
      scrollState.clientY = e.clientY;
      scrollState.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (soundOn) audio.play().catch(() => {});
    else audio.pause();
  }, [soundOn]);

  function goTo(i: number) {
    scrollState.introDone = true;
    const track = trackRef.current;
    const max = Math.max(1, (track ? track.offsetHeight : document.body.scrollHeight) - window.innerHeight);
    const sp = Math.max(0, (CHAPTERS[i].p - HERO) / (1 - HERO));
    const target = sp * max;
    if (quality.reduced) {
      window.scrollTo(0, target);
      return;
    }
    // A fixed, snappy duration rather than the browser's native `smooth`
    // behavior — for a jump spanning tens of thousands of pixels, native
    // smooth-scroll takes an impractically long time and moves too gradually
    // to ever build up real camera velocity, so the warp-speed star streak
    // (driven by scroll speed, see StarStreaks) never gets to show itself.
    gsap.to(window, { duration: 1.4, ease: 'power2.inOut', scrollTo: { y: target } });
  }

  return (
    <div data-screen-label="GODSOWN journey" style={{ position: 'relative', background: '#000000' }}>
      <div ref={trackRef} style={{ height: '4500vh', width: '100%' }} />
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: '#000000' }}>
        <Canvas
          style={{ position: 'absolute', inset: 0 }}
          dpr={quality.dpr}
          camera={{ fov: 55, near: 0.1, far: 4000, position: [0, 0, 0] }}
          gl={{ antialias: true }}
        >
          <Scene quality={quality} refs={refs} onActiveChapter={setActiveChapter} />
        </Canvas>

        <ShootingStars reduced={quality.reduced} />

        <RefRegistryProvider registry={refs}>
          <Origin />
          <Words />
          <PartyOnMyMind />
          <ZiddiDil />
          <Malhari />
          <Gajanana />
          <Pal />
          <BodyOfWork />
          <Cinema />
          <Journey />
          <Connect />
          <Chrome onNavigate={goTo} mobile={quality.mobile} />
        </RefRegistryProvider>

        <LightSwallow />
        <PointOfLight />
      </div>

      {/* Optional ambient bed — silent no-op until /public/audio/ambient.mp3 is supplied. */}
      <audio ref={audioRef} src="/audio/ambient.mp3" loop preload="none" />
    </div>
  );
}
