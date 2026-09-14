// Generates public/og.png (1200x630), the social share card for Discord,
// Slack, and link unfurls. Pure SVG + monospace so it renders identically
// anywhere. Run: node scripts/make-og.mjs (output is committed).
import sharp from 'sharp';

const stars = [
  [90, 80, 1.6, 0.5], [230, 190, 1.1, 0.35], [340, 60, 1.4, 0.45],
  [520, 140, 1.1, 0.3], [700, 70, 1.7, 0.5], [860, 180, 1.2, 0.35],
  [1030, 90, 1.5, 0.45], [1130, 240, 1.1, 0.3], [150, 420, 1.2, 0.3],
  [1080, 460, 1.4, 0.4], [960, 560, 1.1, 0.3], [420, 560, 1.2, 0.3],
]
  .map(([x, y, r, o]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#eef5f8" opacity="${o}"/>`)
  .join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="t" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0.15" stop-color="#9df0c4"/>
      <stop offset="0.85" stop-color="#7fd6f2"/>
    </linearGradient>
    <radialGradient id="aurora" cx="0.3" cy="0.1" r="0.9">
      <stop offset="0" stop-color="#1f9d63" stop-opacity="0.28"/>
      <stop offset="0.5" stop-color="#1f9d63" stop-opacity="0.08"/>
      <stop offset="1" stop-color="#1f9d63" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="#0b1218"/>
  <rect width="1200" height="630" fill="url(#aurora)"/>
  ${stars}

  <!-- planet mark -->
  <g transform="translate(76,96) scale(3.4)">
    <circle cx="16" cy="18" r="9" fill="#0e2e20" stroke="#2fbf7a" stroke-width="2"/>
    <path d="M8.6 14.5h14.8M7.2 18.5h17.6M8.9 22.5h14.2" stroke="#2fbf7a" stroke-width="1.1" opacity="0.55" fill="none"/>
    <path d="M2.4 21.8c4.4 3.4 12.5 4.4 19.9 2.2 7-2.1 10.4-6 7.4-9.1" fill="none" stroke="#6fc7e8" stroke-width="1.6" stroke-linecap="round" opacity="0.9"/>
    <path d="M16 9V4.8" stroke="#9ff0c3" stroke-width="2" stroke-linecap="round"/>
    <path d="M16 5.2c0-2.4 2-3.8 4.4-3.8 0 2.4-2 3.8-4.4 3.8Z" fill="#9ff0c3"/>
    <path d="M16 7.4c0-1.9-1.6-3-3.5-3 0 1.9 1.6 3 3.5 3Z" fill="#2fbf7a"/>
  </g>

  <g font-family="Consolas, 'DejaVu Sans Mono', monospace">
    <text x="230" y="172" font-size="86" font-weight="700" fill="url(#t)">terraform.wiki</text>
    <text x="234" y="228" font-size="30" fill="#a8bcc6">Field documentation for Code: Terraform</text>

    <!-- terminal panel -->
    <rect x="230" y="290" width="740" height="248" rx="14" fill="#081410" stroke="#1f9d63" stroke-opacity="0.55" stroke-width="2"/>
    <g font-size="27" fill="#7fe0ab">
      <text x="266" y="342">$ uplink --sync nocturna/docs</text>
      <text x="266" y="384">&gt; wiki pages ............. 330</text>
      <text x="266" y="426">&gt; crosslinks ........... 2250+</text>
      <text x="266" y="468">&gt; broken links ............. 0</text>
      <text x="266" y="510">&gt; status ........ TERRAFORMING_</text>
    </g>
  </g>

  <text x="1124" y="596" text-anchor="end" font-family="Consolas, monospace" font-size="22" fill="#415562">unofficial player docs</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile('public/og.png');
console.log('wrote public/og.png');
