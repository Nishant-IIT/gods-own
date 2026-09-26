# Brand logos

Client marks used on `/work` by `components/ui/logo-clouds.tsx`. Shown for
credit only; each remains the property of its owner. Every file is the
brand's own logo as published by the owner or Wikimedia — nothing is redrawn.

| File | Brand | Source |
| --- | --- | --- |
| `idfc-first-bank.svg` | IDFC First Bank | idfcfirstbank.com (`/content/dam/idfcfirstbank/images/n1/IDFC-logo-website.svg`) |
| `truecaller.svg` | Truecaller | Wikimedia Commons — `File:Truecaller Logo.svg` |
| `coca-cola.svg` | Coca-Cola | Wikimedia Commons — `File:Coca-Cola logo.svg` |
| `kinley.svg` | Kinley | coca-colaindia.com brand page |
| `upstox.svg` | Upstox | assets.upstox.com |
| `zara.svg` | Zara | Wikimedia Commons — `File:Zara Logo.svg` |
| `tata.svg` | Tata Mutual Fund | Wikimedia Commons — `File:Tata logo.svg` (Tata group mark) |
| `ebay.svg` | eBay | Wikimedia Commons — `File:EBay logo.svg` |
| `bridgestone.svg` | Bridgestone | Wikimedia Commons — `File:Bridgestone logo.svg` |
| `loreal.svg` | L'Oréal India | Wikimedia Commons — `File:L'Oréal logo.svg` |
| `suzlon.svg` | Suzlon | Wikimedia Commons — `File:Suzlon-logo-new-teal.svg` |
| `biba.png` | Biba | biba.in (`/images/logo-biba.png`) — only 120×29 available, worth replacing |
| `deltin.png` | Deltin | deltin.com (`/website/assets/group-logo.png`) — 302×78 raster, worth replacing |
| `wns.svg` | WNS | Wikimedia Commons — `File:WNS Global Services Logo.svg` |
| `trident.svg` | Trident India | assets.tridentindia.com |
| `zee-music.svg` | Zee Music | Wikimedia Commons — `File:Zee Music Company.svg` |

All but `biba.png` and `deltin.png` are vector.

Two edits were made to the source files, both to make them usable on this site:

- **Every SVG's `viewBox` is cropped to its own ink**, measured with `getBBox()`
  in a browser. Files ship with wildly different amounts of whitespace, and
  without this `object-fit: contain` sizes each mark by its padding rather than
  by the logo, so the wall looks lumpy.
- **`kinley.svg` had its light-grey backing plate removed.** The wordmark is
  navy and reads correctly straight on the cream tile; the plate only added a
  visible grey box inside it. `idfc-first-bank.svg` keeps its maroon field —
  that logo is white knocked out of maroon, so the field is load-bearing.

Marks are shown in their true colours, straight on the page with no plate
behind them. Four were drawn in black for print and could not survive that, so
they are stored here as **reverse lockups** — the official geometry with the
dark ink set to white and each brand's accent colour untouched:

| File | Was | Now |
| --- | --- | --- |
| `zara.svg` | no `fill` (renders `#000`) | `fill="#ffffff"` on the root |
| `loreal.svg` | no `fill` (renders `#000`) | `fill="#ffffff"` on the root |
| `wns.svg` | `#000` letters, `#EF4E30` tick | white letters, tick unchanged |
| `bridgestone.svg` | `#231815` wordmark, `#e60012` mark | white wordmark, mark unchanged |

WNS does publish an official `logowhite.svg`, but it is a base64 PNG in an SVG
wrapper and a different (stacked) lockup, so the derived reverse is the better
file. Zara, L'Oréal and Bridgestone render their sites client-side and expose
no logo asset to fetch.

Any logo added later that is drawn in black needs the same treatment, or it
will not appear on the page at all.
