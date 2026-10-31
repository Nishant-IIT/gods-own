'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SLATE_PROJECTS, type SlateCategory } from '../data/slateProjects';
import { Card } from '@/components/ui/card';
import { PageShell } from '../PageShell';
import { Reveal } from '../Reveal';

const FILTERS = ['ALL', 'FILM', 'SERIES', 'MUSIC', 'DIGITAL', 'ORIGINAL IP'] as const;
type Filter = (typeof FILTERS)[number];

export function SlatePage() {
  const [filter, setFilter] = useState<Filter>('ALL');
  const shown = SLATE_PROJECTS.filter((p) => {
    if (filter === 'ALL') return true;
    if (filter === 'ORIGINAL IP') return p.ip;
    return p.cat === (filter as SlateCategory);
  });

  return (
    <PageShell>
      <section style={{ minHeight: '44vh', display: 'flex', alignItems: 'flex-end', padding: 'clamp(90px,10vh,110px) clamp(20px,5vw,80px) clamp(40px,7vh,80px)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(24px,4vh,42px)' }}>
          <Reveal style={{ fontSize: 'clamp(9px,.72vw,10px)', letterSpacing: '.46em', textIndent: '.46em', color: '#d4a05a' }}>
            THE SLATE
          </Reveal>
          <Reveal
            as="h1"
            delay={60}
            style={{ margin: 0, fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(34px,7.4vw,124px)', lineHeight: 1, letterSpacing: '.09em', textIndent: '.09em', color: '#ece6da' }}
          >
            STORIES IN MOTION
          </Reveal>
          <Reveal delay={120} style={{ maxWidth: '52ch' }}>
            <p style={{ margin: 0, fontSize: 'clamp(13px,1.15vw,17px)', lineHeight: 1.7, color: '#b3ab9d' }}>
              Projects in development across film, series, music and digital. What the studio is building, as
              distinct from what it has done.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: 'clamp(20px,4vh,50px) clamp(20px,5vw,80px) clamp(60px,11vh,130px)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(26px,4.4vh,44px)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px clamp(4px,1vw,14px)', alignItems: 'center', paddingBottom: 'clamp(10px,2vh,18px)', borderBottom: '1px solid rgba(236,230,218,.1)' }}>
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
              {String(shown.length).padStart(2, '0')} / {String(SLATE_PROJECTS.length).padStart(2, '0')}
            </span>
          </div>
          <div style={{ display: 'grid', justifyContent: 'center', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,460px),560px))', gap: 'clamp(24px,4vw,48px)', perspective: 1000 }}>
            {shown.map((p) => (
              <Link key={p.slug} href={`/slate/${p.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
                <Card title={p.title} description={p.format} imageUrl={`https://picsum.photos/seed/${encodeURIComponent(p.slug)}/1600/900`} />
              </Link>
            ))}
          </div>
          <p style={{ margin: 0, fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 10, letterSpacing: '.16em', color: '#8f887c' }}>
            PLACEHOLDER SLATE — TITLES, FORMATS AND STAGES ARE ILLUSTRATIVE
          </p>
        </div>
      </section>

      <section style={{ padding: 'clamp(50px,9vh,110px) clamp(20px,5vw,80px) clamp(50px,8vh,90px)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(26px,4.4vh,46px)' }}>
          <Reveal
            as="h2"
            style={{ margin: 0, maxWidth: '24ch', fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(24px,4.2vw,66px)', lineHeight: 1.08, letterSpacing: '.03em', color: '#ece6da', textWrap: 'balance' }}
          >
            EVERY PROJECT IS OPEN TO THE RIGHT PARTNER.
          </Reveal>
          <Reveal style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(12px,1.6vw,20px)' }}>
            <Link
              href="/contact?subject=Investment%20enquiry"
              className="gs-hover-fill"
              style={{ padding: '15px clamp(20px,2.6vw,34px)', fontSize: 10, letterSpacing: '.3em', color: '#000', background: '#ece6da' }}
            >
              START A CONVERSATION
            </Link>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
