import type { UrlMatcher, UrlMatchResult, UrlSegment } from '@angular/router';

const FEATURE_ROOT = 'feature';

/**
 * Consumes the *entire* `/feature/...` subtree into a single route. Because all
 * sub-paths resolve to the same route node, the Angular router reuses the host
 * component instance across internal navigations and never destroys the embedded
 * web component — it simply hands the whole subtree over to it.
 */
export const featureMatcher: UrlMatcher = (segments: UrlSegment[]): UrlMatchResult | null =>
  segments.length > 0 && segments[0]?.path === FEATURE_ROOT ? { consumed: segments } : null;
