'use client';

import Link from 'next/link';
import { FRAMES } from '@/content/frames';
import { ImageSlot } from '@/components/godsown/overlay/ImageSlot';
import { PageShell } from '../PageShell';
import { Reveal } from '../Reveal';

const BELIEFS = [
  { title: 'A story is the asset.', body: 'Everything else — production, music, technology, distribution — exists to carry it to an audience.' },
  { title: 'Craft travels further than scale.', body: 'Work that is specific in its language and emotion tends to be the work that crosses borders.' },
  { title: 'Own what you build.', body: 'Developing original material is how a studio compounds value rather than trading time for fees.' },
];

const ENGINE = [
  { n: '01', title: 'STORY', items: ['Development', 'Writing', 'Concepts', 'Adaptations'] },
  { n: '02', title: 'PRODUCTION', items: ['Film', 'Series', 'Music', 'Commercials'] },
  { n: '03', title: 'WORLD BUILDING', items: ['Animation', 'VFX', 'Virtual Production', 'AI'] },
  { n: '04', title: 'DISTRIBUTION', items: ['Theatrical', 'OTT', 'Music', 'Digital', 'International'] },
];

const CREATE = ['Film', 'Series', 'Music', 'Advertising', 'Digital', 'Animation', 'VFX'];

const FUTURE = [
  { title: 'BUILD', body: 'Original stories and worlds.' },
  { title: 'PARTNER', body: 'With exceptional creators, talent and platforms.' },
  { title: 'OWN', body: 'Long-term entertainment assets and IP.' },
];

const sectionPad = 'clamp(60px,11vh,130px) clamp(20px,5vw,80px)';
const eyebrowMuted = { fontSize: 'clamp(9px,.72vw,10px)', letterSpacing: '.46em', textIndent: '.46em', color: '#8f887c' } as const;

export function StudioPage() {
  return (
    <PageShell>
      <section
        style={{
          minHeight: '48vh',
          display: 'flex',
          alignItems: 'flex-end',
          padding: 'clamp(90px,10vh,110px) clamp(20px,5vw,80px) clamp(50px,9vh,100px)',
        }}
      >
        <div style={{ maxWidth: 1180, margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(24px,4vh,42px)' }}>
          <Reveal style={{ fontSize: 'clamp(9px,.72vw,10px)', letterSpacing: '.46em', textIndent: '.46em', color: '#d4a05a' }}>
            THE STUDIO
          </Reveal>
          <Reveal
            as="h1"
            delay={60}
            style={{ margin: 0, fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(34px,7.4vw,124px)', lineHeight: 1, letterSpacing: '.09em', textIndent: '.09em', color: '#ece6da' }}
          >
            THE STUDIO
          </Reveal>
          <Reveal delay={120} style={{ maxWidth: '56ch' }}>
            <p style={{ margin: 0, fontSize: 'clamp(13px,1.15vw,17px)', lineHeight: 1.7, color: '#b3ab9d' }}>
              An independent entertainment studio developing stories, content and original IP for audiences in India
              and around the world.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: sectionPad }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 'clamp(28px,5vw,76px)' }}>
          <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <span style={eyebrowMuted}>01 — WHO WE ARE</span>
            <h2 style={{ margin: 0, maxWidth: '20ch', fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(23px,3.4vw,50px)', lineHeight: 1.1, letterSpacing: '.03em', color: '#ece6da', textWrap: 'balance' }}>
              A studio built around stories, not services.
            </h2>
          </Reveal>
          <Reveal delay={90} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(18px,3vh,28px)', fontSize: 'clamp(13px,1.1vw,16px)', lineHeight: 1.75, color: '#b3ab9d', maxWidth: '56ch' }}>
            <p style={{ margin: 0 }}>
              GOD&apos;S OWN MOTION PICTURES develops and produces films, series, music, branded entertainment and
              emerging digital formats, bringing together creative talent, production expertise and technology.
            </p>
            <p style={{ margin: 0 }}>
              The studio is founded on a body of work written for Hindi cinema and its music, and is built to take
              those instincts into stories it develops and owns.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: sectionPad }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(30px,5vh,56px)' }}>
          <div style={eyebrowMuted}>02 — WHAT WE BELIEVE</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,250px),1fr))', gap: 'clamp(22px,3.4vw,52px)' }}>
            {BELIEFS.map((b, i) => (
              <Reveal
                key={b.title}
                delay={i * 70}
                style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 'clamp(16px,2.4vh,24px)', borderTop: '1px solid rgba(236,230,218,.14)' }}
              >
                <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(20px,2.6vw,38px)', lineHeight: 1.18, letterSpacing: '.03em', color: '#ece6da', textWrap: 'balance' }}>
                  {b.title}
                </span>
                <span style={{ fontSize: 'clamp(12px,1.05vw,15px)', lineHeight: 1.75, color: '#b3ab9d' }}>{b.body}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: sectionPad }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(30px,5vh,56px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <span style={eyebrowMuted}>03 — THE STUDIO ENGINE</span>
            <h2 style={{ margin: 0, fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(23px,3.4vw,50px)', lineHeight: 1.1, letterSpacing: '.05em', color: '#ece6da' }}>
              ONE ENGINE, FOUR COMPONENTS
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,225px),1fr))', gap: 'clamp(14px,2vw,26px)' }}>
            {ENGINE.map((e, i) => (
              <Reveal
                key={e.n}
                delay={i * 70}
                style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px,2.6vh,26px)', padding: 'clamp(22px,3vw,38px)', boxShadow: 'inset 0 0 0 1px rgba(236,230,218,.1)' }}
              >
                <span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 10, letterSpacing: '.2em', color: '#8f887c' }}>{e.n}</span>
                <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(18px,2vw,28px)', lineHeight: 1.15, letterSpacing: '.06em', color: '#ece6da' }}>
                  {e.title}
                </span>
                <span style={{ fontSize: 'clamp(12px,1vw,14px)', lineHeight: 2, letterSpacing: '.04em', color: '#b3ab9d', whiteSpace: 'pre-line' }}>
                  {e.items.join('\n')}
                </span>
              </Reveal>
            ))}
          </div>
          <Reveal
            style={{ maxWidth: '52ch', fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(15px,1.7vw,26px)', lineHeight: 1.5, letterSpacing: '.04em', color: '#ece6da' }}
          >
            These are not disconnected services. They are components of one entertainment engine.
          </Reveal>
        </div>
      </section>

      <section style={{ padding: sectionPad }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(30px,5vh,52px)' }}>
          <div style={eyebrowMuted}>04 — WHAT WE CREATE</div>
          <Reveal
            style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(12px,2.2vw,32px)', fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(19px,3vw,46px)', lineHeight: 1.25, letterSpacing: '.05em', color: '#ece6da' }}
          >
            {CREATE.map((c) => (
              <span key={c} style={{ display: 'contents' }}>
                <span>{c}</span>
                <span style={{ color: '#8f887c' }}>·</span>
              </span>
            ))}
            <span style={{ color: '#d4a05a' }}>Emerging formats</span>
          </Reveal>
        </div>
      </section>

      <section style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', padding: sectionPad }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(30px,5vh,58px)' }}>
          <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px,3.4vh,34px)' }}>
            <span style={eyebrowMuted}>05 — WHERE WE&apos;RE GOING</span>
            <h2 style={{ margin: 0, maxWidth: '22ch', fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(26px,4.6vw,74px)', lineHeight: 1.06, letterSpacing: '.04em', color: '#ece6da', textWrap: 'balance' }}>
              FROM PRODUCTION COMPANY TO IP-LED STUDIO.
            </h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,230px),1fr))', gap: 'clamp(20px,3vw,44px)' }}>
            {FUTURE.map((f, i) => (
              <Reveal
                key={f.title}
                delay={i * 70}
                style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 'clamp(16px,2.4vh,24px)', borderTop: '1px solid rgba(212,160,90,.32)' }}
              >
                <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(20px,2.4vw,34px)', letterSpacing: '.14em', color: '#d4a05a' }}>
                  {f.title}
                </span>
                <span style={{ fontSize: 'clamp(12px,1.05vw,15px)', lineHeight: 1.7, color: '#b3ab9d' }}>{f.body}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px,11vh,130px) clamp(20px,5vw,80px) clamp(50px,8vh,90px)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(30px,5vh,52px)' }}>
          <div style={eyebrowMuted}>06 — LEADERSHIP</div>
          <Reveal
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: 'clamp(24px,4vw,56px)', alignItems: 'center' }}
          >
            <div style={{ aspectRatio: FRAMES.portrait.css, maxWidth: 380, width: '100%' }}>
              <ImageSlot alt="Portrait — Prashant Ingole" placeholder="PORTRAIT — Prashant Ingole" shape="rect" frame="portrait" sizes="(max-width: 760px) 92vw, 380px" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px,2.6vh,26px)' }}>
              <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(24px,3.4vw,50px)', lineHeight: 1, letterSpacing: '.04em', color: '#ece6da' }}>
                PRASHANT INGOLE
              </span>
              <span style={{ fontSize: 'clamp(9px,.78vw,11px)', letterSpacing: '.36em', color: '#d4a05a' }}>FOUNDER / CREATIVE LEAD</span>
              <span style={{ fontSize: 'clamp(12px,1.05vw,15px)', lineHeight: 1.9, letterSpacing: '.06em', color: '#b3ab9d' }}>
                Storytelling · Music · Direction · Creative Development
              </span>
              <Link
                href="/work"
                className="gs-hover-accent"
                style={{ marginTop: 8, alignSelf: 'flex-start', fontSize: 10, letterSpacing: '.3em', color: '#8f887c', borderBottom: '1px solid rgba(143,136,124,.4)', paddingBottom: 5 }}
              >
                SELECTED WORK →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
