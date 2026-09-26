# coinfliptool — Production-Ready Coin Flip Game & Probability Tool

A high-performance, accessible, privacy-first virtual coin flipper and interactive probability laboratory built with **React 19**, **TypeScript**, **Tailwind CSS**, and **Vite**.

Created by **Shoaib Arif**:
- 🌐 **Portfolio**: [https://shoaibarif.vercel.app/](https://shoaibarif.vercel.app/)
- 💻 **GitHub**: [https://github.com/shoaibmarif](https://github.com/shoaibmarif)
- 💼 **LinkedIn**: [https://www.linkedin.com/in/shoaibmarif/](https://www.linkedin.com/in/shoaibmarif/)

Designed as a frontend-only application with zero backend or database requirements, certified cryptographically secure randomness, installable PWA support, and ready for instant deployment to Netlify or any static host.

---

## 🌟 Key Features

### 1. Core Coin Flipping Experience
- **CSPRNG Randomness**: Uses the browser's hardware-backed Web Cryptography API (`crypto.getRandomValues()`) for authentic, unmanipulated 50/50 probability.
- **Realistic 3D Physics Animation**: Lifelike lift, horizontal spinning revolutions, and settle bounce with dynamic contact shadows.
- **Original Coin Designs**: Original metallic artwork (Classic Gold, Royal Silver, Antique Bronze, Cyber Neon) with detailed rim ridges and beaded relief rings—no copyrighted or real currency imagery.
- **Animation Presets & Reduced Motion**: Fast (400ms), Normal (750ms), Slow (1200ms), and custom Reduced-Motion mode respecting `prefers-reduced-motion`.
- **Strict State Management**: Eliminates double-clicks, duplicate updates, or animation overlap bugs during flips.

### 2. High-Performance Batch Simulations (up to 1,000,000 Flips)
- **Instant Monte Carlo Experiments**: Run batches of 100, 1,000, 10,000, or up to 1,000,000 flips in milliseconds using bitwise population-count operations.
- **Empirical Visualizations**: Interactive SVG donut charts, distribution bars, and deviation calculations from the theoretical 50.0% benchmark.
- **Saved Experiment History**: Saves the last 100 experiments locally with detailed views, deletion, and highlight badges for the **Closest to 50/50** and **Largest Sample Deviation**.
- **Social Sharing**: One-click sharing via the Web Share API (`navigator.share()`) with automated clipboard fallback.

### 3. Probability Learning Lab
- **Interactive Convergence Lab**: Watch the Law of Large Numbers in action as empirical Heads % converges toward the theoretical 50% line across sample sizes from 1 to 50,000 flips.
- **Educational Guides**: Explanations of trial independence, Gambler's Fallacy, sample variance, and margin of error formulas.
- **Physical Coin Fairness Tester ("Is My Coin Fair?")**: Descriptive analysis tool for evaluating physical coin flip trial data.

### 4. Interactive Tools & Mini-Games
- **Decision Coin Flip**: Enter Option A vs Option B to break analysis paralysis with an unbiased, private coin flip.
- **Deterministic Daily Challenge**: Generates a synchronized challenge for every player globally using the current date string (`YYYY-MM-DD`).
- **Prediction Game Mode**: Guess Heads or Tails before flipping to test intuition, build correct streaks, and earn combo score bonuses (+2 for 3 streak, +5 for 5 streak, +10 for 10 streak).
- **Custom Coin Studio**: Customize coin labels (e.g. YES / NO), symbols (e.g. ☀️ / 🌙), and metallic finishes with live 3D preview.
- **Weighted Coin Simulation**: Configurable biased coin simulation (e.g., 70% Heads / 30% Tails) with a clear disclaimer separating it from fair mode.

### 5. Statistics, Streaks & Achievements
- **Comprehensive Streak Engine**: Tracks current streaks, longest Heads streak, longest Tails streak, and longest overall streak.
- **14 Local Achievements**: Milestones from "First Toss" to "Centurion", "Hot Streak", "Big Data", and "Seer".
- **Zero-Telemetry Privacy**: All data is stored in the browser using versioned schema `coinflip:v1`. Nothing is sent to any server.

### 6. Audio, Accessibility & PWA
- **Synthesized Web Audio API**: Procedural sound effects for coin flicks, spinning ticks, chime landing, and victory fanfares without external audio files.
- **Accessible & Screen-Reader Ready**: ARIA live region (`role="status" aria-live="polite"`), high contrast, semantic HTML, and 56px+ touch targets.
- **Keyboard Shortcuts**:
  - <kbd>Space</kbd> / <kbd>Enter</kbd> — Flip Coin
  - <kbd>R</kbd> — Reset Stats
  - <kbd>H</kbd> — Predict Heads
  - <kbd>T</kbd> — Predict Tails
  - <kbd>Esc</kbd> — Dismiss Modals
- **PWA & Offline Capable**: `manifest.webmanifest`, service worker (`sw.js`), and cache-first offline support.

---

## 🛠️ Technology Stack

- **Framework**: React 19 (`react`, `react-dom`)
- **Language**: TypeScript (`tsc -b`)
- **Styling**: Tailwind CSS & PostCSS
- **Routing**: React Router DOM 7
- **Icons**: Lucide React
- **Testing**: Vitest (`vitest run` with Happy-DOM)
- **Bundler**: Vite 6

---

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/coin-flip.git
cd coin-flip

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Running Unit Tests

```bash
npm test
```

Runs 27 automated unit tests covering cryptographic random bits, streak detection, consistent percentage rounding, batch experiments, daily challenge determinism, and storage migrations.

### Production Build

```bash
npm run build
```

Compiles TypeScript and bundles static assets into `dist/`.

---

## 🌐 Netlify Deployment

The project includes `public/_redirects` configured for Single Page Application client-side routing (`/* /index.html 200`):

1. Link your Git repository on Netlify.
2. Set Build Command: `npm run build`
3. Set Publish Directory: `dist`
4. Deploy! All routes (`/`, `/coin-flip-experiment`, `/coin-flip-statistics`, `/coin-flip-probability`, `/decision-coin-flip`, `/daily-coin-flip`, etc.) will route seamlessly.

---

## 🔒 Privacy & Security

- **100% Client-Side**: No backend, no cookies, no third-party trackers.
- **Web Crypto API**: Certified random bit generation via `crypto.getRandomValues()`.
- **Local Storage**: User data remains strictly on the client device under key `coinflip:v1`.

---

## 📄 License

MIT License. Free for educational, commercial, and personal use.
