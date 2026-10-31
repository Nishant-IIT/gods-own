'use client';

import Link from 'next/link';
import type { WorkProject } from '../data/workProjects';
import { PageShell } from '../PageShell';
import { Reveal } from '../Reveal';

export function WorkDetailPage({ project }: { project: WorkProject }) {
  return (
    <PageShell>
      <section
        style={{
          minHeight: '62vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          gap: 'clamp(24px,4vh,44px)',
          padding: 'clamp(90px,10vh,110px) clamp(20px,5vw,80px) clamp(40px,7vh,80px)',
        }}
      >
        <Reveal style={{ maxWidth: 1180, margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(20px,3.4vh,34px)' }}>
          <Link href="/work" className="gs-hover-accent" style={{ alignSelf: 'flex-start', fontSize: 9, letterSpacing: '.3em', color: '#8f887c' }}>
            ← SELECTED WORK
          </Link>
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: 16,
              overflow: 'hidden',
              backgroundImage: `url(${project.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: 'inset 0 0 0 1px rgba(236,230,218,.1)',
            }}
          />
        </Reveal>
        <Reveal
          delay={90}
          style={{ maxWidth: 1180, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,250px),1fr))', gap: 'clamp(20px,3.4vw,52px)', alignItems: 'end' }}
        >
          <h1 style={{ margin: 0, fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(44px,10vw,170px)', lineHeight: 0.92, letterSpacing: '.05em', color: '#ece6da' }}>
            {project.title}
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11, fontSize: 'clamp(10px,.82vw,12px)', letterSpacing: '.3em', color: '#8f887c' }}>
            <span style={{ color: '#d4a05a' }}>{project.year}</span>
          </div>
        </Reveal>
      </section>

      <section style={{ padding: 'clamp(60px,11vh,130px) clamp(20px,5vw,80px)' }}>
        <Reveal style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(22px,3.8vh,38px)' }}>
          <span style={{ fontSize: 'clamp(9px,.72vw,10px)', letterSpacing: '.46em', textIndent: '.46em', color: '#d4a05a' }}>THE CREDIT</span>
          <p style={{ margin: 0, maxWidth: '34ch', fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(22px,3.6vw,54px)', lineHeight: 1.22, letterSpacing: '.02em', color: '#ece6da', textWrap: 'balance' }}>
            {project.description}
          </p>
        </Reveal>
      </section>

      <section style={{ padding: 'clamp(60px,11vh,130px) clamp(20px,5vw,80px) clamp(50px,8vh,90px)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(26px,4.4vh,46px)' }}>
          <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <span style={{ fontSize: 'clamp(9px,.72vw,10px)', letterSpacing: '.46em', textIndent: '.46em', color: '#d4a05a' }}>PARTNERSHIP</span>
            <h2 style={{ margin: 0, maxWidth: '24ch', fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(23px,3.8vw,58px)', lineHeight: 1.1, letterSpacing: '.03em', color: '#ece6da', textWrap: 'balance' }}>
              THIS IS WHAT CAME BEFORE. THE SLATE IS WHAT COMES NEXT.
            </h2>
          </Reveal>
          <Reveal delay={80} style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(12px,1.6vw,20px)' }}>
            <Link
              href="/slate"
              className="gs-hover-fill"
              style={{ padding: '15px clamp(20px,2.6vw,34px)', fontSize: 10, letterSpacing: '.3em', color: '#000', background: '#ece6da' }}
            >
              VIEW THE SLATE
            </Link>
            <Link
              href="/work"
              className="gs-hover-outline"
              style={{ padding: '15px clamp(20px,2.6vw,34px)', fontSize: 10, letterSpacing: '.3em', color: '#ece6da', boxShadow: 'inset 0 0 0 1px rgba(236,230,218,.28)' }}
            >
              BACK TO SELECTED WORK
            </Link>
          </Reveal>
          <p style={{ margin: 0, fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 10, letterSpacing: '.16em', color: '#8f887c' }}>
            PLACEHOLDER GALLERY — STILLS AND CREDITS ARE ILLUSTRATIVE
          </p>
        </div>
      </section>
    </PageShell>
  );
}
