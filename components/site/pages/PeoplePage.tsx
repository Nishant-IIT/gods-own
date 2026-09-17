'use client';

import Link from 'next/link';
import { BackBar } from '../BackBar';
import { ImageSlot } from '@/components/godsown/overlay/ImageSlot';
import { PageShell } from '../PageShell';
import { Reveal } from '../Reveal';

const LEADS = [
  { name: 'NAME TO COME', role: 'HEAD OF DEVELOPMENT', body: 'Runs the script pipeline from first idea to greenlight-ready draft.', ph: 'PORTRAIT — Head of Development' },
  { name: 'NAME TO COME', role: 'HEAD OF PRODUCTION', body: 'Owns schedule, budget and delivery across film, series and music.', ph: 'PORTRAIT — Head of Production' },
  { name: 'NAME TO COME', role: 'HEAD OF BUSINESS', body: 'Partnerships, distribution and the commercial life of each property.', ph: 'PORTRAIT — Head of Business' },
];

const NETWORK = [
  { title: 'Established Artists', body: 'Composers, singers and performers with audiences of their own.' },
  { title: 'Emerging Creators', body: 'First-time voices given a real budget and a real release.' },
  { title: 'Filmmakers', body: 'Directors and cinematographers who own a visual language.' },
  { title: 'Writers', body: 'Screenwriters, lyricists and dialogue writers across languages.' },
  { title: 'Musicians', body: 'Producers and arrangers building the sound of each project.' },
  { title: 'Technical Talent', body: 'Animation, VFX and virtual production specialists.' },
];

const sectionPad = 'clamp(60px,11vh,130px) clamp(20px,5vw,80px)';
const eyebrowMuted = { fontSize: 'clamp(9px,.72vw,10px)', letterSpacing: '.46em', textIndent: '.46em', color: '#8f887c' } as const;

export function PeoplePage() {
  return (
    <PageShell>
      <section style={{ minHeight: '70vh', display: 'flex', alignItems: 'flex-end', padding: 'clamp(120px,20vh,200px) clamp(20px,5vw,80px) clamp(40px,7vh,80px)' }}>
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

      <section style={{ padding: 'clamp(50px,9vh,110px) clamp(20px,5vw,80px)' }}>
        <Reveal style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,270px),1fr))', gap: 'clamp(26px,4.4vw,64px)', alignItems: 'center' }}>
          <div style={{ aspectRatio: '4/5', maxWidth: 440, width: '100%' }}>
            <ImageSlot alt="Portrait — Prashant Ingole" placeholder="PORTRAIT — Prashant Ingole" shape="rect" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(18px,3vh,30px)' }}>
            <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(28px,4vw,62px)', lineHeight: 1, letterSpacing: '.04em', color: '#ece6da' }}>
              PRASHANT INGOLE
            </span>
            <span style={{ fontSize: 'clamp(9px,.78vw,11px)', letterSpacing: '.36em', color: '#d4a05a' }}>FOUNDER / CREATIVE LEAD</span>
            <p style={{ margin: 0, maxWidth: '48ch', fontSize: 'clamp(13px,1.1vw,16px)', lineHeight: 1.75, color: '#b3ab9d' }}>
              Songwriter for Hindi cinema across a decade of releases, from Party On My Mind to Malhari, Gajanana and
              Utth Ja Ziddi Re. Founded the studio to develop and own the stories he had spent that decade writing
              into other people&apos;s films.
            </p>
            <span style={{ fontSize: 'clamp(12px,1.05vw,15px)', lineHeight: 1.9, letterSpacing: '.06em', color: '#b3ab9d' }}>
              Storytelling · Music · Direction · Creative Development
            </span>
            <Link
              href="/work"
              className="gs-hover-accent"
              style={{ alignSelf: 'flex-start', marginTop: 4, fontSize: 10, letterSpacing: '.3em', color: '#8f887c', borderBottom: '1px solid rgba(143,136,124,.4)', paddingBottom: 5 }}
            >
              SELECTED WORK →
            </Link>
          </div>
        </Reveal>
      </section>

      <section style={{ padding: sectionPad }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(30px,5vh,52px)' }}>
          <div style={eyebrowMuted}>LEADERSHIP</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: 'clamp(18px,2.6vw,34px)' }}>
            {LEADS.map((l, i) => (
              <Reveal key={l.role} delay={i * 70} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ aspectRatio: '1', width: '100%' }}>
                  <ImageSlot alt={l.ph} placeholder={l.ph} shape="rect" />
                </div>
                <span style={{ marginTop: 4, fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(17px,1.9vw,26px)', letterSpacing: '.05em', color: '#ece6da' }}>
                  {l.name}
                </span>
                <span style={{ fontSize: 9, letterSpacing: '.3em', color: '#d4a05a' }}>{l.role}</span>
                <span style={{ fontSize: 'clamp(11px,.95vw,13px)', lineHeight: 1.7, color: '#b3ab9d' }}>{l.body}</span>
              </Reveal>
            ))}
          </div>
          <p style={{ margin: 0, fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 10, letterSpacing: '.16em', color: '#8f887c' }}>
            PLACEHOLDER LEADERSHIP — NAMES AND ROLES TO BE CONFIRMED
          </p>
        </div>
      </section>

      <section style={{ padding: sectionPad }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(30px,5vh,52px)' }}>
          <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <span style={eyebrowMuted}>TALENT NETWORK</span>
            <h2 style={{ margin: 0, maxWidth: '24ch', fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(23px,3.4vw,50px)', lineHeight: 1.1, letterSpacing: '.03em', color: '#ece6da', textWrap: 'balance' }}>
              Established voices, and the next generation.
            </h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,190px),1fr))', gap: 'clamp(14px,2vw,26px)' }}>
            {NETWORK.map((n, i) => (
              <Reveal
                key={n.title}
                delay={i * 70}
                style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 'clamp(20px,2.8vw,32px)', boxShadow: 'inset 0 0 0 1px rgba(236,230,218,.1)' }}
              >
                <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(16px,1.8vw,25px)', lineHeight: 1.2, letterSpacing: '.06em', color: '#ece6da' }}>
                  {n.title}
                </span>
                <span style={{ fontSize: 'clamp(11px,.95vw,13px)', lineHeight: 1.7, color: '#b3ab9d' }}>{n.body}</span>
              </Reveal>
            ))}
          </div>
          <Reveal style={{ maxWidth: '56ch' }}>
            <p style={{ margin: 0, fontSize: 'clamp(13px,1.1vw,17px)', lineHeight: 1.7, color: '#b3ab9d' }}>
              We collaborate with established voices and discover the next generation of storytellers.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px,11vh,130px) clamp(20px,5vw,80px) clamp(50px,8vh,90px)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(26px,4.4vh,46px)' }}>
          <Reveal
            as="h2"
            style={{ margin: 0, maxWidth: '22ch', fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(24px,4.2vw,66px)', lineHeight: 1.08, letterSpacing: '.03em', color: '#ece6da', textWrap: 'balance' }}
          >
            IF YOU WRITE, DIRECT, COMPOSE OR BUILD — SEND IT.
          </Reveal>
          <Reveal delay={80} style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(12px,1.6vw,20px)' }}>
            <a
              href="mailto:hello@godsownmotionpictures.com?subject=Creative%20collaboration"
              className="gs-hover-fill"
              style={{ padding: '15px clamp(20px,2.6vw,34px)', fontSize: 10, letterSpacing: '.3em', color: '#000', background: '#ece6da' }}
            >
              SEND YOUR WORK
            </a>
            <Link
              href="/studio"
              className="gs-hover-outline"
              style={{ padding: '15px clamp(20px,2.6vw,34px)', fontSize: 10, letterSpacing: '.3em', color: '#ece6da', boxShadow: 'inset 0 0 0 1px rgba(236,230,218,.28)' }}
            >
              ABOUT THE STUDIO
            </Link>
          </Reveal>
          <BackBar />
        </div>
      </section>
    </PageShell>
  );
}
