'use client';

import Link from 'next/link';
import { PageShell } from '../PageShell';
import { ReachMap } from '../ReachMap';
import { Reveal } from '../Reveal';

const MAIL = 'hello@godsownmotionpictures.com';

function door(n: string, title: string, body: string, cta: string, subject: string) {
  return { n, title, body, cta, href: `mailto:${MAIL}?subject=${encodeURIComponent(subject)}` };
}

const DOORS = [
  door('01', "I'M AN INVESTOR", 'Investment and strategic partnership.', 'START A CONVERSATION →', 'Investment enquiry'),
  door('02', "I'M A PRODUCER", 'Co-production and development.', 'START A CONVERSATION →', 'Co-production enquiry'),
  door('03', "I'M A DISTRIBUTOR", 'Theatrical, OTT, music and international.', 'START A CONVERSATION →', 'Distribution enquiry'),
  door('04', "I'M A BRAND", 'Advertising, integration and branded content.', 'START A CONVERSATION →', 'Brand partnership enquiry'),
  door('05', "I'M A CREATOR", 'Talent, filmmaking and music.', 'SEND YOUR WORK →', 'Creative collaboration'),
];

export function ContactPage() {
  return (
    <PageShell footer={<ContactFooter />}>
      <section style={{ minHeight: '64vh', display: 'flex', alignItems: 'flex-end', padding: 'clamp(120px,20vh,200px) clamp(20px,5vw,80px) clamp(40px,7vh,80px)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(24px,4vh,42px)' }}>
          <Reveal style={{ fontSize: 'clamp(9px,.72vw,10px)', letterSpacing: '.46em', textIndent: '.46em', color: '#d4a05a' }}>
            CONTACT
          </Reveal>
          <Reveal
            as="h1"
            delay={60}
            style={{ margin: 0, maxWidth: '16ch', fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(34px,7vw,116px)', lineHeight: 1, letterSpacing: '.06em', textIndent: '.06em', color: '#ece6da', textWrap: 'balance' }}
          >
            FIND YOUR WAY IN.
          </Reveal>
          <Reveal delay={120} style={{ maxWidth: '48ch' }}>
            <p style={{ margin: 0, fontSize: 'clamp(13px,1.15vw,17px)', lineHeight: 1.7, color: '#b3ab9d' }}>
              Tell us which door you&apos;re at and the right person will answer.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: 'clamp(20px,4vh,50px) clamp(20px,5vw,80px) clamp(60px,11vh,130px)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,270px),1fr))', gap: 'clamp(14px,2vw,26px)' }}>
          {DOORS.map((d, i) => (
            <Reveal
              key={d.n}
              as="a"
              href={d.href}
              delay={i * 70}
              className="gs-hover-card gs-hover-panel"
              style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 'clamp(24px,3.4vw,44px)', boxShadow: 'inset 0 0 0 1px rgba(236,230,218,.1)', color: '#ece6da', textDecoration: 'none' }}
            >
              <span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 10, letterSpacing: '.2em', color: '#8f887c' }}>{d.n}</span>
              <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(19px,2.2vw,32px)', lineHeight: 1.15, letterSpacing: '.1em', color: '#ece6da' }}>
                {d.title}
              </span>
              <span style={{ fontSize: 'clamp(11px,.95vw,14px)', lineHeight: 1.7, color: '#b3ab9d' }}>{d.body}</span>
              <span style={{ marginTop: 8, fontSize: 9, letterSpacing: '.3em', color: '#d4a05a' }}>{d.cta}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section style={{ padding: 'clamp(40px,7vh,90px) clamp(20px,5vw,80px) clamp(50px,8vh,90px)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(30px,5vh,56px)' }}>
          <Reveal
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,210px),1fr))', gap: 'clamp(22px,3.4vw,52px)', paddingTop: 'clamp(24px,4vh,40px)', borderTop: '1px solid rgba(236,230,218,.1)' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ fontSize: 9, letterSpacing: '.36em', color: '#8f887c' }}>GENERAL</span>
              <a href={`mailto:${MAIL}`} className="gs-hover-accent" style={{ fontSize: 'clamp(12px,1.05vw,15px)', letterSpacing: '.04em', color: '#ece6da', wordBreak: 'break-word' }}>
                {MAIL}
              </a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ fontSize: 9, letterSpacing: '.36em', color: '#8f887c' }}>STUDIO</span>
              <span style={{ fontSize: 'clamp(12px,1.05vw,15px)', lineHeight: 1.7, letterSpacing: '.04em', color: '#ece6da' }}>Mumbai, India</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ fontSize: 9, letterSpacing: '.36em', color: '#8f887c' }}>FOLLOW</span>
              <span style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 'clamp(12px,1.05vw,15px)', letterSpacing: '.04em' }}>
                <a href="#" className="gs-hover-accent" style={{ color: '#ece6da' }}>Instagram</a>
                <a href="#" className="gs-hover-accent" style={{ color: '#ece6da' }}>YouTube</a>
              </span>
            </div>
          </Reveal>
          <p style={{ margin: 0, fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 10, letterSpacing: '.16em', color: '#8f887c' }}>
            PLACEHOLDER CONTACT DETAILS — TO BE REPLACED
          </p>
        </div>
      </section>
    </PageShell>
  );
}

/**
 * Ported from the `<footer>` embedded directly in Contact.dc.html — unlike
 * every other page, Contact doesn't import the shared Footer; it gets its
 * own reach map instead of the shared wordmark.
 */
function ContactFooter() {
  return (
    <footer style={{ position: 'relative', zIndex: 1, marginTop: 'clamp(30px,6vh,70px)', background: '#000', boxShadow: 'inset 0 1px 0 rgba(236,230,218,.1)' }}>
      <div
        style={{
          maxWidth: 1320,
          margin: '0 auto',
          padding: 'clamp(56px,9vh,96px) clamp(20px,5vw,80px) clamp(18px,3vh,30px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(20px,3.4vh,36px)',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span style={{ fontSize: 'clamp(9px,.72vw,10px)', letterSpacing: '.46em', textIndent: '.46em', color: '#d4a05a' }}>REACH</span>
            <h2 style={{ margin: 0, maxWidth: '20ch', fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(23px,3.8vw,58px)', lineHeight: 1.07, letterSpacing: '.04em', color: '#ece6da', textWrap: 'balance' }}>
              BORN IN INDIA. BUILT FOR AUDIENCES EVERYWHERE.
            </h2>
          </div>
          <p style={{ margin: 0, maxWidth: '34ch', fontSize: 'clamp(12px,1.02vw,15px)', lineHeight: 1.75, color: '#b3ab9d', textWrap: 'pretty' }}>
            Working from Mumbai, with stories built to travel through genre, emotion, music and characters.
          </p>
        </div>

        <ReachMap />

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 18,
            paddingTop: 'clamp(16px,2.6vh,26px)',
            borderTop: '1px solid rgba(236,230,218,.1)',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(14px,2.4vw,30px)' }}>
            <Link href="/" className="gs-hover-accent" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, fontSize: 9, letterSpacing: '.3em', color: '#8f887c' }}>
              GOD&apos;S OWN MOTION PICTURES
            </Link>
            <a href={`mailto:${MAIL}`} className="gs-hover-accent" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, fontSize: 9, letterSpacing: '.3em', color: '#8f887c' }}>
              EMAIL
            </a>
          </div>
          <span style={{ fontSize: 9, letterSpacing: '.3em', color: '#8f887c' }}>MUMBAI, INDIA</span>
        </div>
      </div>
    </footer>
  );
}
