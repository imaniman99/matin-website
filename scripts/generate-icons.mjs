// Generates favicons, PWA icons and the default
// social-share (Open Graph) image from the original circular logo.
// Usage: npm run icons
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = 'assets/logo-circle.jpg';
// Measured bounds of the circle inside the 1254×1254 source (white corners outside).
const CROP = { left: 26, top: 24, width: 1188, height: 1188 };
const R = CROP.width / 2;

const mask = Buffer.from(
  `<svg width="${CROP.width}" height="${CROP.height}"><circle cx="${R}" cy="${R}" r="${R - 1}" fill="#fff"/></svg>`,
);

await mkdir('public/icons', { recursive: true });

const circle = await sharp(SRC)
  .extract(CROP)
  .ensureAlpha()
  .composite([{ input: mask, blend: 'dest-in' }])
  .png()
  .toBuffer();

await sharp(circle)
  .resize(512)
  .png({ palette: true, quality: 92 })
  .toFile('public/icons/logo-512.png');

// Favicons (transparent background).
for (const size of [16, 32, 48]) {
  await sharp(circle).resize(size).png().toFile(`public/icons/favicon-${size}.png`);
}

// Opaque icons for iOS / Android (platforms add their own masks).
const opaque = async (size, pad, file) => {
  const inner = Math.round(size * (1 - pad * 2));
  const logo = await sharp(circle).resize(inner).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: '#ffffff' } })
    .composite([{ input: logo, gravity: 'center' }])
    .png({ palette: true, quality: 92, compressionLevel: 9 })
    .toFile(file);
};
await opaque(180, 0.04, 'public/icons/apple-touch-icon.png');
await opaque(192, 0.02, 'public/icons/icon-192.png');
await opaque(512, 0.02, 'public/icons/icon-512.png');
await opaque(512, 0.12, 'public/icons/icon-maskable-512.png');

// Default Open Graph / Twitter image, 1200×630.
const ogBg = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FFF8EC"/><stop offset="0.55" stop-color="#FFFFFF"/><stop offset="1" stop-color="#DDF4F9"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <path d="M0 470 C 250 400 450 560 700 500 S 1050 420 1200 470 V630 H0Z" fill="#6CCFE3" opacity=".35"/>
  <path d="M0 520 C 300 450 520 600 780 540 S 1080 480 1200 520 V630 H0Z" fill="#6CCFE3" opacity=".45"/>
  <path d="M0 500 C 280 430 480 590 740 525 S 1070 450 1200 495" fill="none" stroke="#D9A441" stroke-width="3" opacity=".9"/>
</svg>`);
const ogLogo = await sharp(circle).resize(520).toBuffer();
await sharp(ogBg)
  .composite([{ input: ogLogo, left: 340, top: 55 }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile('public/og-default.jpg');

console.log('✔ Icons and share image generated.');
