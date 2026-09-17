'use client';

import Link from 'next/link';
import { BackBar } from '../BackBar';
import { ImageSlot } from '@/components/godsown/overlay/ImageSlot';
import { PageShell } from '../PageShell';
import { Reveal } from '../Reveal';

const PRASHANT_TAGS = ['BAJIRAO MASTANI', 'MARY KOM', 'RACE 2', '83', 'JALEBI'];

const ABHIJEET_STATS = [
  { figure: '7+', label: 'YEARS IN FILMMAKING AND CONTENT PRODUCTION' },
  { figure: '60+', label: 'CORPORATE FILMS' },
  { figure: '100+', label: 'FASHION FILMS AND VIDEOS' },
  { figure: '11', label: 'MUSIC VIDEOS' },
  { figure: '25', label: 'COVER SONGS' },
  { figure: '9.5M', label: 'VIEWS ON THE INDUS VALLEY TALK SHOW' },
];

const ABHIJEET_CREDITS = [
  {
    label: 'AD FILMS — DIRECTOR',
    body: 'IDFC FIRST BANK · RELISPRAY · GENSOL · RIMZIM (COCA-COLA) · BANSAL FOODS · TRUECALLER · STOREROOM · INSTAASTRO · SKY247 · AIRMEET · WNS · UPSTOX · DELTIN · KINLEY · PURA SURE · INDUS VALLEY · 3D PROJECT FOR VISAKHAPATNAM GOV',
  },
  {
    label: 'SHOWRUNNER / CREATIVE DIRECTOR / POST PRODUCER',
    body: 'EBAY · TATA MUTUAL FUND · BIBA · STOREKING · IDEE · RUPASHREE · NEO PAINTS · ZARA · BRIDGESTONE, and many more',
  },
  {
    label: 'TALK SHOW / PODCAST',
    body: 'Digital 12-episode talk show for Indus Valley with TV celebrities — almost 9.5 million views on YouTube',
  },
  {
    label: 'MUSIC VIDEOS',
    body: 'MERA YAAR BADAL GAYA (Zee Music Company) · SAADGI — 10 million views, 205k likes, 10.5k comments · CHEEKH · THAAM LENA · INTEZAAR · PEHLE KYU NA MILA · KHAYALO KE KIRDAAR · three further videos yet to be released',
  },
  {
    label: 'FEATURE & LONG FORM',
    body: 'BARAAT — upcoming digital feature film, Director · STARTING TROUBLES — web series, Creative Supervisor, Editor and Post Producer · three independent feature films',
  },
  { label: 'SHORT FILMS', body: 'Five short films, several appreciated worldwide' },
  {
    label: 'REAL ESTATE',
    body: 'PRIDE GROUP · KOLTE PATIL · AIRMEET · DGS · 3D PROJECT FOR VISAKHAPATNAM GOV · ALPINE WOODS · VARDHAN GROUP and others',
  },
  {
    label: 'CORPORATE',
    body: 'More than 60 corporate films for TRIDENT INDIA · RETIER INDIA · ALL TIME PLASTIC · SUZLON · LOREAL INDIA and many more',
  },
];

const LEADS = [
  { name: 'NAME TO COME', role: 'HEAD OF DEVELOPMENT', body: 'Runs the script pipeline from first idea to greenlight-ready draft.' },
  { name: 'NAME TO COME', role: 'HEAD OF PRODUCTION', body: 'Owns schedule, budget and delivery across film, series and music.' },
  { name: 'NAME TO COME', role: 'HEAD OF BUSINESS', body: 'Partnerships, distribution and the commercial life of each property.' },
];

const NETWORK = [
  { title: 'Established Artists', body: 'Composers, singers and performers with audiences of their own.' },
  { title: 'Emerging Creators', body: 'First-time voices given a real budget and a real release.' },
  { title: 'Filmmakers', body: 'Directors and cinematographers who own a visual language.' },
  { title: 'Writers', body: 'Screenwriters, lyricists and dialogue writers across languages.' },
  { title: 'Musicians', body: 'Producers and arrangers building the sound of each project.' },
  { title: 'Technical Talent', body: 'Animation, VFX and virtual production specialists.' },
];

const sectionPad = 'clamp(50px,9vh,120px) clamp(20px,5vw,80px)';
const eyebrowMuted = { fontSize: 'clamp(9px,.72vw,10px)', letterSpacing: '.46em', textIndent: '.46em', color: '#8f887c' } as const;
const roleStyle = { fontSize: 'clamp(9px,.78vw,11px)', letterSpacing: '.36em', color: '#d4a05a' } as const;
const skillsStyle = { fontSize: 'clamp(11px,.95vw,13px)', lineHeight: 1.9, letterSpacing: '.14em', color: '#8f887c' } as const;
const quoteStyle = {
  margin: 0,
  maxWidth: '40ch',
  fontFamily: "'Oswald',sans-serif",
  fontWeight: 200,
  fontSize: 'clamp(17px,2.2vw,34px)',
  lineHeight: 1.35,
  letterSpacing: '.02em',
  color: '#ece6da',
  textWrap: 'pretty',
} as const;
const bodyColStyle = { display: 'flex', flexDirection: 'column', gap: 'clamp(14px,2.4vh,22px)', maxWidth: '60ch', fontSize: 'clamp(13px,1.08vw,16px)', lineHeight: 1.75, color: '#b3ab9d' } as const;
const bioGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 'clamp(24px,4vw,64px)', alignItems: 'start' } as const;

export function PeoplePage() {
  return (
    <PageShell>
      <section style={{ minHeight: '66vh', display: 'flex', alignItems: 'flex-end', padding: 'clamp(120px,20vh,200px) clamp(20px,5vw,80px) clamp(40px,7vh,80px)' }}>
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
          <Reveal style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,270px),1fr))', gap: 'clamp(26px,4.4vw,64px)', alignItems: 'end' }}>
            <div style={{ aspectRatio: '4/5', maxWidth: 430, width: '100%' }}>
              <ImageSlot alt="Portrait — Prashant Ingole" placeholder="PORTRAIT — Prashant Ingole" shape="rect" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px,2.4vh,22px)' }}>
              <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(28px,4.2vw,66px)', lineHeight: 1, letterSpacing: '.04em', color: '#ece6da' }}>
                PRASHANT INGOLE
              </span>
              <span style={roleStyle}>FOUNDER / CREATIVE LEAD</span>
              <span style={skillsStyle}>LYRICIST · WRITER · DIRECTOR</span>
            </div>
          </Reveal>

          <Reveal style={bioGridStyle}>
            <p style={quoteStyle}>
              For me, storytelling has always been about emotion—about finding the right words that can move people,
              inspire them, and stay with them long after the music fades or the screen goes dark.
            </p>
            <div style={bodyColStyle}>
              <p style={{ margin: 0, textWrap: 'pretty' }}>
                Over the past decade, I&apos;ve had the privilege of contributing to some incredible films such as
                Bajirao Mastani, Mary Kom, Race 2, 83, and Jalebi. Each project has been a journey where music and
                storytelling come together to create moments that audiences carry with them.
              </p>
              <p style={{ margin: 0, textWrap: 'pretty' }}>
                Songs like Malhari, Party On My Mind, Ziddi Dil, and Pal have been particularly special in my
                journey. Every song comes from a place of deep emotion and intent—whether it&apos;s the infectious
                energy of celebration, the spirit of determination, or the quiet beauty of love.
              </p>
              <p style={{ margin: 0, textWrap: 'pretty' }}>
                While music has been my first love, storytelling has always pushed me to explore beyond lyrics. That
                passion led me to step behind the camera with my short film Budh (Awakening). The film, which
                focuses on women empowerment, became an important creative milestone for me. It was an opportunity
                to use cinema not just as entertainment, but as a voice—to question, to provoke thought, and
                hopefully to inspire change. The recognition and appreciation the film received reaffirmed my belief
                in the power of stories.
              </p>
              <p style={{ margin: 0, textWrap: 'pretty' }}>
                For me, whether I&apos;m writing a song or directing a film, the goal remains the same: to create
                something honest, powerful, and emotionally resonant. I continue to explore stories through music
                and cinema with the hope that they leave a lasting imprint on hearts and minds, just as the stories
                that inspired me once did.
              </p>
            </div>
          </Reveal>

          <Reveal
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'clamp(14px,2.6vw,38px)',
              paddingTop: 'clamp(18px,3vh,28px)',
              borderTop: '1px solid rgba(236,230,218,.12)',
              fontSize: 'clamp(10px,.82vw,12px)',
              letterSpacing: '.24em',
              color: '#8f887c',
            }}
          >
            {PRASHANT_TAGS.map((t) => (
              <span key={t}>{t}</span>
            ))}
            <span style={{ color: '#d4a05a' }}>BUDH (AWAKENING)</span>
            <Link
              href="/work"
              className="gs-hover-accent"
              style={{ marginLeft: 'auto', color: '#8f887c', borderBottom: '1px solid rgba(143,136,124,.4)', paddingBottom: 4 }}
            >
              SELECTED WORK →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ABHIJEET NAG */}
      <section style={{ padding: 'clamp(40px,8vh,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(30px,5vh,56px)' }}>
          <Reveal style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,270px),1fr))', gap: 'clamp(26px,4.4vw,64px)', alignItems: 'end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px,2.4vh,22px)' }}>
              <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(28px,4.2vw,66px)', lineHeight: 1, letterSpacing: '.04em', color: '#ece6da' }}>
                ABHIJEET NAG
              </span>
              <span style={roleStyle}>DIRECTOR / SHOWRUNNER</span>
              <span style={skillsStyle}>DIRECTOR · SHOWRUNNER · CREATIVE PRODUCER · POST PRODUCER</span>
            </div>
            <div style={{ aspectRatio: '4/5', maxWidth: 430, width: '100%', justifySelf: 'end' }}>
              <ImageSlot alt="Portrait — Abhijeet Nag" placeholder="PORTRAIT — Abhijeet Nag" shape="rect" />
            </div>
          </Reveal>

          <Reveal style={bioGridStyle}>
            <p style={quoteStyle}>
              My journey into filmmaking did not begin in a film school or on a film set. It began much earlier when
              I was just 13 years old, with three very different goals: Football, an MBA, and Filmmaking.
            </p>
            <div style={bodyColStyle}>
              <p style={{ margin: 0, textWrap: 'pretty' }}>
                I started my journey as a footballer and played for several known clubs in Nagpur. At the age of 17,
                I represented my state at the national level, an experience that taught me some of the most
                important lessons that would later shape my approach to Filmmaking, Discipline, Teamwork,
                perseverance and the ability to perform under pressure.
              </p>
              <p style={{ margin: 0, textWrap: 'pretty' }}>
                I then pursued my MBA in Finance &amp; Marketing from G.H. Raisoni, Nagpur. After completing my
                education, I worked professionally with organisations including ICICI Direct and EClerx | Morgan
                Stanley, across Mumbai and Pune.
              </p>
              <p style={{ margin: 0, textWrap: 'pretty' }}>
                While I was building my corporate career, filmmaking remained the one thing I could never put
                aside. I continued learning, experimenting and developing my creative skills alongside my
                professional work. Slowly, that passion transformed into a profession and eventually into the
                career.
              </p>
              <p style={{ margin: 0, textWrap: 'pretty' }}>
                Today, with 7+ years of professional experience in filmmaking and content production, I work
                primarily as a DIRECTOR, while also taking on responsibilities as a Showrunner, Creative Producer,
                Creative Director and Post Producer.
              </p>
              <p style={{ margin: 0, textWrap: 'pretty' }}>
                My work spans multiple formats and platforms from TVCs and Digital Advertising Films to Brand Films,
                Music Videos, Talk Shows, Corporate Films, Feature Films, Webshow, Fashion Films, Real-Estate Films,
                Motion Graphics, Animation and long-form content.
              </p>
            </div>
          </Reveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,150px),1fr))',
              gap: 'clamp(18px,2.6vw,40px)',
              paddingTop: 'clamp(20px,3.4vh,32px)',
              borderTop: '1px solid rgba(236,230,218,.12)',
            }}
          >
            {ABHIJEET_STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 70} style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 200, fontSize: 'clamp(26px,3.4vw,50px)', lineHeight: 1, color: '#ece6da' }}>
                  {s.figure}
                </span>
                <span style={{ fontSize: 'clamp(10px,.82vw,12px)', lineHeight: 1.6, letterSpacing: '.12em', color: '#8f887c' }}>{s.label}</span>
              </Reveal>
            ))}
          </div>

          <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px,3.4vh,34px)' }}>
            <span style={eyebrowMuted}>SELECTED CREDITS</span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {ABHIJEET_CREDITS.map((c) => (
                <div
                  key={c.label}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,190px),1fr))',
                    gap: 'clamp(10px,2.4vw,44px)',
                    padding: 'clamp(16px,2.6vh,26px) 0',
                    borderTop: '1px solid rgba(236,230,218,.09)',
                  }}
                >
                  <span style={{ fontSize: 'clamp(9px,.76vw,11px)', letterSpacing: '.32em', color: '#d4a05a' }}>{c.label}</span>
                  <span style={{ gridColumn: 'span 2', fontSize: 'clamp(11px,.98vw,14px)', lineHeight: 1.85, letterSpacing: '.04em', color: '#b3ab9d', textWrap: 'pretty' }}>
                    {c.body}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: sectionPad }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(26px,4.4vh,44px)' }}>
          <div style={eyebrowMuted}>ALSO BUILDING THE STUDIO</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,230px),1fr))', gap: 'clamp(14px,2vw,26px)' }}>
            {LEADS.map((l, i) => (
              <Reveal key={l.role} delay={i * 70} style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 'clamp(20px,2.8vw,34px)', boxShadow: 'inset 0 0 0 1px rgba(236,230,218,.1)' }}>
                <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 300, fontSize: 'clamp(16px,1.8vw,24px)', letterSpacing: '.05em', color: '#ece6da' }}>
                  {l.name}
                </span>
                <span style={{ fontSize: 9, letterSpacing: '.3em', color: '#d4a05a' }}>{l.role}</span>
                <span style={{ fontSize: 'clamp(11px,.95vw,13px)', lineHeight: 1.7, color: '#b3ab9d' }}>{l.body}</span>
              </Reveal>
            ))}
          </div>
          <p style={{ margin: 0, fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 10, letterSpacing: '.16em', color: '#8f887c' }}>
            PLACEHOLDER ROLES — NAMES TO BE CONFIRMED
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

      <section style={{ padding: 'clamp(50px,9vh,120px) clamp(20px,5vw,80px) clamp(50px,8vh,90px)' }}>
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
