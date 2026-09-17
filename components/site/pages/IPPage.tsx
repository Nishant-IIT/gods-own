'use client';

import Link from 'next/link';
import { BackBar } from '../BackBar';
import { PageShell } from '../PageShell';
import { Reveal } from '../Reveal';

const CHAIN = ['IDEA', 'WORLD', 'CHARACTERS', 'CONTENT', 'AUDIENCE', 'DISTRIBUTION', 'IP', 'NEW STORIES'];

const CATS = [
  { n: '01', title: 'FILM IP', body: 'Features developed as the first chapter of a longer story, not a one-off release.' },
  { n: '02', title: 'SERIES IP', body: 'Long-form worlds with room for seasons, spin-offs and recurring characters.' },
  { n: '03', title: 'CHARACTERS', body: 'Figures strong enough to carry a story beyond the format they were born in.' },
  { n: '04', title: 'MUSIC IP', body: 'Original songs and scores that live independently of the picture.' },
  { n: '05', title: 'DIGITAL FORMATS', body: 'Short-form and interactive formats built for platforms as they are, not as they were.' },
  { n: '06', title: 'FUTURE WORLDS', body: 'Early concepts held in development until they are ready to be built properly.' },
];

const WORLDS = [
  { title: 'ORION', kind: 'FILM IP · SCI-FI / THRILLER', body: 'A near-future world where one discovery reorders a family, a city and a country. Built as a trilogy from the first draft.', ext: 'FEATURE · SERIES · GRAPHIC NOVEL · GAME' },
  { title: 'RAGA', kind: 'MUSIC IP · MUSICAL DRAMA', body: 'A musical lineage told across three generations, where the songs are the plot rather than the decoration.', ext: 'SERIES · ORIGINAL ALBUM · LIVE FORMAT' },
  { title: 'ARYA', kind: 'CHARACTER IP · FANTASY', body: 'A single character strong enough to anchor a world — mythic in source, contemporary in voice.', ext: 'SERIES · ANIMATION · LICENSING · DIGITAL' },
];

const sectionPad = 'clamp(60px,11vh,130px) clamp(20px,5vw,80px)';
const eyebrowMuted = { fontSize: 'clamp(9px,.72vw,10px)', letterSpacing: '.46em', textIndent: '.46em', color: '#8f887c' } as const;

export function IPPage() {
  return (
    <PageShell>
      <section style={{ minHeight: '76vh', display: 'flex', alignItems: 'flex-end', padding: 'clamp(120px,20vh,200px) clamp(20px,5vw,80px) clamp(50px,9vh,100px)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(24px,4vh,42px)' }}>
          <Reveal style={{ fontSize: 'clamp(9px,.72vw,10px)', letterSpacing: '.46em', textIndent: '.46em', color: '#d4a05a' }}>
            IP / UNIVERSES
          </Reveal>
          <Reveal
            as="h1"
            delay={60}
            style={{ margin: 0, maxWidth: '18ch', fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(34px,7vw,116px)', lineHeight: 1, letterSpacing: '.07em', textIndent: '.07em', color: '#ece6da', textWrap: 'balance' }}
          >
            WORLDS WORTH BUILDING
          </Reveal>
          <Reveal delay={120} style={{ maxWidth: '56ch' }}>
            <p style={{ margin: 0, fontSize: 'clamp(13px,1.15vw,17px)', lineHeight: 1.7, color: '#b3ab9d' }}>
              Not every project belongs here. This page holds the properties with genuine long-term potential —
              stories built to extend beyond a single release.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: sectionPad }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(30px,5vh,56px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <span style={eyebrowMuted}>01 — FROM STORY TO IP</span>
            <h2 style={{ margin: 0, fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(23px,3.4vw,50px)', lineHeight: 1.1, letterSpacing: '.05em', color: '#ece6da' }}>
              THE CHAIN
            </h2>
          </div>
          <Reveal style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(8px,1.2vw,16px)' }}>
            {CHAIN.map((label, i) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px,1.2vw,16px)' }}>
                <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(14px,1.9vw,28px)', letterSpacing: '.1em', color: label === 'IP' ? '#d4a05a' : '#ece6da' }}>
                  {label}
                </span>
                {i < CHAIN.length - 1 && <span style={{ fontSize: 'clamp(11px,1.2vw,16px)', color: '#8f887c' }}>→</span>}
              </div>
            ))}
          </Reveal>
          <Reveal style={{ maxWidth: '62ch' }}>
            <p style={{ margin: 0, fontSize: 'clamp(13px,1.1vw,17px)', lineHeight: 1.7, color: '#b3ab9d' }}>
              We look beyond a single release. Our long-term ambition is to develop stories, characters and worlds
              that can evolve across formats, platforms and audiences.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: sectionPad }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(30px,5vh,52px)' }}>
          <div style={eyebrowMuted}>02 — CATEGORIES</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,230px),1fr))', gap: 'clamp(14px,2vw,26px)' }}>
            {CATS.map((c, i) => (
              <Reveal
                key={c.n}
                delay={Math.min(i, 5) * 70}
                style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 'clamp(22px,3vw,36px)', boxShadow: 'inset 0 0 0 1px rgba(236,230,218,.1)' }}
              >
                <span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 10, letterSpacing: '.2em', color: '#8f887c' }}>{c.n}</span>
                <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(17px,1.9vw,27px)', lineHeight: 1.2, letterSpacing: '.08em', color: '#ece6da' }}>
                  {c.title}
                </span>
                <span style={{ fontSize: 'clamp(11px,.95vw,14px)', lineHeight: 1.7, color: '#b3ab9d' }}>{c.body}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: sectionPad }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(30px,5vh,56px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <span style={eyebrowMuted}>03 — ORIGINAL WORLDS</span>
            <h2 style={{ margin: 0, fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(23px,3.4vw,50px)', lineHeight: 1.1, letterSpacing: '.05em', color: '#ece6da' }}>
              IN DEVELOPMENT
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px,3.4vh,38px)' }}>
            {WORLDS.map((w, i) => (
              <Reveal
                key={w.title}
                delay={i * 70}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 'clamp(20px,3.4vw,52px)', alignItems: 'center', paddingTop: 'clamp(20px,3.4vh,34px)', borderTop: '1px solid rgba(236,230,218,.12)' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(26px,4vw,62px)', lineHeight: 1, letterSpacing: '.05em', color: '#ece6da' }}>
                    {w.title}
                  </span>
                  <span style={{ fontSize: 'clamp(10px,.82vw,12px)', letterSpacing: '.3em', color: '#d4a05a' }}>{w.kind}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <span style={{ fontSize: 'clamp(12px,1.05vw,15px)', lineHeight: 1.75, color: '#b3ab9d' }}>{w.body}</span>
                  <span style={{ fontSize: 'clamp(11px,.9vw,13px)', lineHeight: 1.8, letterSpacing: '.14em', color: '#8f887c' }}>{w.ext}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <p style={{ margin: 0, fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 10, letterSpacing: '.16em', color: '#8f887c' }}>
            PLACEHOLDER PROPERTIES — ILLUSTRATIVE ONLY
          </p>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px,11vh,130px) clamp(20px,5vw,80px) clamp(50px,8vh,90px)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(26px,4.4vh,46px)' }}>
          <Reveal
            as="h2"
            style={{ margin: 0, maxWidth: '22ch', fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(24px,4.2vw,66px)', lineHeight: 1.08, letterSpacing: '.03em', color: '#ece6da', textWrap: 'balance' }}
          >
            ONE STORY DOES NOT EQUAL ONE REVENUE EVENT.
          </Reveal>
          <Reveal style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(12px,1.6vw,20px)' }}>
            <a
              href="mailto:hello@godsownmotionpictures.com?subject=Investment%20enquiry"
              className="gs-hover-fill"
              style={{ padding: '15px clamp(20px,2.6vw,34px)', fontSize: 10, letterSpacing: '.3em', color: '#000', background: '#ece6da' }}
            >
              TALK TO US
            </a>
            <Link
              href="/slate"
              className="gs-hover-outline"
              style={{ padding: '15px clamp(20px,2.6vw,34px)', fontSize: 10, letterSpacing: '.3em', color: '#ece6da', boxShadow: 'inset 0 0 0 1px rgba(236,230,218,.28)' }}
            >
              VIEW THE SLATE
            </Link>
          </Reveal>
          <BackBar />
        </div>
      </section>
    </PageShell>
  );
}
