# Coin Flip Online

A polished, production-ready virtual coin flipper built with React, TypeScript, and Vite. Deployable as a static site on GitHub Pages.

## Features

- 🪙 **Fair Coin Flip** — Uses `crypto.getRandomValues()` for cryptographically secure randomness
- 🎨 **Smooth 3D Animation** — CSS-only coin flip animation with `prefers-reduced-motion` support
- 📊 **Live Statistics** — Track total flips, heads/tails counts and percentages
- 📜 **Flip History** — View your last 50 results
- ⚡ **Batch Flipping** — Flip 10, 20, 50, 100, or 1,000 coins instantly
- 💾 **Persistent Data** — Statistics and history saved to localStorage
- ♿ **Accessible** — Semantic HTML, ARIA live regions, keyboard navigation
- 📱 **Mobile-First** — Responsive design from 320px to large desktop
- 🔍 **SEO Optimized** — Meta tags, Open Graph, Twitter Cards, JSON-LD
- 🚀 **Lightweight** — ~50 KB gzipped, no external fonts or images

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── AdSlot.tsx       # Future ad integration (renders nothing)
│   ├── BatchFlip.tsx    # Batch flip interface
│   ├── Coin.tsx         # 3D animated coin
│   ├── CoinOptions.tsx  # Coin type selector
│   ├── ContentSections.tsx  # SEO content & FAQ
│   ├── FlipButton.tsx   # Primary flip button
│   ├── Footer.tsx       # Site footer
│   ├── Header.tsx       # Site header
│   ├── History.tsx      # Flip history display
│   ├── ProbabilityInfo.tsx  # Educational probability section
│   ├── ResultDisplay.tsx    # Result announcement
│   └── Statistics.tsx   # Flip statistics display
├── games/
│   └── coin-flip/
│       ├── logic.ts     # Coin flip game logic
│       └── types.ts     # TypeScript type definitions
├── hooks/
│   ├── useFlipState.ts      # Main state management hook
│   └── useReducedMotion.ts  # Reduced motion preference hook
├── lib/
│   ├── analytics.ts     # Abstract analytics layer
│   ├── random.ts        # Secure random number generation
│   └── storage.ts       # Safe localStorage wrapper
├── pages/
│   └── Home.tsx         # Main page layout
├── seo/
│   └── metadata.ts      # SEO metadata constants
├── styles/
│   └── global.css       # Global styles & design tokens
├── App.tsx              # App root component
└── main.tsx             # Entry point
```

## Deployment to GitHub Pages

### Option 1: GitHub Actions (Recommended)

1. Push this project to a GitHub repository.

2. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - id: deployment
        uses: actions/deploy-pages@v4
```

3. In your repository settings, go to **Pages** → set source to **GitHub Actions**.

4. Update `vite.config.ts` with your repository name:
```ts
export default defineConfig({
  base: '/your-repo-name/',
  plugins: [react()],
})
```

5. Update the canonical URL in `index.html` to match your GitHub Pages URL.

### Option 2: Manual Deployment

```bash
npm run build
# Deploy the `dist/` folder to any static hosting provider
```

## Configuration

### Analytics

The app includes an abstract analytics layer. To connect a real provider, implement the `AnalyticsProvider` interface in `src/lib/analytics.ts`.

### Advertising

The `<AdSlot />` component renders nothing by default. Replace its implementation with your ad provider's component when ready.

## License

MIT

