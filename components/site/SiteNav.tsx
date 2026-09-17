'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const LINKS = [
  { label: 'HOME', href: '/' },
  { label: 'STUDIO', href: '/studio' },
  { label: 'IP', href: '/ip' },
  { label: 'SLATE', href: '/slate' },
  { label: 'WORK', href: '/work' },
  { label: 'PEOPLE', href: '/people' },
  { label: 'CONTACT', href: '/contact' },
];

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Ported from Nav.dc.html — fixed header, desktop row below 780px collapses into a slide-down panel. */
export function SiteNav() {
  const pathname = usePathname();
  const [narrow, setNarrow] = useState(false);
  const [open, setOpen] = useState(false);

  // Close the mobile panel on navigation — React's sanctioned way to adjust
  // state on a prop change without an effect (see "You Might Not Need an
  // Effect" in the React docs).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const sync = () => setNarrow(window.innerWidth <= 780);
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        zIndex: 30,
        background: 'linear-gradient(180deg,rgba(0,0,0,.94),rgba(0,0,0,.72) 62%,rgba(0,0,0,0))',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: 'clamp(10px,1.4vw,18px) clamp(14px,3vw,44px)',
        }}
      >
        <Link
          href="/"
          style={{
            display: 'block',
            padding: '17px 0',
            fontSize: 'clamp(9px,.78vw,11px)',
            letterSpacing: '.3em',
            color: '#ece6da',
            whiteSpace: 'nowrap',
            textDecoration: 'none',
          }}
        >
          GOD&apos;S OWN <span style={{ color: '#8f887c' }}>MOTION PICTURES</span>
        </Link>

        <nav
          aria-label="Pages"
          style={{
            display: narrow ? 'none' : 'flex',
            flexWrap: 'nowrap',
            alignItems: 'center',
            gap: '0 clamp(2px,.7vw,10px)',
            fontSize: 'clamp(9px,.72vw,10px)',
            letterSpacing: '.26em',
          }}
        >
          {LINKS.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                className="gs-hover-fg"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 44,
                  minHeight: 44,
                  padding: '0 9px',
                  color: active ? '#ece6da' : l.label === 'CONTACT' ? '#d4a05a' : '#8f887c',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Menu"
          style={{
            display: narrow ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center',
            width: 44,
            height: 44,
            marginRight: -9,
            background: 'none',
            border: 0,
            padding: 0,
            cursor: 'pointer',
            flexDirection: 'column',
            gap: 5,
          }}
        >
          <span
            style={{
              display: 'block',
              width: 19,
              height: 1,
              background: '#ece6da',
              transform: open ? 'translateY(6px) rotate(45deg)' : 'none',
              transition: 'transform .3s cubic-bezier(.16,1,.3,1)',
            }}
          />
          <span
            style={{
              display: 'block',
              width: 19,
              height: 1,
              background: '#ece6da',
              opacity: open ? 0 : 1,
              transition: 'opacity .2s',
            }}
          />
          <span
            style={{
              display: 'block',
              width: 19,
              height: 1,
              background: '#ece6da',
              transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none',
              transition: 'transform .3s cubic-bezier(.16,1,.3,1)',
            }}
          />
        </button>
      </div>

      <div
        style={{
          display: narrow && open ? 'flex' : 'none',
          flexDirection: 'column',
          background: '#000',
          boxShadow: 'inset 0 1px 0 rgba(236,230,218,.12)',
        }}
      >
        {LINKS.map((l) => {
          const active = isActive(pathname, l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active ? 'page' : undefined}
              className="gs-hover-fg gs-hover-panel"
              style={{
                display: 'flex',
                alignItems: 'center',
                minHeight: 52,
                padding: '0 clamp(14px,3vw,44px)',
                fontSize: 11,
                letterSpacing: '.3em',
                color: active ? '#ece6da' : l.label === 'CONTACT' ? '#d4a05a' : '#8f887c',
                textDecoration: 'none',
                boxShadow: 'inset 0 -1px 0 rgba(236,230,218,.08)',
              }}
            >
              {l.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
