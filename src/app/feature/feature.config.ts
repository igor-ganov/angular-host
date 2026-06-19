import type { UrlMatcher, UrlMatchResult, UrlSegment } from '@angular/router';

/**
 * Single source of truth for where the feature web component is mounted. Both the
 * route matcher and the `<feature-app>` binding derive from this one constant, so
 * the mount path is defined exactly once on the host (the routing authority). The
 * web component itself stays mount-agnostic — it is *told* this value at runtime.
 */
export const FEATURE_BASE = '/feature';

const FEATURE_ROOT = FEATURE_BASE.replace(/^\//, '');

/**
 * Consumes the *entire* `FEATURE_BASE` subtree into a single route. Because all
 * sub-paths resolve to the same route node, the Angular router reuses the host
 * component instance across internal navigations and never destroys the embedded
 * web component — it simply hands the whole subtree over to it.
 */
export const featureMatcher: UrlMatcher = (segments: UrlSegment[]): UrlMatchResult | null =>
  segments.length > 0 && segments[0]?.path === FEATURE_ROOT ? { consumed: segments } : null;
