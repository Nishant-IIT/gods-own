'use client';

import { useState } from 'react';
import { ImageSlot } from '@/components/godsown/overlay/ImageSlot';
import { CometCard } from '@/components/ui/comet-card';
import { PageShell } from '../PageShell';
import { PosterCarousel } from '../PosterCarousel';
import { Reveal } from '../Reveal';

const PRASHANT_WORK = [
  { title: 'BAJIRAO MASTANI', status: 'FEATURE FILM', href: '/work' },
  { title: 'MARY KOM', status: 'FEATURE FILM', href: '/work' },
  { title: 'RACE 2', status: 'FEATURE FILM', href: '/work' },
  { title: '83', status: 'FEATURE FILM', href: '/work' },
  { title: 'JALEBI', status: 'FEATURE FILM', href: '/work' },
  { title: 'BUDH (AWAKENING)', status: 'SHORT FILM', href: '/work' },
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
        <div style={{ aspectRatio: '4/5', width: '100%' }}>
          <ImageSlot src={src} alt={alt} placeholder={placeholder} shape="rect" />
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
