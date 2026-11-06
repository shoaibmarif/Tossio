import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { ROUTES } from '../seo/routes';
import App from '../App';

beforeAll(() => {
  window.scrollTo = () => {};
  window.matchMedia ??= ((q: string) => ({
    matches: false, media: q, onchange: null,
    addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
});
afterEach(cleanup);

describe('every page renders with its SEO tags', () => {
  for (const route of ROUTES) {
    it(route.path, async () => {
      window.history.pushState({}, '', route.path);
      render(<App />);
      const h1 = await screen.findByRole('heading', { level: 1 }, { timeout: 5000 });
      expect(h1.textContent?.length).toBeGreaterThan(0);
      await new Promise((r) => setTimeout(r, 0));
      expect(document.title).toContain(route.title.split(' - ')[0].split(':')[0]);
      expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
        route.path === '/' ? 'https://tossio.vercel.app/' : `https://tossio.vercel.app${route.path}`
      );
    });
  }

  it('shows a noindex 404 for unknown URLs', async () => {
    window.history.pushState({}, '', '/nope');
    render(<App />);
    expect(await screen.findByRole('heading', { level: 1, name: /doesn’t exist/ })).toBeTruthy();
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toContain('noindex');
  });
});
