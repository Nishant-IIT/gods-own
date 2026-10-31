'use client';

import Link from 'next/link';
import { useState } from 'react';
import { GalleryHero } from '../GalleryHero';
import { Card } from '@/components/ui/card';
import { LogoRibbon } from '@/components/ui/logo-ribbon';
import { PageShell } from '../PageShell';
import { Reveal } from '../Reveal';
import { WORK_CATEGORIES, WORK_PROJECTS } from '../data/workProjects';

const HERO_STILLS = ['BAJIRAO MASTANI — 2015', 'MARY KOM — 2014', 'RACE 2 — 2013', '83 — 2021', 'JALEBI — 2018'].map((label) => ({
  label,
  ph: `${label.split(' — ')[0]} — still`,
}));

const FILTERS = ['ALL', ...WORK_CATEGORIES] as const;
type Filter = (typeof FILTERS)[number];

const sectionPad = 'clamp(60px,11vh,130px) clamp(20px,5vw,80px)';
const eyebrowMuted = { fontSize: 'clamp(9px,.72vw,10px)', letterSpacing: '.46em', textIndent: '.46em', color: '#8f887c' } as const;

export function WorkPage() {
  const [filter, setFilter] = useState<Filter>('ALL');
  const shown = filter === 'ALL' ? WORK_PROJECTS : WORK_PROJECTS.filter((p) => p.category === filter);

  return (
    <PageShell>
      <GalleryHero
        eyebrow="PROOF"
        title="SELECTED WORK"
        sub="What the studio has done, as distinct from what it is building. Songs written for Hindi cinema across a decade of releases."
        hint="SCROLL"
        items={HERO_STILLS}
      />

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
          <Reveal style={eyebrowMuted}>GALLERY</Reveal>
          <Reveal style={{ display: 'flex', flexWrap: 'wrap', gap: '4px clamp(4px,1vw,14px)', alignItems: 'center', paddingBottom: 'clamp(10px,2vh,18px)', borderBottom: '1px solid rgba(236,230,218,.1)' }}>
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={f === filter}
                className="gs-hover-fg"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  minHeight: 44,
                  background: 'none',
                  border: 0,
                  padding: '0 12px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 10,
                  letterSpacing: '.28em',
                  color: f === filter ? '#ece6da' : '#8f887c',
                  boxShadow: `inset 0 -1px 0 ${f === filter ? '#d4a05a' : 'transparent'}`,
                }}
              >
                {f}
              </button>
            ))}
            <span style={{ marginLeft: 'auto', padding: '0 12px', fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 10, letterSpacing: '.16em', color: '#8f887c' }}>
              {String(shown.length).padStart(2, '0')} / {String(WORK_PROJECTS.length).padStart(2, '0')}
            </span>
          </Reveal>
          <Reveal
            delay={60}
            style={{ display: 'grid', justifyContent: 'center', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,460px),560px))', gap: 'clamp(24px,4vw,48px)', perspective: 1000 }}
          >
            {shown.map((p) => (
              <Link key={p.slug} href={`/work/${p.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
                <Card title={p.title} description={p.description} imageUrl={p.imageUrl} />
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <section style={{ padding: 'clamp(50px,9vh,120px) clamp(20px,5vw,80px)' }}>
        <Reveal style={{ maxWidth: 1180, margin: '0 auto' }}>
          <LogoRibbon />
        </Reveal>
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
            <Link
              href="/contact?subject=Co-production%20enquiry"
              className="gs-hover-outline"
              style={{ padding: '15px clamp(20px,2.6vw,34px)', fontSize: 10, letterSpacing: '.3em', color: '#ece6da', boxShadow: 'inset 0 0 0 1px rgba(236,230,218,.28)' }}
            >
              START A CONVERSATION
            </Link>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
