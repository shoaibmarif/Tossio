/**
 * Abstract analytics layer.
 * Default implementation is a no-op.
 * Replace with real provider (GA4, Plausible, etc.) when ready.
 */

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, string | number | boolean>;
}

export interface AnalyticsProvider {
  track(event: AnalyticsEvent): void;
}

class NoOpAnalytics implements AnalyticsProvider {
  track(_event: AnalyticsEvent): void {
    // No-op in production. Uncomment for debugging:
    // console.debug('[Analytics]', _event.name, _event.properties);
  }
}

let provider: AnalyticsProvider = new NoOpAnalytics();

export function setAnalyticsProvider(p: AnalyticsProvider): void {
  provider = p;
}

export function trackEvent(name: string, properties?: Record<string, string | number | boolean>): void {
  try {
    provider.track({ name, properties });
  } catch {
    // Analytics must never break the app
  }
}
