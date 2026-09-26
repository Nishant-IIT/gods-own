'use client';

import Link from 'next/link';
import { useState, type SubmitEvent } from 'react';
import { LocationMap } from '@/components/ui/location-map';
import { PageShell } from '../PageShell';
import { ReachMap } from '../ReachMap';
import { Reveal } from '../Reveal';

const MAIL = 'hello@godsownmotionpictures.com';

const ADDRESS_LINES = [
  'Flat # 19, 3rd Floor, Ashish Building, Building #37,',
  'Manish Nagar, Behind Manish Market, 4 Bungalows,',
  'Andheri West, Mumbai 400053',
];

const MAP_QUERY = encodeURIComponent(
  'Ashish Building, Building 37, Manish Nagar, 4 Bungalows, Andheri West, Mumbai 400053',
);

type FormState = { name: string; company: string; email: string; phone: string };

const EMPTY_FORM: FormState = { name: '', company: '', email: '', phone: '' };

const FIELDS: { key: keyof FormState; label: string; type: string; required: boolean }[] = [
  { key: 'name', label: 'NAME', type: 'text', required: true },
  { key: 'company', label: 'COMPANY', type: 'text', required: false },
  { key: 'email', label: 'EMAIL', type: 'email', required: true },
  { key: 'phone', label: 'PHONE', type: 'tel', required: false },
];

export function ContactPage() {
  return (
    <PageShell footer={<ContactFooter />}>
      <section style={{ minHeight: '36vh', display: 'flex', alignItems: 'flex-end', padding: 'clamp(90px,10vh,110px) clamp(20px,5vw,80px) clamp(40px,7vh,80px)' }}>
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
              Reach out and we&apos;ll get back to you shortly.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: 'clamp(20px,4vh,50px) clamp(20px,5vw,80px) clamp(70px,12vh,140px)' }}>
        <div
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))',
            gap: 'clamp(40px,6vw,90px)',
          }}
        >
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={80} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(30px,5vh,48px)' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,180px),1fr))',
                gap: 'clamp(22px,3.4vw,40px)',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span style={{ fontSize: 9, letterSpacing: '.36em', color: '#8f887c' }}>GENERAL</span>
                <a href={`mailto:${MAIL}`} className="gs-hover-accent" style={{ fontSize: 'clamp(12px,1.05vw,15px)', letterSpacing: '.04em', color: '#ece6da', wordBreak: 'break-word' }}>
                  {MAIL}
                </a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span style={{ fontSize: 9, letterSpacing: '.36em', color: '#8f887c' }}>VISIT</span>
                <p style={{ margin: 0, fontSize: 'clamp(12px,1.05vw,15px)', lineHeight: 1.8, letterSpacing: '.02em', color: '#ece6da' }}>
                  GOD'S OWN MOTION PICTURES
                  <br />
                  {ADDRESS_LINES.map((line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 20 }}>
              <LocationMap
                location="Andheri West, Mumbai"
                coordinates="19.1197° N, 72.8468° E"
                mapsUrl={`https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`}
              />
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
                target="_blank"
                rel="noopener noreferrer"
                className="gs-hover-accent"
                style={{ fontSize: 9, letterSpacing: '.3em', color: '#8f887c' }}
              >
                GOD&apos;S OWN MOTION PICTURES
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}

function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const body = [`Name: ${form.name}`, `Company: ${form.company}`, `Email: ${form.email}`, `Phone: ${form.phone}`].join('\n');
    window.location.href = `mailto:${MAIL}?subject=${encodeURIComponent('Website enquiry')}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px,3.4vh,36px)' }}>
      {FIELDS.map((f) => (
        <label key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ fontSize: 9, letterSpacing: '.36em', color: '#8f887c' }}>
            {f.label}
            {f.required ? '' : '  (OPTIONAL)'}
          </span>
          <input
            type={f.type}
            required={f.required}
            value={form[f.key]}
            onChange={(e) => {
              setForm((s) => ({ ...s, [f.key]: e.target.value }));
              setSent(false);
            }}
            className="gs-contact-input"
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid rgba(236,230,218,.2)',
              borderRadius: 0,
              padding: '10px 2px',
              transition: 'border-color .3s ease',
              fontFamily: "'Karla',system-ui,sans-serif",
              fontSize: 'clamp(14px,1.15vw,17px)',
              color: '#ece6da',
              outline: 'none',
            }}
          />
        </label>
      ))}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 8 }}>
        <button
          type="submit"
          className="gs-hover-accent"
          style={{
            alignSelf: 'flex-start',
            background: 'none',
            border: 'none',
            padding: 0,
            fontSize: 9,
            letterSpacing: '.3em',
            color: '#d4a05a',
            cursor: 'pointer',
          }}
        >
          SEND MESSAGE →
        </button>
        {sent && (
          <p style={{ margin: 0, maxWidth: '38ch', fontSize: 11, lineHeight: 1.7, letterSpacing: '.02em', color: '#b3ab9d' }}>
            Opening your email app with this message. If nothing opens, write to us directly at{' '}
            <a href={`mailto:${MAIL}`} className="gs-hover-accent" style={{ color: '#ece6da' }}>
              {MAIL}
            </a>
            .
          </p>
        )}
      </div>
    </form>
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
              BORN IN INDIA.
              <br />
              BUILT FOR THE WORLD.
            </h2>
          </div>
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
