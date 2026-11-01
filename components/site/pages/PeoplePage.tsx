'use client';

import { useState } from 'react';
import { FRAMES } from '@/content/frames';
import { ImageSlot } from '@/components/godsown/overlay/ImageSlot';
import { CometCard } from '@/components/ui/comet-card';
import { PageShell } from '../PageShell';
import { PosterCarousel } from '../PosterCarousel';
import { Reveal } from '../Reveal';

const PRASHANT_WORK = [
  { title: 'BAJIRAO MASTANI', status: 'FEATURE FILM' },
  { title: 'MARY KOM', status: 'FEATURE FILM' },
  { title: 'RACE 2', status: 'FEATURE FILM' },
  { title: '83', status: 'FEATURE FILM' },
  { title: 'JALEBI', status: 'FEATURE FILM' },
  { title: 'BUDH (AWAKENING)', status: 'SHORT FILM' },
];

const PRASHANT_BIO = [
  `Over the past decade, I've had the privilege of contributing to some incredible films such as Bajirao Mastani, Mary Kom, Race 2, 83, and Jalebi. Each project has been a journey where music and storytelling come together to create moments that audiences carry with them.`,
  `Songs like Malhari, Party On My Mind, Ziddi Dil, and Pal have been particularly special in my journey. Every song comes from a place of deep emotion and intent—whether it's the infectious energy of celebration, the spirit of determination, or the quiet beauty of love.`,
  `While music has been my first love, storytelling has always pushed me to explore beyond lyrics. That passion led me to step behind the camera with my short film Budh (Awakening). The film, which focuses on women empowerment, became an important creative milestone for me. It was an opportunity to use cinema not just as entertainment, but as a voice—to question, to provoke thought, and hopefully to inspire change. The recognition and appreciation the film received reaffirmed my belief in the power of stories.`,
  `For me, whether I'm writing a song or directing a film, the goal remains the same: to create something honest, powerful, and emotionally resonant. I continue to explore stories through music and cinema with the hope that they leave a lasting imprint on hearts and minds, just as the stories that inspired me once did.`,
];

const ABHIJEET_BIO = [
  `I started my journey as a footballer and played for several known clubs in Nagpur. At the age of 17, I represented my state at the national level, an experience that taught me some of the most important lessons that would later shape my approach to Filmmaking, Discipline, Teamwork, perseverance and the ability to perform under pressure.`,
  `I then pursued my MBA in Finance & Marketing from G.H. Raisoni, Nagpur. After completing my education, I worked professionally with organisations including ICICI Direct and EClerx | Morgan Stanley, across Mumbai and Pune.`,
  `While I was building my corporate career, filmmaking remained the one thing I could never put aside. I continued learning, experimenting and developing my creative skills alongside my professional work. Slowly, that passion transformed into a profession and eventually into the career.`,
  `Today, with 7+ years of professional experience in filmmaking and content production, I work primarily as a DIRECTOR, while also taking on responsibilities as a Showrunner, Creative Producer, Creative Director and Post Producer.`,
  `My work spans multiple formats and platforms from TVCs and Digital Advertising Films to Brand Films, Music Videos, Talk Shows, Corporate Films, Feature Films, Webshow, Fashion Films, Real-Estate Films, Motion Graphics, Animation and long-form content.`,
];

const eyebrowMuted = { fontSize: 'clamp(9px,.72vw,10px)', letterSpacing: '.46em', textIndent: '.46em', color: '#8f887c' } as const;
const roleStyle = { fontSize: 'clamp(9px,.78vw,11px)', letterSpacing: '.36em', color: '#d4a05a' } as const;
const skillsStyle = { fontSize: 'clamp(11px,.95vw,13px)', lineHeight: 1.9, letterSpacing: '.14em', color: '#8f887c' } as const;
const bodyColStyle = { display: 'flex', flexDirection: 'column', gap: 'clamp(14px,2.4vh,22px)', maxWidth: '60ch', fontSize: 'clamp(13px,1.08vw,16px)', lineHeight: 1.75, color: '#b3ab9d' } as const;

function PortraitCard({
  src,
  alt,
  placeholder,
  caption,
  index,
  align = 'start',
}: {
  src: string;
  alt: string;
  placeholder: string;
  caption: string;
  index: string;
  align?: 'start' | 'end';
}) {
  return (
    <CometCard style={{ width: '100%', maxWidth: 430, justifySelf: align }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          border: '1px solid rgba(236,230,218,.1)',
          background: 'linear-gradient(162deg,#141310,#0a0908)',
          padding: 'clamp(9px,.9vw,14px)',
          boxShadow: '0 40px 80px -46px rgba(0,0,0,.95)',
          transformStyle: 'preserve-3d',
        }}
      >
        <div style={{ aspectRatio: FRAMES.portrait.css, width: '100%' }}>
          <ImageSlot src={src} alt={alt} placeholder={placeholder} shape="rect" frame="portrait" sizes="(max-width: 760px) 92vw, 430px" />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            padding: 'clamp(12px,1.3vw,16px) clamp(3px,.4vw,6px) clamp(3px,.3vw,5px)',
            fontFamily: 'ui-monospace,Menlo,monospace',
            fontSize: 10,
            letterSpacing: '.2em',
            color: '#8f887c',
          }}
        >
          <span>{caption}</span>
          <span style={{ opacity: 0.5 }}>{index}</span>
        </div>
      </div>
    </CometCard>
  );
}

/**
 * Instagram, YouTube, Spotify and Apple Music, in their real brand colors —
 * same treatment as the site footer. Spotify and Apple Music are optional:
 * only a musician's profile needs them. `id` namespaces each instance's
 * gradient defs so multiple profiles on one page don't fight over the same
 * `<linearGradient id>`.
 */
function SocialIcons({
  id,
  instagram,
  youtube,
  spotify,
  appleMusic,
}: {
  id: string;
  instagram: string;
  youtube: string;
  spotify?: string;
  appleMusic?: string;
}) {
  const gradientId = `gsPeopleIgGradient-${id}`;
  const amGradientId = `gsPeopleAmGradient-${id}`;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <a
        href={instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="gs-hover-lift"
        style={{ display: 'inline-flex', width: 22, height: 22, transition: 'transform .25s ease' }}
      >
        <svg viewBox="0 0 24 24" aria-hidden style={{ width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#feda75" />
              <stop offset="30%" stopColor="#fa7e1e" />
              <stop offset="55%" stopColor="#d62976" />
              <stop offset="80%" stopColor="#962fbf" />
              <stop offset="100%" stopColor="#4f5bd5" />
            </linearGradient>
          </defs>
          <rect x={1.5} y={1.5} width={21} height={21} rx={6} fill={`url(#${gradientId})`} />
          <rect x={6.3} y={6.3} width={11.4} height={11.4} rx={3.4} fill="none" stroke="#fff" strokeWidth={1.4} />
          <circle cx={12} cy={12} r={3.4} fill="none" stroke="#fff" strokeWidth={1.4} />
          <circle cx={16.1} cy={7.9} r={0.9} fill="#fff" />
        </svg>
      </a>
      <a
        href={youtube}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="YouTube"
        className="gs-hover-lift"
        style={{ display: 'inline-flex', width: 22, height: 22, transition: 'transform .25s ease' }}
      >
        <svg viewBox="0 0 24 24" aria-hidden style={{ width: '100%', height: '100%' }}>
          <path
            d="M22.5 7.2c-.25-1.1-1.13-1.96-2.24-2.21C18.3 4.5 12 4.5 12 4.5s-6.3 0-8.26.49C2.63 5.24 1.75 6.1 1.5 7.2 1 9.14 1 12 1 12s0 2.86.5 4.8c.25 1.1 1.13 1.96 2.24 2.21C5.7 19.5 12 19.5 12 19.5s6.3 0 8.26-.49c1.11-.25 1.99-1.11 2.24-2.21.5-1.94.5-4.8.5-4.8s0-2.86-.5-4.8z"
            fill="#ff0000"
          />
          <path d="M9.8 15.3V8.7l5.8 3.3-5.8 3.3z" fill="#fff" />
        </svg>
      </a>
      {spotify && (
        <a
          href={spotify}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Spotify"
          className="gs-hover-lift"
          style={{ display: 'inline-flex', width: 22, height: 22, transition: 'transform .25s ease' }}
        >
          <svg viewBox="0 0 24 24" aria-hidden style={{ width: '100%', height: '100%' }}>
            <circle cx={12} cy={12} r={10.5} fill="#1db954" />
            <path d="M6.6 9.8c3.4-1 7.6-.8 10.4.9" fill="none" stroke="#000" strokeWidth={1.4} strokeLinecap="round" />
            <path d="M7 12.9c2.8-.8 6.3-.6 8.6.8" fill="none" stroke="#000" strokeWidth={1.3} strokeLinecap="round" />
            <path d="M7.4 15.9c2.3-.6 5-.5 6.9.7" fill="none" stroke="#000" strokeWidth={1.1} strokeLinecap="round" />
          </svg>
        </a>
      )}
      {appleMusic && (
        <a
          href={appleMusic}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Apple Music"
          className="gs-hover-lift"
          style={{ display: 'inline-flex', width: 22, height: 22, transition: 'transform .25s ease' }}
        >
          <svg viewBox="0 0 24 24" aria-hidden style={{ width: '100%', height: '100%' }}>
            <defs>
              <linearGradient id={amGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fa6e72" />
                <stop offset="100%" stopColor="#fa233b" />
              </linearGradient>
            </defs>
            <rect x={1.5} y={1.5} width={21} height={21} rx={6} fill={`url(#${amGradientId})`} />
            <path
              d="M15.8 6.6v7.2a2.3 2.3 0 1 1-1.3-2.07V9.1l-4.4.9v4.5a2.3 2.3 0 1 1-1.3-2.07V8.3c0-.33.23-.6.55-.67l5.3-1.1c.42-.09.85.23.85.66z"
              fill="#fff"
            />
          </svg>
        </a>
      )}
    </div>
  );
}

function ExpandableBio({ paragraphs }: { paragraphs: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? paragraphs : paragraphs.slice(0, 1);

  return (
    <div style={bodyColStyle}>
      {visible.map((p, i) => (
        <p key={i} style={{ margin: 0, textWrap: 'pretty' }}>
          {p}
        </p>
      ))}
      {paragraphs.length > 1 && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="gs-hover-accent"
          style={{
            alignSelf: 'flex-start',
            background: 'none',
            border: 0,
            padding: 0,
            cursor: 'pointer',
            fontSize: 10,
            letterSpacing: '.24em',
            color: '#8f887c',
            borderBottom: '1px solid rgba(143,136,124,.4)',
            paddingBottom: 4,
          }}
        >
          {expanded ? 'READ LESS' : 'READ MORE →'}
        </button>
      )}
    </div>
  );
}

export function PeoplePage() {
  return (
    <PageShell>
      <section style={{ minHeight: '42vh', display: 'flex', alignItems: 'flex-end', padding: 'clamp(90px,10vh,110px) clamp(20px,5vw,80px) clamp(40px,7vh,80px)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(24px,4vh,42px)' }}>
          <Reveal style={{ fontSize: 'clamp(9px,.72vw,10px)', letterSpacing: '.46em', textIndent: '.46em', color: '#d4a05a' }}>
            PEOPLE
          </Reveal>
          <Reveal
            as="h1"
            delay={60}
            style={{ margin: 0, fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(34px,7.4vw,124px)', lineHeight: 1, letterSpacing: '.09em', textIndent: '.09em', color: '#ece6da' }}
          >
            THE MAKERS
          </Reveal>
          <Reveal delay={120} style={{ maxWidth: '52ch' }}>
            <p style={{ margin: 0, fontSize: 'clamp(13px,1.15vw,17px)', lineHeight: 1.7, color: '#b3ab9d' }}>
              A studio is the people who choose what gets made. Leadership, collaborators and the wider network the
              work is built with.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PRASHANT INGOLE */}
      <section style={{ padding: 'clamp(40px,8vh,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(30px,5vh,56px)' }}>
          <Reveal style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,270px),1fr))', gap: 'clamp(26px,4.4vw,64px)', alignItems: 'start' }}>
            <PortraitCard
              src="/media/people/prashant-ingole.jpg"
              alt="Portrait — Prashant Ingole"
              placeholder="PORTRAIT — Prashant Ingole"
              caption="PRASHANT INGOLE"
              index="01"
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(26px,4vh,40px)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px,2.4vh,22px)' }}>
                <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(28px,4.2vw,66px)', lineHeight: 1, letterSpacing: '.04em', color: '#ece6da' }}>
                  PRASHANT INGOLE
                </span>
                <span style={roleStyle}>FOUNDER / CREATIVE LEAD</span>
                <span style={skillsStyle}>LYRICIST · WRITER · DIRECTOR</span>
                <SocialIcons
                  id="prashant"
                  instagram="https://instagram.com/prashantingole"
                  youtube="https://youtube.com/@prashantingole"
                  spotify="https://open.spotify.com/artist/prashantingole"
                  appleMusic="https://music.apple.com/artist/prashant-ingole"
                />
              </div>
              <ExpandableBio paragraphs={PRASHANT_BIO} />
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: 'clamp(10px,2vh,30px) 0 clamp(30px,5vh,70px)' }}>
        <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px,2.4vh,26px)' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: 16,
              padding: '0 clamp(20px,5vw,80px)',
              maxWidth: 1320,
              margin: '0 auto',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <span style={eyebrowMuted}>SELECTED WORK — PRASHANT INGOLE</span>
            <span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 10, letterSpacing: '.16em', color: '#8f887c' }}>DRAG TO TURN</span>
          </div>
          <PosterCarousel items={PRASHANT_WORK} />
        </Reveal>
      </section>

      {/* ABHIJEET NAG */}
      <section style={{ padding: 'clamp(40px,8vh,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(30px,5vh,56px)' }}>
          <Reveal style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,270px),1fr))', gap: 'clamp(26px,4.4vw,64px)', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(26px,4vh,40px)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px,2.4vh,22px)' }}>
                <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(28px,4.2vw,66px)', lineHeight: 1, letterSpacing: '.04em', color: '#ece6da' }}>
                  ABHIJEET NAG
                </span>
                <span style={roleStyle}>DIRECTOR / SHOWRUNNER</span>
                <span style={skillsStyle}>DIRECTOR · SHOWRUNNER · CREATIVE PRODUCER · POST PRODUCER</span>
                <SocialIcons
                  id="abhijeet"
                  instagram="https://instagram.com/abhijeetnag"
                  youtube="https://youtube.com/@abhijeetnag"
                />
              </div>
              <ExpandableBio paragraphs={ABHIJEET_BIO} />
            </div>
            <PortraitCard
              src="/media/people/abhijeet-nag.png"
              alt="Portrait — Abhijeet Nag"
              placeholder="PORTRAIT — Abhijeet Nag"
              caption="ABHIJEET NAG"
              index="02"
              align="end"
            />
          </Reveal>
        </div>
      </section>

      <section style={{ padding: 'clamp(10px,2vh,30px) 0 clamp(30px,5vh,70px)' }}>
        <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px,2.4vh,26px)' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: 16,
              padding: '0 clamp(20px,5vw,80px)',
              maxWidth: 1320,
              margin: '0 auto',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <span style={eyebrowMuted}>SELECTED WORK</span>
            <span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 10, letterSpacing: '.16em', color: '#8f887c' }}>DRAG TO TURN</span>
          </div>
          <PosterCarousel items={PRASHANT_WORK} />
        </Reveal>
      </section>
    </PageShell>
  );
}
