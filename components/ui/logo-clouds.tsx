import Image from 'next/image';
import type { CSSProperties } from 'react';

const MUTED = '#b3ab9d';
const DIM = '#8f887c';
const ACCENT = '#d4a05a';

/** Height of the logo well inside each tile; every mark is contained within it. */
const MARK_HEIGHT = 'clamp(40px,4.8vw,56px)';

export type Brand = {
  name: string;
  /** Logo file under public/logos. Falls back to a typeset wordmark when absent. */
  src?: string;
  /**
   * Optical size correction. Every file's viewBox is cropped to its own ink, so
   * `object-fit: contain` already sizes marks by their real extents — but a
   * squarish mark like the Tata oval still fills the tile's full height and
   * reads far heavier than the 6:1 wordmarks beside it. These pull it back.
   */
  scale?: number;
};

/** Brand work credited on /work. Sources are listed in public/logos/SOURCES.md. */
export const BRANDS: Brand[] = [
  { name: 'IDFC FIRST BANK', src: '/logos/idfc-first-bank.svg' },
  { name: 'TRUECALLER', src: '/logos/truecaller.svg' },
  { name: 'COCA-COLA', src: '/logos/coca-cola.svg' },
  { name: 'KINLEY', src: '/logos/kinley.svg' },
  { name: 'UPSTOX', src: '/logos/upstox.svg' },
  { name: 'ZARA', src: '/logos/zara.svg', scale: 0.88 },
  { name: 'TATA MUTUAL FUND', src: '/logos/tata.svg', scale: 0.72 },
  { name: 'EBAY', src: '/logos/ebay.svg', scale: 0.9 },
  { name: 'BRIDGESTONE', src: '/logos/bridgestone.svg' },
  { name: "L'ORÉAL INDIA", src: '/logos/loreal.svg' },
  { name: 'SUZLON', src: '/logos/suzlon.svg' },
  { name: 'BIBA', src: '/logos/biba.png' },
  { name: 'DELTIN', src: '/logos/deltin.png' },
  { name: 'WNS', src: '/logos/wns.svg' },
  { name: 'TRIDENT INDIA', src: '/logos/trident.svg' },
  { name: 'ZEE MUSIC', src: '/logos/zee-music.svg' },
];

type Props = {
  eyebrow?: string;
  subtitle?: string;
  brands?: Brand[];
  className?: string;
  style?: CSSProperties;
};

/**
 * The brand wall — a still grid of client logos, no motion of any kind.
 *
 * Marks are shown in their true colours, straight on the page with no plate
 * behind them.
 *
 * Four of the files are reverse lockups rather than the primary ones: Zara,
 * L'Oréal, WNS and Bridgestone are all drawn in black for print and were
 * invisible here, so their dark ink is set to white while each brand's accent
 * colour is left alone. Anything added later that is drawn in black needs the
 * same treatment — see public/logos/SOURCES.md.
 *
 * Cards carry no caption — a logo is the brand's own name, and setting ours
 * underneath it only competes. The name survives as each image's alt text, so
 * screen readers and a failed image still identify the brand.
 *
 * Nothing here reacts to the pointer, deliberately: these marks are a credit
 * list, not controls, so there is nothing to invite a click. Don't reach for
 * `.gs-hover-brand` (app/globals.css) when adding to this — it was written for
 * the old boxed tiles and paints a border that has no meaning now.
 *
 * Inline-styled rather than utility-classed: this site ships without
 * Tailwind's layer (see app/globals.css), so classNames would be inert.
 */
export function LogoCloud({
  eyebrow = 'BRAND WORK',
  subtitle = "Commercials, brand films and long-form content directed by the studio's founders.",
  brands = BRANDS,
  className,
  style,
}: Props) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(26px,4.4vh,50px)',
        width: '100%',
        textAlign: 'center',
        ...style,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px,2vh,20px)' }}>
        <span style={{ fontSize: 'clamp(9px,.72vw,10px)', letterSpacing: '.46em', textIndent: '.46em', color: ACCENT }}>
          {eyebrow}
        </span>
        <p style={{ margin: 0, maxWidth: '56ch', fontSize: 'clamp(12px,1.05vw,16px)', lineHeight: 1.7, color: MUTED, textWrap: 'balance' }}>
          {subtitle}
        </p>
      </div>

      <ul
        style={{
          // Flex rather than grid: auto-fill columns would leave the last row
          // (four of sixteen marks) hanging off the left edge. Wrapping flex
          // items centre every row, the short one included.
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 'clamp(8px,1.2vw,14px)',
          width: '100%',
          margin: 0,
          padding: 0,
          listStyle: 'none',
        }}
      >
        {brands.map((brand) => (
          <li
            key={brand.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: '0 0 auto',
              width: 'clamp(132px,15vw,176px)',
              minHeight: 'clamp(96px,11vw,128px)',
              padding: 'clamp(16px,2vw,26px)',
              boxSizing: 'border-box',
            }}
          >
            {brand.src ? (
              <span
                style={{
                  position: 'relative',
                  display: 'block',
                  width: '100%',
                  height: MARK_HEIGHT,
                  transform: brand.scale ? `scale(${brand.scale})` : undefined,
                }}
              >
                <Image
                  src={brand.src}
                  alt={`${brand.name} logo`}
                  fill
                  sizes="170px"
                  // SVG is served untouched: the optimizer refuses it unless
                  // `images.dangerouslyAllowSVG` is on, and these are our own
                  // static files under public/.
                  unoptimized
                  style={{ objectFit: 'contain' }}
                />
              </span>
            ) : (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: MARK_HEIGHT,
                  fontFamily: "'Oswald',sans-serif",
                  fontWeight: 300,
                  fontSize: 'clamp(14px,1.5vw,19px)',
                  letterSpacing: '.14em',
                  color: '#ece6da',
                }}
              >
                {brand.name}
              </span>
            )}
          </li>
        ))}
      </ul>

      <p style={{ margin: 0, fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 10, letterSpacing: '.16em', color: DIM }}>
        BRAND MARKS SHOWN FOR CREDIT ONLY — EACH REMAINS THE PROPERTY OF ITS OWNER
      </p>
    </div>
  );
}
