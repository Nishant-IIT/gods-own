'use client';

import Link from 'next/link';
import { ImageSlot } from '@/components/godsown/overlay/ImageSlot';
import { PageShell } from '../PageShell';
import { Reveal } from '../Reveal';

const ENGINE = [
  { n: '01', title: 'STORY', items: ['Development', 'Writing', 'Concepts', 'Adaptations'] },
  { n: '02', title: 'PRODUCTION', items: ['Film', 'Series', 'Music', 'Commercials'] },
  { n: '03', title: 'WORLD BUILDING', items: ['Animation', 'VFX', 'Virtual Production', 'AI'] },
  { n: '04', title: 'DISTRIBUTION', items: ['Theatrical', 'OTT', 'Music', 'Digital', 'International'] },
];

const IP_CHAIN = ['IDEA', 'WORLD', 'CHARACTERS', 'CONTENT', 'AUDIENCE', 'DISTRIBUTION', 'IP', 'NEW STORIES'];

const SLATE_PREVIEW = [
  { title: 'ORION', format: 'Feature Film · Sci-Fi / Thriller', status: 'IN DEVELOPMENT', ph: 'ORION — key art' },
  { title: 'RAGA', format: 'Limited Series · Musical Drama', status: 'SCRIPT DEVELOPMENT', ph: 'RAGA — key art' },
  { title: 'ARYA', format: 'Series · Fantasy / Adventure', status: 'EARLY DEVELOPMENT', ph: 'ARYA — key art' },
];

const CREDITS = [
  { title: 'MALHARI', film: 'BAJIRAO MASTANI', year: '2015' },
  { title: 'GAJANANA', film: 'BAJIRAO MASTANI', year: '2015' },
  { title: 'ZIDDI DIL', film: 'MARY KOM', year: '2014' },
  { title: 'PARTY ON MY MIND', film: 'RACE 2', year: '2013' },
  { title: 'PAL', film: 'JALEBI', year: '2018' },
  { title: 'UDHAL HO', film: 'MALAAL', year: '2019' },
  { title: 'UTTH JA ZIDDI RE', film: '83', year: '2021' },
];

const PATHS = ['THEATRICAL', 'OTT', 'MUSIC', 'DIGITAL', 'BRAND', 'LICENSING', 'GLOBAL'];

const MARKET = [
  { figure: '₹2.78T', label: "India's media and entertainment sector in 2025, up 9% year on year" },
  { figure: '₹1T+', label: 'Digital media, now the single largest segment, crossing a trillion rupees for the first time' },
  { figure: '₹947B', label: 'Digital advertising, up 26%, close to two-thirds of all ad revenue' },
  { figure: '₹3.3T', label: 'Projected size of the sector by 2028' },
];

const FUTURE = [
  { title: 'BUILD', body: 'Original stories and worlds.' },
  { title: 'PARTNER', body: 'With exceptional creators, talent and platforms.' },
  { title: 'OWN', body: 'Long-term entertainment assets and IP.' },
];

const DOORS = [
  { title: 'INVEST', body: 'For investors and strategic capital.', cta: 'START A CONVERSATION →', subject: 'Investment enquiry' },
  { title: 'PARTNER', body: 'For studios, producers, brands and platforms.', cta: 'START A CONVERSATION →', subject: 'Partnership enquiry' },
  { title: 'DISTRIBUTE', body: 'For theatrical, OTT, music and international partners.', cta: 'START A CONVERSATION →', subject: 'Distribution enquiry' },
  { title: 'CREATE', body: 'For artists, filmmakers and creators.', cta: 'SEND YOUR WORK →', subject: 'Creative collaboration' },
];

const sectionPad = 'clamp(70px,13vh,150px) clamp(20px,5vw,80px)';
const eyebrow = { fontSize: 'clamp(9px,.72vw,10px)', letterSpacing: '.46em', textIndent: '.46em', color: '#d4a05a' } as const;
const eyebrowMuted = { ...eyebrow, color: '#8f887c' };
const h2Style = {
  margin: 0,
  fontFamily: "'Oswald',sans-serif",
  fontWeight: 200,
  fontSize: 'clamp(26px,4.4vw,68px)',
  lineHeight: 1.08,
  letterSpacing: '.06em',
  color: '#ece6da',
} as const;
const bodyStyle = { margin: 0, fontSize: 'clamp(13px,1.1vw,17px)', lineHeight: 1.7, color: '#b3ab9d' } as const;

export function HomePage() {
  return (
    <PageShell>
      {/* 01 ENTRY */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 'clamp(26px,5vh,58px)',
          padding: 'clamp(100px,14vh,150px) clamp(20px,5vw,80px) clamp(70px,10vh,110px)',
          textAlign: 'center',
        }}
      >
        <Reveal
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(20px,3.8vh,40px)' }}
        >
          <h1
            style={{
              margin: 0,
              fontFamily: "'Oswald',sans-serif",
              fontWeight: 200,
              fontSize: 'clamp(34px,8vw,132px)',
              lineHeight: 0.98,
              letterSpacing: '.18em',
              textIndent: '.18em',
              color: '#ece6da',
            }}
          >
            GOD&apos;S OWN
            <br />
            MOTION PICTURES
          </h1>
          <div style={{ fontSize: 'clamp(9px,.82vw,12px)', letterSpacing: '.44em', textIndent: '.44em', color: '#8f887c' }}>
            STORIES WRITTEN. WORLDS CREATED.
          </div>
        </Reveal>
        <Reveal delay={90} style={{ maxWidth: '56ch' }}>
          <p style={{ margin: 0, fontSize: 'clamp(13px,1.15vw,17px)', lineHeight: 1.7, letterSpacing: '.02em', color: '#b3ab9d' }}>
            An independent entertainment studio developing stories, content and original IP for audiences in India and
            around the world.
          </p>
        </Reveal>
        <Reveal delay={160} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(12px,1.6vw,20px)' }}>
          <Link
            href="/studio"
            className="gs-hover-fill"
            style={{ padding: '15px clamp(20px,2.6vw,34px)', fontSize: 10, letterSpacing: '.3em', color: '#000', background: '#ece6da' }}
          >
            EXPLORE THE STUDIO
          </Link>
          <Link
            href="/slate"
            className="gs-hover-outline"
            style={{
              padding: '15px clamp(20px,2.6vw,34px)',
              fontSize: 10,
              letterSpacing: '.3em',
              color: '#ece6da',
              boxShadow: 'inset 0 0 0 1px rgba(236,230,218,.28)',
            }}
          >
            VIEW THE SLATE
          </Link>
        </Reveal>
        <Reveal delay={230} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9, color: '#8f887c' }}>
          <span style={{ fontSize: 8, letterSpacing: '.4em', textIndent: '.4em' }}>SCROLL</span>
          <span
            style={{
              display: 'block',
              width: 1,
              height: 24,
              background: '#8f887c',
              animation: 'gs-breathe 2.6s ease-in-out infinite',
            }}
          />
        </Reveal>
      </section>

      {/* 02 WHAT IS GOD'S OWN */}
      <section id="about" style={{ padding: sectionPad }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(34px,6vh,66px)' }}>
          <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px,3.4vh,34px)' }}>
            <div style={eyebrow}>02 — THE COMPANY</div>
            <h2 style={{ ...h2Style, maxWidth: '24ch', fontSize: 'clamp(26px,4.4vw,68px)', textWrap: 'balance' }}>
              AN ENTERTAINMENT STUDIO BUILT FOR WHAT COMES NEXT.
            </h2>
            <p style={{ ...bodyStyle, maxWidth: '62ch', textWrap: 'pretty' }}>
              GOD&apos;S OWN MOTION PICTURES develops and produces films, series, music, branded entertainment and
              emerging digital formats, bringing together creative talent, production expertise and technology.
            </p>
          </Reveal>
          <Reveal
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,270px),1fr))',
              gap: 'clamp(20px,3vw,44px)',
              alignItems: 'stretch',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                padding: 'clamp(22px,3vw,36px)',
                boxShadow: 'inset 0 0 0 1px rgba(236,230,218,.1)',
              }}
            >
              <span style={{ fontSize: 9, letterSpacing: '.4em', color: '#8f887c' }}>TODAY</span>
              <span
                style={{
                  fontFamily: "'Oswald',sans-serif",
                  fontWeight: 300,
                  fontSize: 'clamp(19px,2.2vw,32px)',
                  lineHeight: 1.25,
                  letterSpacing: '.03em',
                  color: '#ece6da',
                }}
              >
                Production
                <br />
                Content
                <br />
                Talent
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                padding: 'clamp(22px,3vw,36px)',
                boxShadow: 'inset 0 0 0 1px rgba(212,160,90,.3)',
              }}
            >
              <span style={{ fontSize: 9, letterSpacing: '.4em', color: '#d4a05a' }}>TOMORROW</span>
              <span
                style={{
                  fontFamily: "'Oswald',sans-serif",
                  fontWeight: 300,
                  fontSize: 'clamp(19px,2.2vw,32px)',
                  lineHeight: 1.25,
                  letterSpacing: '.03em',
                  color: '#ece6da',
                }}
              >
                Original IP
                <br />
                Franchises
                <br />
                Global audiences
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03 THE STUDIO ENGINE */}
      <section id="studio" style={{ padding: sectionPad }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(34px,6vh,60px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={eyebrow}>03 — THE STUDIO</div>
            <h2 style={h2Style}>THE STUDIO ENGINE</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,225px),1fr))', gap: 'clamp(14px,2vw,26px)' }}>
            {ENGINE.map((e, i) => (
              <Reveal
                key={e.n}
                delay={i * 70}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(16px,2.6vh,26px)',
                  padding: 'clamp(22px,3vw,38px)',
                  background: '#000',
                  boxShadow: 'inset 0 0 0 1px rgba(236,230,218,.1)',
                }}
              >
                <span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 10, letterSpacing: '.2em', color: '#8f887c' }}>
                  {e.n}
                </span>
                <span
                  style={{
                    fontFamily: "'Oswald',sans-serif",
                    fontWeight: 300,
                    fontSize: 'clamp(18px,2vw,28px)',
                    lineHeight: 1.15,
                    letterSpacing: '.06em',
                    color: '#ece6da',
                  }}
                >
                  {e.title}
                </span>
                <span style={{ fontSize: 'clamp(12px,1vw,14px)', lineHeight: 2, letterSpacing: '.04em', color: '#b3ab9d', whiteSpace: 'pre-line' }}>
                  {e.items.join('\n')}
                </span>
              </Reveal>
            ))}
          </div>
          <Reveal
            style={{
              maxWidth: '52ch',
              fontFamily: "'Oswald',sans-serif",
              fontWeight: 200,
              fontSize: 'clamp(15px,1.7vw,26px)',
              lineHeight: 1.5,
              letterSpacing: '.04em',
              color: '#ece6da',
            }}
          >
            These are not disconnected services. They are components of one entertainment engine.
          </Reveal>
        </div>
      </section>

      {/* 04 THE IP ENGINE */}
      <section id="ip" style={{ padding: sectionPad }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(34px,6vh,62px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={eyebrow}>04 — THE IP ENGINE</div>
            <h2 style={h2Style}>FROM STORY TO IP</h2>
          </div>
          <Reveal style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(8px,1.2vw,16px)' }}>
            {IP_CHAIN.map((label, i) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px,1.2vw,16px)' }}>
                <span
                  style={{
                    fontFamily: "'Oswald',sans-serif",
                    fontWeight: 300,
                    fontSize: 'clamp(14px,1.9vw,28px)',
                    letterSpacing: '.1em',
                    color: label === 'IP' ? '#d4a05a' : '#ece6da',
                  }}
                >
                  {label}
                </span>
                {i < IP_CHAIN.length - 1 && <span style={{ fontSize: 'clamp(11px,1.2vw,16px)', color: '#8f887c' }}>→</span>}
              </div>
            ))}
          </Reveal>
          <Reveal style={{ maxWidth: '62ch' }}>
            <p style={bodyStyle}>
              We look beyond a single release. Our long-term ambition is to develop stories, characters and worlds
              that can evolve across formats, platforms and audiences.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 05 THE SLATE */}
      <section id="slate" style={{ padding: sectionPad }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(30px,5vh,56px)' }}>
          <Reveal
            style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={eyebrow}>05 — THE SLATE</div>
              <h2 style={h2Style}>STORIES IN MOTION</h2>
            </div>
            <Link
              href="/slate"
              className="gs-hover-accent"
              style={{ fontSize: 10, letterSpacing: '.3em', color: '#8f887c', borderBottom: '1px solid rgba(143,136,124,.4)', paddingBottom: 5 }}
            >
              VIEW FULL SLATE →
            </Link>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,290px),1fr))', gap: 'clamp(18px,2.4vw,32px)' }}>
            {SLATE_PREVIEW.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 70}
                style={{ display: 'flex', flexDirection: 'column', background: '#0a0a0a', boxShadow: 'inset 0 0 0 1px rgba(236,230,218,.09)' }}
              >
                <div style={{ position: 'relative', aspectRatio: '3/2', overflow: 'hidden' }}>
                  <ImageSlot alt={s.ph} placeholder={s.ph} shape="rect" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 'clamp(20px,2.4vw,30px)' }}>
                  <span
                    style={{
                      fontFamily: "'Oswald',sans-serif",
                      fontWeight: 300,
                      fontSize: 'clamp(22px,2.6vw,40px)',
                      lineHeight: 1,
                      letterSpacing: '.06em',
                      color: '#ece6da',
                    }}
                  >
                    {s.title}
                  </span>
                  <span style={{ fontSize: 'clamp(11px,.9vw,13px)', letterSpacing: '.06em', color: '#b3ab9d' }}>{s.format}</span>
                  <span style={{ fontSize: 9, letterSpacing: '.3em', color: '#d4a05a', marginTop: 6 }}>{s.status}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <p style={{ margin: 0, fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 10, letterSpacing: '.16em', color: '#8f887c' }}>
            PLACEHOLDER TITLES — SLATE TO BE CONFIRMED
          </p>
        </div>
      </section>

      {/* 06 THE AUDIENCE */}
      <section id="audience" style={{ padding: sectionPad }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(34px,6vh,62px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={eyebrow}>06 — THE AUDIENCE</div>
            <h2 style={h2Style}>STORIES WITHOUT BORDERS</h2>
          </div>
          <Reveal
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,230px),1fr))', gap: 'clamp(20px,3vw,40px)' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(20px,2.4vw,34px)', letterSpacing: '.08em', color: '#ece6da' }}>
                INDIA
              </span>
              <span style={{ fontSize: 'clamp(12px,1vw,14px)', lineHeight: 2, letterSpacing: '.04em', color: '#b3ab9d' }}>
                Hindi
                <br />
                Regional
                <br />
                Youth / Gen Z
                <br />
                Digital
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(20px,2.4vw,34px)', letterSpacing: '.08em', color: '#ece6da' }}>
                DIASPORA
              </span>
              <span style={{ fontSize: 'clamp(12px,1vw,14px)', lineHeight: 2, letterSpacing: '.04em', color: '#b3ab9d' }}>
                Language
                <br />
                Music
                <br />
                Familiarity
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(20px,2.4vw,34px)', letterSpacing: '.08em', color: '#d4a05a' }}>
                GLOBAL
              </span>
              <span style={{ fontSize: 'clamp(12px,1vw,14px)', lineHeight: 2, letterSpacing: '.04em', color: '#b3ab9d' }}>
                Genre
                <br />
                Emotion
                <br />
                Characters
              </span>
            </div>
          </Reveal>
          <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(18px,3vh,30px)' }}>
            <p style={{ margin: 0, maxWidth: '34ch', fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(20px,3vw,46px)', lineHeight: 1.22, letterSpacing: '.03em', color: '#ece6da', textWrap: 'balance' }}>
              Born in India. Built for audiences everywhere.
            </p>
            <p style={{ ...bodyStyle, maxWidth: '62ch' }}>
              Our ambition is to build stories that can travel beyond their original market through genre, emotion,
              music and characters.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 07 PROOF */}
      <section id="work" style={{ padding: sectionPad }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(34px,6vh,60px)' }}>
          <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={eyebrow}>07 — PROOF</div>
            <h2 style={h2Style}>BUILT ON EXPERIENCE.</h2>
            <p style={{ ...bodyStyle, maxWidth: '56ch' }}>
              Selected credits written by the studio&apos;s founding creative lead across Hindi film and music.
            </p>
            <Link
              href="/work"
              className="gs-hover-accent"
              style={{ alignSelf: 'flex-start', marginTop: 6, fontSize: 10, letterSpacing: '.3em', color: '#8f887c', borderBottom: '1px solid rgba(143,136,124,.4)', paddingBottom: 5 }}
            >
              ALL SELECTED WORK →
            </Link>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {CREDITS.map((c) => (
              <div
                key={c.title}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: 'clamp(12px,3vw,40px)',
                  padding: 'clamp(16px,2.4vh,26px) 0',
                  borderTop: '1px solid rgba(236,230,218,.1)',
                }}
              >
                <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(19px,2.6vw,40px)', lineHeight: 1.05, letterSpacing: '.04em', color: '#ece6da' }}>
                  {c.title}
                </span>
                <span style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(12px,2.4vw,32px)', fontSize: 'clamp(10px,.8vw,12px)', letterSpacing: '.28em', color: '#8f887c' }}>
                  <span>{c.film}</span>
                  <span>{c.year}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08 PEOPLE */}
      <section id="people" style={{ padding: sectionPad }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(40px,7vh,76px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={eyebrow}>08 — PEOPLE</div>
            <h2 style={h2Style}>THE MAKERS</h2>
          </div>
          <Reveal
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 'clamp(24px,4vw,56px)', alignItems: 'center' }}
          >
            <div style={{ aspectRatio: '4/5', maxWidth: 420, width: '100%' }}>
              <ImageSlot alt="Portrait — Prashant Ingole" placeholder="PORTRAIT — Prashant Ingole" shape="rect" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px,2.6vh,26px)' }}>
              <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(26px,3.6vw,56px)', lineHeight: 1, letterSpacing: '.04em', color: '#ece6da' }}>
                PRASHANT INGOLE
              </span>
              <span style={{ fontSize: 'clamp(9px,.78vw,11px)', letterSpacing: '.36em', color: '#d4a05a' }}>FOUNDER / CREATIVE LEAD</span>
              <span style={{ fontSize: 'clamp(12px,1.05vw,15px)', lineHeight: 1.9, letterSpacing: '.06em', color: '#b3ab9d' }}>
                Storytelling · Music · Direction · Creative Development
              </span>
            </div>
          </Reveal>
          <Reveal
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(22px,4vh,38px)',
              paddingTop: 'clamp(24px,4vh,44px)',
              borderTop: '1px solid rgba(236,230,218,.1)',
            }}
          >
            <span style={eyebrowMuted}>TALENT NETWORK</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(14px,2.4vw,34px)', fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(15px,1.9vw,30px)', letterSpacing: '.06em', color: '#ece6da' }}>
              {['Established Artists', 'Emerging Creators', 'Filmmakers', 'Writers', 'Musicians', 'Technical Talent'].map((t, i, arr) => (
                <span key={t} style={{ display: 'contents' }}>
                  <span>{t}</span>
                  {i < arr.length - 1 && <span style={{ color: '#8f887c' }}>·</span>}
                </span>
              ))}
            </div>
            <p style={{ ...bodyStyle, maxWidth: '56ch' }}>
              We collaborate with established voices and discover the next generation of storytellers.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 09 COMMERCIAL ECOSYSTEM */}
      <section style={{ padding: sectionPad }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(34px,6vh,60px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={eyebrow}>09 — THE MODEL</div>
            <h2 style={h2Style}>ONE STORY. MANY PATHS.</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px,2.4vh,26px)' }}>
            <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(20px,2.6vw,38px)', letterSpacing: '.1em', color: '#ece6da' }}>
              STORY
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,150px),1fr))', gap: 'clamp(10px,1.4vw,18px)' }}>
              {PATHS.map((label, i) => (
                <Reveal
                  key={label}
                  delay={Math.min(i, 5) * 70}
                  style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 'clamp(16px,2.2vw,26px)', background: '#000', boxShadow: 'inset 0 0 0 1px rgba(236,230,218,.1)' }}
                >
                  <span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 9, letterSpacing: '.2em', color: '#8f887c' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: 'clamp(11px,.95vw,14px)', letterSpacing: '.22em', color: '#ece6da' }}>{label}</span>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal
            style={{
              maxWidth: '48ch',
              fontFamily: "'Oswald',sans-serif",
              fontWeight: 200,
              fontSize: 'clamp(15px,1.7vw,26px)',
              lineHeight: 1.5,
              letterSpacing: '.04em',
              color: '#ece6da',
            }}
          >
            One successful property does not equal one revenue event.
          </Reveal>
        </div>
      </section>

      {/* 10 WHY NOW */}
      <section style={{ padding: sectionPad }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(34px,6vh,60px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={eyebrow}>10 — CONTEXT</div>
            <h2 style={h2Style}>WHY NOW</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,210px),1fr))', gap: 'clamp(20px,3vw,44px)' }}>
            {MARKET.map((m, i) => (
              <Reveal key={m.figure} delay={i * 70} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(30px,4.4vw,64px)', lineHeight: 1, letterSpacing: '.01em', color: '#ece6da' }}>
                  {m.figure}
                </span>
                <span style={{ fontSize: 'clamp(12px,1vw,14px)', lineHeight: 1.65, color: '#b3ab9d' }}>{m.label}</span>
              </Reveal>
            ))}
          </div>
          <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px,2.6vh,26px)' }}>
            <p style={{ margin: 0, maxWidth: '52ch', fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(16px,1.9vw,29px)', lineHeight: 1.45, letterSpacing: '.03em', color: '#ece6da' }}>
              A larger digital audience. More platforms. New production technologies. And increasing opportunities
              for Indian stories to travel globally.
            </p>
            <span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 10, letterSpacing: '.14em', color: '#8f887c' }}>
              SOURCE — FICCI-EY MEDIA &amp; ENTERTAINMENT REPORT, MARCH 2026
            </span>
          </Reveal>
        </div>
      </section>

      {/* 11 FUTURE */}
      <section style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', padding: sectionPad }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(36px,6.5vh,70px)' }}>
          <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(22px,4vh,38px)' }}>
            <h2 style={{ margin: 0, fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(28px,5.4vw,88px)', lineHeight: 1.05, letterSpacing: '.04em', color: '#ece6da', textWrap: 'balance' }}>
              BUILDING WHAT COMES NEXT.
            </h2>
            <p style={{ margin: 0, maxWidth: '34ch', fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(15px,1.8vw,27px)', lineHeight: 1.55, letterSpacing: '.06em', color: '#8f887c' }}>
              From production company
              <br />
              to content studio
              <br />
              to IP-led entertainment company.
            </p>
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
          <Reveal style={{ fontSize: 'clamp(9px,.78vw,11px)', letterSpacing: '.44em', textIndent: '.44em', color: '#ece6da' }}>
            THE NEXT WORLD IS WAITING.
          </Reveal>
        </div>
      </section>

      {/* 12 FINAL CTA */}
      <section id="contact" style={{ padding: 'clamp(70px,13vh,150px) clamp(20px,5vw,80px) clamp(50px,8vh,90px)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(34px,6vh,62px)' }}>
          <Reveal
            as="h2"
            style={{ margin: 0, maxWidth: '22ch', fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(28px,5vw,80px)', lineHeight: 1.06, letterSpacing: '.03em', color: '#ece6da', textWrap: 'balance' }}
          >
            LET&apos;S BUILD SOMETHING THAT TRAVELS.
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,230px),1fr))', gap: 'clamp(14px,2vw,26px)' }}>
            {DOORS.map((d, i) => (
              <Reveal
                key={d.title}
                as="a"
                href={`mailto:hello@godsownmotionpictures.com?subject=${encodeURIComponent(d.subject)}`}
                delay={i * 70}
                className="gs-hover-void"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  padding: 'clamp(24px,3.4vw,44px)',
                  background: '#000',
                  color: '#ece6da',
                  boxShadow: 'inset 0 0 0 1px rgba(236,230,218,.1)',
                  textDecoration: 'none',
                }}
              >
                <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(19px,2.2vw,32px)', letterSpacing: '.14em', color: '#ece6da' }}>
                  {d.title}
                </span>
                <span style={{ fontSize: 'clamp(11px,.95vw,14px)', lineHeight: 1.65, color: '#b3ab9d' }}>{d.body}</span>
                <span style={{ marginTop: 8, fontSize: 9, letterSpacing: '.3em', color: '#d4a05a' }}>{d.cta}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
