'use client';

import Link from 'next/link';
import { LogoRibbon } from '@/components/ui/logo-ribbon';
import { SLATE_PROJECTS } from '../data/slateProjects';
import { HeroPreloader } from '../HeroPreloader';
import { NetflixCarousel } from '../NetflixCarousel';
import { PageShell } from '../PageShell';
import { Reveal } from '../Reveal';

const SHOWREEL_SLIDES = SLATE_PROJECTS.map((p) => ({
  title: p.title,
  meta: p.format.toUpperCase(),
  placeholder: `${p.title} — showreel still`,
}));

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
    <>
      <HeroPreloader />
      <PageShell>
        {/* SHOWREEL */}
        <section style={{ padding: 'clamp(20px,4vh,60px) clamp(20px,5vw,80px) clamp(50px,9vh,110px)' }}>
          <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(20px,3.4vh,36px)' }}>
            <Reveal style={eyebrow}>SHOWREEL</Reveal>
            <Reveal delay={90}>
              <NetflixCarousel slides={SHOWREEL_SLIDES} frame="cinematic" />
            </Reveal>
          </div>
        </section>

        {/* BRAND WORK */}
        <section style={{ padding: 'clamp(40px,6vh,80px) clamp(20px,5vw,80px) clamp(50px,9vh,110px)' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto' }}>
            <Reveal>
              <LogoRibbon />
            </Reveal>
          </div>
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
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 'clamp(18px,2.6vw,32px)',
                padding: 'clamp(26px,3.6vw,46px) 0',
                borderTop: '1px solid rgba(236,230,218,.14)',
                borderBottom: '1px solid rgba(236,230,218,.14)',
              }}
            >
              <div style={{ flex: '1 1 240px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={{ fontSize: 10, letterSpacing: '.4em', textIndent: '.4em', color: '#8f887c' }}>TODAY</span>
                <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(18px,2vw,27px)', letterSpacing: '.02em', color: '#ece6da' }}>
                  Production · Content · Talent
                </span>
              </div>
              <span
                aria-hidden
                className="gs-today-tomorrow-arrow"
                style={{
                  flex: '0 0 auto',
                  fontSize: 'clamp(18px,2.2vw,30px)',
                  color: '#d4a05a',
                }}
              >
                →
              </span>
              <div style={{ flex: '1 1 240px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={{ fontSize: 10, letterSpacing: '.4em', textIndent: '.4em', color: '#d4a05a' }}>TOMORROW</span>
                <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(18px,2vw,27px)', letterSpacing: '.02em', color: '#ece6da' }}>
                  Original IP · Franchises · Global audiences
                </span>
              </div>
            </Reveal>
          </div>
        </section>
  
        {/* 03 THE AUDIENCE */}
        <section id="audience" style={{ padding: sectionPad }}>
          <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(34px,6vh,62px)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={eyebrow}>03 — THE AUDIENCE</div>
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
  
        {/* 04 PROOF */}
        <section id="work" style={{ padding: sectionPad }}>
          <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(34px,6vh,60px)' }}>
            <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={eyebrow}>04 — PROOF</div>
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

        {/* 05 COMMERCIAL ECOSYSTEM */}
        <section style={{ padding: sectionPad }}>
          <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(34px,6vh,60px)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={eyebrow}>05 — THE MODEL</div>
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
  
        {/* 06 WHY NOW */}
        <section style={{ padding: sectionPad }}>
          <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(34px,6vh,60px)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={eyebrow}>06 — CONTEXT</div>
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
  
        {/* 07 FUTURE */}
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
  
        {/* 08 FINAL CTA */}
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
                  href={
                    d.cta.startsWith('START A CONVERSATION')
                      ? `/contact?subject=${encodeURIComponent(d.subject)}`
                      : `mailto:hello@godsownmotionpictures.com?subject=${encodeURIComponent(d.subject)}`
                  }
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
    </>
  );
}
