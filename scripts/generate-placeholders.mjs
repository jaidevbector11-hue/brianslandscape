/**
 * Generates tasteful SVG placeholder images for the project gallery + the
 * Open Graph card. Filenames are intentionally keyword-rich for image SEO.
 *
 * Replace the generated files in /public/images/gallery with real project
 * photos when the client supplies them — keep the descriptive filenames.
 *
 * Run with: npm run gen:images
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const galleryDir = join(root, "public", "images", "gallery");
mkdirSync(galleryDir, { recursive: true });

const W = 1200;
const H = 800;

// --- palette ---------------------------------------------------------------
const palette = {
  skyTop: "#bfe3f2",
  skyTopDull: "#c7cdd1",
  skyBottom: "#eef6f8",
  grassAfter: "#4f9a43",
  grassAfterLt: "#69b35c",
  grassBefore: "#9aa86b",
  grassBeforeLt: "#b3ba78",
  soil: "#7a5536",
  soilDark: "#5e4029",
  trunk: "#6b4a2f",
  leafDark: "#2f6b2c",
  leaf: "#3f8a39",
  leafLt: "#5aa84f",
  mulch: "#7b4a2c",
  mulchLt: "#915a38",
  badge: "#234221",
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function tree(x, y, scale, opts = {}) {
  const { bare = false, leaf = palette.leaf, leafDark = palette.leafDark } = opts;
  const t = `translate(${x} ${y}) scale(${scale})`;
  if (bare) {
    return `<g transform="${t}">
      <rect x="-12" y="-150" width="24" height="160" rx="6" fill="${palette.trunk}"/>
      <path d="M0 -120 L-60 -190 M0 -110 L55 -175 M0 -90 L-40 -140 M0 -100 L35 -150" stroke="${palette.trunk}" stroke-width="9" stroke-linecap="round" fill="none"/>
    </g>`;
  }
  return `<g transform="${t}">
    <rect x="-13" y="-120" width="26" height="130" rx="7" fill="${palette.trunk}"/>
    <circle cx="0" cy="-150" r="78" fill="${leafDark}"/>
    <circle cx="-55" cy="-120" r="60" fill="${leaf}"/>
    <circle cx="58" cy="-122" r="62" fill="${leaf}"/>
    <circle cx="0" cy="-185" r="58" fill="${leaf}"/>
  </g>`;
}

function bush(x, y, scale, color = palette.leaf) {
  const t = `translate(${x} ${y}) scale(${scale})`;
  return `<g transform="${t}">
    <ellipse cx="0" cy="0" rx="70" ry="46" fill="${color}"/>
    <ellipse cx="-38" cy="6" rx="42" ry="34" fill="${color}"/>
    <ellipse cx="40" cy="6" rx="44" ry="34" fill="${color}"/>
  </g>`;
}

function stump(x, y, scale) {
  const t = `translate(${x} ${y}) scale(${scale})`;
  return `<g transform="${t}">
    <ellipse cx="0" cy="0" rx="55" ry="20" fill="${palette.trunk}"/>
    <rect x="-55" y="-44" width="110" height="44" fill="${palette.trunk}"/>
    <ellipse cx="0" cy="-44" rx="55" ry="20" fill="#8a623f"/>
    <ellipse cx="0" cy="-44" rx="34" ry="12" fill="#6b4a2f"/>
    <ellipse cx="0" cy="-44" rx="16" ry="6" fill="#8a623f"/>
  </g>`;
}

function debris(x, y) {
  return `<g transform="translate(${x} ${y})" stroke="${palette.trunk}" stroke-width="10" stroke-linecap="round">
    <path d="M-90 0 L30 -40"/><path d="M-40 10 L80 -10"/><path d="M-70 30 L60 30"/>
    <path d="M-10 -20 L40 40"/><path d="M-100 25 L-20 -30"/>
  </g>`;
}

function badge(title, tag) {
  return `<g>
    <rect x="40" y="40" width="${W - 80}" height="86" rx="16" fill="${palette.badge}" opacity="0.92"/>
    <text x="64" y="84" font-family="Georgia, serif" font-size="34" fill="#ffffff" font-weight="700">${esc(title)}</text>
    <text x="64" y="112" font-family="Arial, sans-serif" font-size="18" fill="#cfe6c9" letter-spacing="2">BRIAN'S LANDSCAPING · BETHLEHEM, PA</text>
    <rect x="${W - 200}" y="58" width="136" height="50" rx="25" fill="#ffffff"/>
    <text x="${W - 132}" y="91" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" fill="${palette.badge}" font-weight="800" letter-spacing="2">${esc(tag)}</text>
  </g>`;
}

function watermark() {
  return `<text x="${W - 40}" y="${H - 28}" text-anchor="end" font-family="Arial, sans-serif" font-size="16" fill="#ffffff" opacity="0.7">Placeholder — replace with real project photo</text>`;
}

function scene({ title, tag, after, category }) {
  const grass = after ? palette.grassAfter : palette.grassBefore;
  const grassLt = after ? palette.grassAfterLt : palette.grassBeforeLt;
  const skyTop = category === "cleanup" && !after ? palette.skyTopDull : palette.skyTop;
  const horizon = 500;

  let elements = "";
  switch (category) {
    case "tree-removal":
      elements = after
        ? bush(980, 690, 1.0, palette.leafLt) + tree(220, 700, 0.8)
        : tree(620, 720, 1.7, { leaf: palette.leafDark }) + tree(300, 700, 1.1);
      break;
    case "stump-grinding":
      elements = after
        ? `<ellipse cx="600" cy="690" rx="120" ry="26" fill="${grassLt}"/>` + bush(980, 690, 0.9)
        : stump(600, 700, 1.6) + bush(980, 690, 0.8, palette.grassBefore);
      break;
    case "mulching":
      elements = after
        ? `<path d="M120 720 Q600 640 1080 720 L1080 800 L120 800 Z" fill="${palette.mulch}"/>
           <path d="M120 720 Q600 648 1080 720" fill="none" stroke="${palette.mulchLt}" stroke-width="8"/>` +
          bush(320, 700, 0.7, palette.leaf) + bush(560, 706, 0.7, palette.leaf) + bush(820, 700, 0.7, palette.leaf)
        : `<path d="M120 730 Q600 690 1080 730 L1080 800 L120 800 Z" fill="${palette.soil}"/>` +
          bush(360, 712, 0.5, palette.grassBefore) + debris(820, 700);
      break;
    case "landscape-design":
      elements = after
        ? bush(280, 700, 0.8, palette.leaf) + bush(470, 712, 0.7, palette.leafLt) + tree(900, 700, 0.9) +
          `<path d="M520 800 L640 560 L720 560 L640 800 Z" fill="#d9cdab"/>`
        : `<rect x="200" y="660" width="760" height="120" fill="${palette.grassBefore}"/>` + bush(880, 700, 0.5, palette.grassBefore);
      break;
    case "cleanup":
      elements = after
        ? tree(300, 700, 0.9) + bush(940, 700, 0.9, palette.leafLt)
        : tree(300, 720, 0.9, { bare: true }) + debris(560, 690) + debris(860, 720);
      break;
    default:
      elements = tree(300, 700, 0.9) + bush(900, 700, 0.9);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)} — ${esc(tag)}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${skyTop}"/>
      <stop offset="1" stop-color="${palette.skyBottom}"/>
    </linearGradient>
    <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${grassLt}"/>
      <stop offset="1" stop-color="${grass}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  <circle cx="1020" cy="170" r="64" fill="#fff3c4" opacity="${category === "cleanup" && !after ? 0.4 : 0.9}"/>
  <path d="M0 ${horizon} Q300 ${horizon - 60} 600 ${horizon} T1200 ${horizon} L1200 ${H} L0 ${H} Z" fill="url(#ground)"/>
  ${elements}
  ${badge(title, tag)}
  ${watermark()}
</svg>`;
}

// items: [filenameBase, title, category]
const items = [
  ["tree-removal-bethlehem-pa", "Tree Removal in West Bethlehem", "tree-removal", true],
  ["stump-grinding-lehigh-valley", "Stump Grinding in the Lehigh Valley", "stump-grinding", true],
  ["mulching-bethlehem-pa", "14 Yards of Fresh Mulch", "mulching", true],
  ["landscape-design-bethlehem-pa", "Front Yard Landscape Design", "landscape-design", true],
  ["shrub-removal-bethlehem-pa", "Old Shrub Removal in Bethlehem", "cleanup", true],
  ["storm-cleanup-bethlehem-pa", "Storm Debris Cleanup", "cleanup", true],
  ["tree-trimming-bethlehem-pa", "Tree Trimming & Shaping", "tree-removal", false],
  ["lawn-care-bethlehem-pa", "Lawn Care & Cleanup", "landscape-design", false],
];

let count = 0;
for (const [base, title, category, hasBefore] of items) {
  if (hasBefore) {
    writeFileSync(
      join(galleryDir, `${base}-before.svg`),
      scene({ title, tag: "BEFORE", after: false, category })
    );
    count++;
  }
  writeFileSync(
    join(galleryDir, `${base}-after.svg`),
    scene({ title, tag: "AFTER", after: true, category })
  );
  count++;
}

// --- Open Graph card -------------------------------------------------------
const og = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="Brian's Landscaping — Landscaper & Tree Service in Bethlehem, PA">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#285325"/><stop offset="1" stop-color="#1e371d"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <g transform="translate(150 540)">${bush(0, 0, 0.9, "#3f8a39")}</g>
  <g transform="translate(1040 560)">${tree(0, 0, 0.9)}</g>
  <text x="80" y="250" font-family="Georgia, serif" font-size="74" fill="#ffffff" font-weight="800">Brian's Landscaping</text>
  <text x="84" y="320" font-family="Arial, sans-serif" font-size="36" fill="#bcd9b6">Landscaper &amp; Tree Service in Bethlehem, PA</text>
  <text x="84" y="386" font-family="Arial, sans-serif" font-size="28" fill="#dcebd9">Lawn care · Mulching · Tree removal · Stump grinding</text>
  <rect x="84" y="420" width="300" height="64" rx="32" fill="#ffffff"/>
  <text x="234" y="462" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" fill="#234221" font-weight="800">(610) 867-7414</text>
  <text x="430" y="462" font-family="Arial, sans-serif" font-size="26" fill="#bcd9b6">★ 4.4 · 19 Google reviews</text>
</svg>`;
writeFileSync(join(root, "public", "og-image.svg"), og);
count++;

console.log(`Generated ${count} placeholder images in public/images/gallery + og-image.svg`);
