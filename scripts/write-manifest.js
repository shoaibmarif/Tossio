import fs from 'fs';

const manifest = {
  name: "coinfliptool – Free Virtual Coin Flip & Probability Simulator",
  short_name: "coinfliptool",
  description: "Fast, cryptographically secure virtual coin flip simulator & probability analysis engine. Works completely offline.",
  start_url: "/",
  display: "standalone",
  theme_color: "#f59e0b",
  background_color: "#0f172a",
  orientation: "portrait-primary",
  icons: [
    {
      src: "/icon-192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "any maskable"
    },
    {
      src: "/icon-512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any maskable"
    }
  ]
};

const content = JSON.stringify(manifest, null, 2);
fs.writeFileSync('./public/manifest.webmanifest', content, 'utf8');
fs.writeFileSync('./public/manifest.json', content, 'utf8');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="coinGrad" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#fde68a"/>
      <stop offset="50%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#b45309"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="48" fill="#78350f"/>
  <circle cx="50" cy="50" r="45" fill="url(#coinGrad)"/>
  <circle cx="50" cy="50" r="39" fill="none" stroke="#92400e" stroke-width="1.5" stroke-dasharray="2 3"/>
  <text x="50" y="60" text-anchor="middle" font-size="32" font-weight="900" font-family="system-ui, sans-serif" fill="#fffbeb" stroke="#78350f" stroke-width="0.8">H</text>
</svg>`;
fs.writeFileSync('./public/favicon.svg', svg, 'utf8');

const robots = `User-agent: *\nAllow: /\n\nSitemap: https://coinfliptool.netlify.app/sitemap.xml\n`;
fs.writeFileSync('./public/robots.txt', robots, 'utf8');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://coinfliptool.netlify.app/</loc>
    <lastmod>2026-09-27</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://coinfliptool.netlify.app/coin-flip-experiment</loc>
    <lastmod>2026-09-27</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://coinfliptool.netlify.app/coin-flip-statistics</loc>
    <lastmod>2026-09-27</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://coinfliptool.netlify.app/coin-flip-probability</loc>
    <lastmod>2026-09-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://coinfliptool.netlify.app/decision-coin-flip</loc>
    <lastmod>2026-09-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://coinfliptool.netlify.app/daily-coin-flip</loc>
    <lastmod>2026-09-27</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://coinfliptool.netlify.app/how-coin-flipping-works</loc>
    <lastmod>2026-09-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://coinfliptool.netlify.app/faq</loc>
    <lastmod>2026-09-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://coinfliptool.netlify.app/about</loc>
    <lastmod>2026-09-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://coinfliptool.netlify.app/contact</loc>
    <lastmod>2026-09-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://coinfliptool.netlify.app/sitemap</loc>
    <lastmod>2026-09-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>\n`;
fs.writeFileSync('./public/sitemap.xml', sitemap, 'utf8');

const redirects = `/*    /index.html   200\n`;
fs.writeFileSync('./public/_redirects', redirects, 'utf8');

const sw = `const CACHE_NAME = 'coinflip-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/favicon.ico',
  '/favicon-48x48.png',
  '/favicon-96x96.png',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/apple-touch-icon.png',
  '/favicon.svg',
  '/icon-192.png',
  '/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/index.html') || caches.match('/'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
`;
fs.writeFileSync('./public/sw.js', sw, 'utf8');

console.log('All public files written successfully.');
