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

/**
 * Brand work credited on /work. Sources are listed in public/logos/SOURCES.md.
 *
 * Four of the files are reverse lockups rather than the primary ones: Zara,
 * L'Oréal, WNS and Bridgestone are all drawn in black for print and were
 * invisible on this ground, so their dark ink is set to white while each
 * brand's accent colour is left alone. Anything added later that is drawn in
 * black needs the same treatment — see public/logos/SOURCES.md.
 */
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
