'use client';

import Link from 'next/link';
import { BackBar } from '../BackBar';
import { ImageSlot } from '@/components/godsown/overlay/ImageSlot';
import { PageShell } from '../PageShell';
import { Reveal } from '../Reveal';

const CREDITS = [
  { title: 'MALHARI', film: 'BAJIRAO MASTANI', year: '2015' },
  { title: 'GAJANANA', film: 'BAJIRAO MASTANI', year: '2015' },
  { title: 'ZIDDI DIL', film: 'MARY KOM', year: '2014' },
  { title: 'PARTY ON MY MIND', film: 'RACE 2', year: '2013' },
  { title: 'PAL', film: 'JALEBI', year: '2018' },
  { title: 'UDHAL HO', film: 'MALAAL', year: '2019' },
  { title: 'UTTH JA ZIDDI RE', film: '83', year: '2021' },
];

const CATS = [
  { title: 'FILM', body: 'Writing and creative development for feature projects.' },
  { title: 'MUSIC', body: 'Lyrics and songwriting across Hindi film soundtracks.' },
  { title: 'BRANDS', body: 'Branded entertainment and campaign work.' },
  { title: 'ARTISTS', body: 'Collaborations with composers, singers and performers.' },
];

const sectionPad = 'clamp(60px,11vh,130px) clamp(20px,5vw,80px)';
const eyebrowMuted = { fontSize: 'clamp(9px,.72vw,10px)', letterSpacing: '.46em', textIndent: '.46em', color: '#8f887c' } as const;

export function WorkPage() {
  return (
    <PageShell>
      <section style={{ minHeight: '76vh', display: 'flex', alignItems: 'flex-end', padding: 'clamp(120px,20vh,200px) clamp(20px,5vw,80px) clamp(50px,9vh,100px)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(24px,4vh,42px)' }}>
          <Reveal style={{ fontSize: 'clamp(9px,.72vw,10px)', letterSpacing: '.46em', textIndent: '.46em', color: '#d4a05a' }}>
            PROOF
          </Reveal>
          <Reveal
            as="h1"
            delay={60}
            style={{ margin: 0, fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(34px,7.4vw,124px)', lineHeight: 1, letterSpacing: '.09em', textIndent: '.09em', color: '#ece6da' }}
          >
            SELECTED WORK
          </Reveal>
          <Reveal delay={120} style={{ maxWidth: '52ch' }}>
            <p style={{ margin: 0, fontSize: 'clamp(13px,1.15vw,17px)', lineHeight: 1.7, color: '#b3ab9d' }}>
              What the studio has done, as distinct from what it is building. Songs written for Hindi cinema across a
              decade of releases.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: sectionPad }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 'clamp(28px,5vw,76px)' }}>
          <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <span style={eyebrowMuted}>HOW IT BEGAN</span>
            <h2 style={{ margin: 0, maxWidth: '16ch', fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(23px,3.4vw,50px)', lineHeight: 1.1, letterSpacing: '.03em', color: '#ece6da', textWrap: 'balance' }}>
              It started with words.
            </h2>
          </Reveal>
          <Reveal
            delay={90}
            style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px,2.4vh,22px)', fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(16px,1.9vw,29px)', lineHeight: 1.45, letterSpacing: '.04em', color: '#ece6da', maxWidth: '34ch' }}
          >
            <span>I started with words.</span>
            <span>Those words became songs.</span>
            <span>Songs became films.</span>
            <span style={{ color: '#d4a05a' }}>Films became stories.</span>
          </Reveal>
        </div>
      </section>

      <section style={{ minHeight: '52vh', display: 'flex', alignItems: 'center', padding: 'clamp(50px,9vh,110px) clamp(20px,5vw,80px)' }}>
        <Reveal style={{ maxWidth: 1180, margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(22px,4vh,40px)', textAlign: 'center' }}>
          <p style={{ margin: 0, maxWidth: '26ch', fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(28px,5.4vw,86px)', lineHeight: 1.08, letterSpacing: '.02em', color: '#ece6da', textWrap: 'balance' }}>
            &ldquo;Every song should tell a story.&rdquo;
          </p>
          <span style={{ fontSize: 'clamp(9px,.75vw,11px)', letterSpacing: '.4em', textIndent: '.4em', color: '#8f887c' }}>
            PRASHANT INGOLE — ON SONGWRITING
          </span>
        </Reveal>
      </section>

      <section style={{ padding: sectionPad }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(30px,5vh,52px)' }}>
          <Reveal style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20 }}>
            <span style={eyebrowMuted}>SELECTED CREDITS — MUSIC</span>
            <span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 10, letterSpacing: '.16em', color: '#8f887c' }}>2013 — 2021</span>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {CREDITS.map((c) => (
              <Reveal
                key={c.title}
                style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: 'clamp(12px,3vw,40px)', padding: 'clamp(18px,2.8vh,30px) 0', borderTop: '1px solid rgba(236,230,218,.1)' }}
              >
                <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(21px,3vw,48px)', lineHeight: 1.02, letterSpacing: '.04em', color: '#ece6da' }}>
                  {c.title}
                </span>
                <span style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(12px,2.4vw,32px)', fontSize: 'clamp(10px,.8vw,12px)', letterSpacing: '.28em', color: '#8f887c' }}>
                  <span>{c.film}</span>
                  <span>{c.year}</span>
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: sectionPad }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(26px,4.4vh,48px)' }}>
          <Reveal style={{ position: 'relative', width: '100%', aspectRatio: '21/9', maxHeight: '62vh' }}>
            <ImageSlot alt="Bajirao Mastani — still or song artwork" placeholder="BAJIRAO MASTANI — still or song artwork" shape="rect" />
          </Reveal>
          <Reveal style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 'clamp(22px,3.4vw,52px)', alignItems: 'end' }}>
            <h2 style={{ margin: 0, fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(40px,9vw,150px)', lineHeight: 0.94, letterSpacing: '.03em', color: '#ece6da' }}>
              MALHARI
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 'clamp(10px,.82vw,12px)', letterSpacing: '.3em', color: '#8f887c' }}>
              <span style={{ color: '#c4463a' }}>BAJIRAO MASTANI — 2015</span>
              <span>
                LYRICS <span style={{ color: '#ece6da' }}>PRASHANT INGOLE</span>
              </span>
              <span>
                MUSIC <span style={{ color: '#ece6da' }}>SANJAY LEELA BHANSALI</span>
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: sectionPad }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,290px),1fr))', gap: 'clamp(28px,5vw,72px)', alignItems: 'center' }}>
          <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(18px,3vh,30px)' }}>
            <h2 style={{ margin: 0, fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(34px,6vw,96px)', lineHeight: 1, letterSpacing: '.03em', color: '#ece6da' }}>
              GAJANANA
            </h2>
            <span style={{ fontSize: 'clamp(10px,.82vw,12px)', letterSpacing: '.3em', color: '#8f887c' }}>BAJIRAO MASTANI — 2015</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 'clamp(16px,2.4vh,24px)', borderTop: '1px solid rgba(212,160,90,.32)' }}>
              <span style={{ fontSize: 'clamp(9px,.75vw,11px)', letterSpacing: '.44em', textIndent: '.44em', color: '#d4a05a' }}>THE RESEARCH</span>
              <p style={{ margin: 0, maxWidth: '46ch', fontSize: 'clamp(13px,1.1vw,16px)', lineHeight: 1.75, color: '#b3ab9d' }}>
                He researched the 108 names of Ganapati before writing a line.
              </p>
            </div>
          </Reveal>
          <Reveal delay={90} style={{ aspectRatio: '1', maxWidth: 460, width: '100%', justifySelf: 'end' }}>
            <ImageSlot alt="Gajanana — still or song artwork" placeholder="GAJANANA — still or song artwork" shape="rect" />
          </Reveal>
        </div>
      </section>

      <section style={{ padding: sectionPad }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(30px,5vh,52px)' }}>
          <div style={eyebrowMuted}>ALSO WORKING ACROSS</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,190px),1fr))', gap: 'clamp(14px,2vw,26px)' }}>
            {CATS.map((c, i) => (
              <Reveal
                key={c.title}
                delay={i * 70}
                style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 'clamp(20px,2.8vw,34px)', boxShadow: 'inset 0 0 0 1px rgba(236,230,218,.1)' }}
              >
                <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(17px,1.9vw,26px)', letterSpacing: '.1em', color: '#ece6da' }}>
                  {c.title}
                </span>
                <span style={{ fontSize: 'clamp(11px,.95vw,13px)', lineHeight: 1.7, color: '#b3ab9d' }}>{c.body}</span>
              </Reveal>
            ))}
          </div>
          <p style={{ margin: 0, fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 10, letterSpacing: '.16em', color: '#8f887c' }}>
            FULL CREDITS AND CASE STUDIES TO BE ADDED
          </p>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px,11vh,130px) clamp(20px,5vw,80px) clamp(50px,8vh,90px)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(28px,5vh,52px)' }}>
          <Reveal
            as="h2"
            style={{ margin: 0, maxWidth: '22ch', fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(26px,4.4vw,70px)', lineHeight: 1.07, letterSpacing: '.03em', color: '#ece6da', textWrap: 'balance' }}
          >
            THIS IS WHAT CAME BEFORE. THE SLATE IS WHAT COMES NEXT.
          </Reveal>
          <Reveal delay={80} style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(12px,1.6vw,20px)' }}>
            <Link
              href="/slate"
              className="gs-hover-fill"
              style={{ padding: '15px clamp(20px,2.6vw,34px)', fontSize: 10, letterSpacing: '.3em', color: '#000', background: '#ece6da' }}
            >
              VIEW THE SLATE
            </Link>
            <a
              href="mailto:hello@godsownmotionpictures.com?subject=Co-production%20enquiry"
              className="gs-hover-outline"
              style={{ padding: '15px clamp(20px,2.6vw,34px)', fontSize: 10, letterSpacing: '.3em', color: '#ece6da', boxShadow: 'inset 0 0 0 1px rgba(236,230,218,.28)' }}
            >
              START A CONVERSATION
            </a>
          </Reveal>
          <BackBar />
        </div>
      </section>
    </PageShell>
  );
}
