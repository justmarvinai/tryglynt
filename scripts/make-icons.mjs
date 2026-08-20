/**
 * Generates all PWA/app icons from the Glynt "G" mark (docs/DESIGN.md §3).
 * The mark: an open ring forming a G — echoing the energy ring — with a
 * spark dot in the opening. Run: `npm run icons` (outputs are committed).
 */
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";

// Ring: center 256, r 140, stroke 56. Arc from 0° clockwise to -60°,
// crossbar at the arc start, spark dot mid-gap at -30°.
const GLYPH = `
  <path d="M 396 256 A 140 140 0 1 1 326 134.76"
        fill="none" stroke="COLOR" stroke-width="56" stroke-linecap="round"/>
  <path d="M 396 256 L 300 256"
        fill="none" stroke="COLOR" stroke-width="56" stroke-linecap="round"/>
  <circle cx="377.24" cy="186" r="30" fill="COLOR"/>
`;

const GREEN = "#30c96e";
const GREEN_DEEP = "#24b862";

function glyph(color) {
  return GLYPH.replaceAll("COLOR", color);
}

/** Full-bleed green tile with a white glyph, scaled around the center. */
function tile(size, glyphScale) {
  const s = glyphScale;
  const offset = (512 * (1 - s)) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${GREEN}"/>
      <stop offset="1" stop-color="${GREEN_DEEP}"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="url(#bg)"/>
  <g transform="translate(${offset} ${offset}) scale(${s})">${glyph("#ffffff")}</g>
</svg>`;
}

/** Transparent glyph-only SVG (favicon, in-app logo). */
function mark(color = GREEN) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">${glyph(color)}</svg>`;
}

mkdirSync("public/icons", { recursive: true });
writeFileSync("public/favicon.svg", mark());
writeFileSync("src/assets/logo.svg", mark());

const jobs = [
  ["public/icons/icon-192.png", tile(192, 0.72)],
  ["public/icons/icon-512.png", tile(512, 0.72)],
  ["public/icons/icon-maskable-512.png", tile(512, 0.55)],
  ["public/icons/apple-touch-icon.png", tile(180, 0.72)],
];

for (const [file, svg] of jobs) {
  await sharp(Buffer.from(svg)).png().toFile(file);
  console.log("✓", file);
}
