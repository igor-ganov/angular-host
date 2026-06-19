import type { UrlMatcher, UrlMatchResult, UrlSegment } from '@angular/router';

/**
 * Single source of truth for where the feature web component is mounted. The
 * matcher works on base-href-relative segments (so it always sees `feature`),
 * while the web component needs the *absolute* path — which must include the
 * deployed `<base href>` prefix (e.g. `/feature` locally, but
 * `/angular-webcomponent-routing/feature` under GitHub Pages). Deriving it from
 * `document.baseURI` keeps the web component mount-agnostic and the demo correct
 * wherever it is hosted.
 */
export const FEATURE_SEGMENT = 'feature';

const baseHref = new URL(document.baseURI).pathname.replace(/\/$/, '');
export const FEATURE_BASE = `${baseHref}/${FEATURE_SEGMENT}`;

/**
 * Consumes the *entire* feature subtree into a single route. Because all sub-paths
 * resolve to the same route node, the Angular router reuses the host component
 * instance across internal navigations and never destroys the embedded web
 * component — it simply hands the whole subtree over to it.
 */
export const featureMatcher: UrlMatcher = (segments: UrlSegment[]): UrlMatchResult | null =>
  segments.length > 0 && segments[0]?.path === FEATURE_SEGMENT ? { consumed: segments } : null;
