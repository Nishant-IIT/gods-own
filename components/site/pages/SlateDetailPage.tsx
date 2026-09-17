'use client';

import Link from 'next/link';
import { BackBar } from '../BackBar';
import type { SlateProject } from '../data/slateProjects';
import { ImageSlot } from '@/components/godsown/overlay/ImageSlot';
import { PageShell } from '../PageShell';
import { Reveal } from '../Reveal';

export function SlateDetailPage({ project }: { project: SlateProject }) {
  return (
    <PageShell>
      <section
        style={{
          minHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          gap: 'clamp(24px,4vh,44px)',
          padding: 'clamp(110px,18vh,180px) clamp(20px,5vw,80px) clamp(40px,7vh,80px)',
        }}
      >
        <Reveal style={{ maxWidth: 1180, margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(20px,3.4vh,34px)' }}>
          <Link href="/slate" className="gs-hover-accent" style={{ alignSelf: 'flex-start', fontSize: 9, letterSpacing: '.3em', color: '#8f887c' }}>
            ← THE SLATE
          </Link>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '21/9', maxHeight: '54vh' }}>
            <ImageSlot alt={`${project.title} — key art`} placeholder={`${project.title} — key art`} shape="rect" />
          </div>
        </Reveal>
        <Reveal
          delay={90}
          style={{ maxWidth: 1180, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,250px),1fr))', gap: 'clamp(20px,3.4vw,52px)', alignItems: 'end' }}
        >
          <h1 style={{ margin: 0, fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(44px,10vw,170px)', lineHeight: 0.92, letterSpacing: '.05em', color: '#ece6da' }}>
            {project.title}
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11, fontSize: 'clamp(10px,.82vw,12px)', letterSpacing: '.3em', color: '#8f887c' }}>
            <span style={{ color: '#ece6da' }}>{project.kicker[0]}</span>
            <span>{project.kicker[1]}</span>
            <span style={{ color: '#d4a05a' }}>{project.status}</span>
          </div>
        </Reveal>
      </section>

      <section style={{ padding: 'clamp(60px,11vh,130px) clamp(20px,5vw,80px)' }}>
        <Reveal style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(22px,3.8vh,38px)' }}>
          <span style={{ fontSize: 'clamp(9px,.72vw,10px)', letterSpacing: '.46em', textIndent: '.46em', color: '#d4a05a' }}>THE STORY</span>
          <p style={{ margin: 0, maxWidth: '34ch', fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(22px,3.6vw,54px)', lineHeight: 1.22, letterSpacing: '.02em', color: '#ece6da', textWrap: 'balance' }}>
            {project.logline}
          </p>
        </Reveal>
      </section>

      <section style={{ padding: 'clamp(40px,8vh,110px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
          {project.rows.map((r, i) => (
            <Reveal
              key={r.label}
              delay={Math.min(i, 5) * 70}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap: 'clamp(14px,3vw,52px)', padding: 'clamp(20px,3.4vh,34px) 0', borderTop: '1px solid rgba(236,230,218,.12)' }}
            >
              <span style={{ fontSize: 'clamp(9px,.75vw,11px)', letterSpacing: '.4em', color: '#8f887c' }}>{r.label}</span>
              <p style={{ gridColumn: 'span 2', margin: 0, maxWidth: '60ch', fontSize: 'clamp(13px,1.1vw,16px)', lineHeight: 1.75, color: '#b3ab9d', textWrap: 'pretty' }}>
                {r.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section style={{ padding: 'clamp(40px,8vh,110px) clamp(20px,5vw,80px)' }}>
        <Reveal style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 'clamp(14px,2vw,26px)' }}>
          <div style={{ aspectRatio: '4/5' }}>
            <ImageSlot alt={`${project.title} — look reference 1`} placeholder={`${project.title} — look reference 1`} shape="rect" />
          </div>
          <div style={{ aspectRatio: '4/5' }}>
            <ImageSlot alt={`${project.title} — look reference 2`} placeholder={`${project.title} — look reference 2`} shape="rect" />
          </div>
          <div style={{ aspectRatio: '4/5' }}>
            <ImageSlot alt={`${project.title} — look reference 3`} placeholder={`${project.title} — look reference 3`} shape="rect" />
          </div>
        </Reveal>
      </section>

      <section style={{ padding: 'clamp(60px,11vh,130px) clamp(20px,5vw,80px) clamp(50px,8vh,90px)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(26px,4.4vh,46px)' }}>
          <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <span style={{ fontSize: 'clamp(9px,.72vw,10px)', letterSpacing: '.46em', textIndent: '.46em', color: '#d4a05a' }}>PARTNERSHIP</span>
            <h2 style={{ margin: 0, maxWidth: '24ch', fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(23px,3.8vw,58px)', lineHeight: 1.1, letterSpacing: '.03em', color: '#ece6da', textWrap: 'balance' }}>
              Currently exploring production and distribution partnerships.
            </h2>
          </Reveal>
          <Reveal delay={80} style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(12px,1.6vw,20px)' }}>
            <a
              href={`mailto:hello@godsownmotionpictures.com?subject=${encodeURIComponent(project.title + ' — request the deck')}`}
              className="gs-hover-fill"
              style={{ padding: '15px clamp(20px,2.6vw,34px)', fontSize: 10, letterSpacing: '.3em', color: '#000', background: '#ece6da' }}
            >
              REQUEST THE DECK
            </a>
            <Link
              href="/slate"
              className="gs-hover-outline"
              style={{ padding: '15px clamp(20px,2.6vw,34px)', fontSize: 10, letterSpacing: '.3em', color: '#ece6da', boxShadow: 'inset 0 0 0 1px rgba(236,230,218,.28)' }}
            >
              BACK TO THE SLATE
            </Link>
          </Reveal>
          <p style={{ margin: 0, fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 10, letterSpacing: '.16em', color: '#8f887c' }}>
            PLACEHOLDER PROJECT — LOGLINE, WORLD AND STAGE ARE ILLUSTRATIVE
          </p>
          <BackBar />
        </div>
      </section>
    </PageShell>
  );
}

