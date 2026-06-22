import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

const REPO_URL = 'https://github.com/igor-ganov/angular-webcomponent-routing';

// Code snippets are plain strings rendered via interpolation, so the Angular
// template parser treats them as text — no escaping of `<`, `{`, `}` or backticks.
const CLONE = `git clone --recursive ${REPO_URL}.git
cd angular-webcomponent-routing
bun install && bun run start`;

const API = `createSubtreeRouter({
  base,     // path prefix this router owns, e.g. "/feature"
  routes,   // [{ pattern, render: (ctx) => view }] — pattern relative to base: "", "item/:id"
  outlet,   // the element the active view is committed into
  commit,   // (view, outlet) => void — Lit render, React root, replaceChildren…
  fallback, // optional (ctx) => view when nothing matches
})          // → { navigate(path), dispose() }`;

const WC_ROUTES = `export const routes = [
  { pattern: '',         render: ({ base }) => html\`<feature-list .base=\${base}></feature-list>\` },
  { pattern: 'item/:id', render: ({ params }) => html\`<feature-item .itemId=\${params['id']}></feature-item>\` },
];`;

const WC_COMMIT = `const litCommit = (view, outlet) => render(view, outlet);
createSubtreeRouter({ base, routes, fallback, outlet, commit: litCommit });`;

const WC_ROOT = `@property({ type: String }) base = '';
updated(c) { if (c.has('base') && this.base) this.setupRouter(); }
render() { return html\`… <main class="outlet"></main>\`; }`;

const HOST_MATCHER = `const baseHref = new URL(document.baseURI).pathname.replace(/\\/$/, '');
export const FEATURE_BASE = \`\${baseHref}/feature\`;
export const featureMatcher = (segments) =>
  segments[0]?.path === 'feature' ? { consumed: segments } : null;`;

const HOST_ROUTE = `{ matcher: featureMatcher, component: FeatureHost }   // in your Routes
// FeatureHost template: <feature-app [base]="FEATURE_BASE"></feature-app>`;

const HOST_BOOT = `import '@igor-ganov/feature-web-component';  // side-effect, in main.ts before bootstrap
provideRouter(routes, withRouterConfig({ onSameUrlNavigation: 'reload' }))`;

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <h2>Home</h2>
    <p>This page is owned by the Angular router.</p>
    <p>Open <strong>Feature (web component)</strong> above to cross the delegation boundary.</p>

    <section class="quickstart" aria-labelledby="qs-title">
      <h3 id="qs-title">Quick start</h3>
      <p>Clone with submodules, then install and run the whole workspace:</p>
      <pre><code>{{ clone }}</code></pre>
      <p>
        Then open <a routerLink="/feature">Feature</a>, switch its <strong>Items</strong> / <strong>Counter</strong>
        tabs, or deep-link straight to <a routerLink="/feature/item/2">/feature/item/2</a> — no page reload.
      </p>

      <h3 class="sub">Wire it into your own project</h3>
      <p>
        <code>&#64;igor-ganov/subtree-router</code> owns a <em>subtree</em> of the URL (everything
        under <code>base</code>) and knows nothing about your view layer — you connect it with one
        <code>commit(view, outlet)</code> adapter. A route is just <code>pattern + lambda(ctx) → view</code>.
        Navigations outside <code>base</code> stay with the host router.
      </p>
      <pre><code>{{ api }}</code></pre>

      <p><strong>Web-component side</strong> — 4 steps:</p>
      <ol class="steps">
        <li>
          Declare routes in <strong>one file</strong> as <code>pattern → lambda → component</code>;
          params flow in via bindings. The only place routes live:
          <pre><code>{{ wcRoutes }}</code></pre>
        </li>
        <li>
          Pick the <strong>commit adapter</strong> for your view layer and build the router:
          <pre><code>{{ wcCommit }}</code></pre>
        </li>
        <li>
          The <strong>root element is mount-agnostic</strong>: the host injects the path via a
          <code>base</code> property. Create the router in <code>updated</code> (the host sets
          <code>base</code> after <code>connectedCallback</code>; the outlet exists only after the
          first render) and <code>dispose()</code> on disconnect:
          <pre><code>{{ wcRoot }}</code></pre>
        </li>
        <li>
          Internal links are plain <code>&lt;a href&gt;</code> — the Navigation API turns clicks into
          same-document transitions, so the host never sees them.
        </li>
      </ol>

      <p><strong>Angular host side</strong> — 3 steps:</p>
      <ol class="steps">
        <li>
          Consume the whole subtree with one <code>UrlMatcher</code>, so every sub-path resolves to
          the same route node and Angular never destroys the element on internal navigation:
          <pre><code>{{ hostMatcher }}</code></pre>
        </li>
        <li>
          Register the matcher and inject <code>base</code> into the element
          (<code>CUSTOM_ELEMENTS_SCHEMA</code> allows the unknown tag):
          <pre><code>{{ hostRoute }}</code></pre>
        </li>
        <li>
          Register the element and enable same-URL reload:
          <pre><code>{{ hostBoot }}</code></pre>
        </li>
      </ol>
      <p class="note">
        Everything that changes between projects is <code>FEATURE_BASE</code> and the routes table.
        The engine is never touched; mount at <code>/admin</code> by changing one constant.
      </p>
    </section>

    <p class="repo">
      <a [href]="repoUrl" target="_blank" rel="noopener noreferrer">
        Source on GitHub ↗
      </a>
    </p>
  `,
  styles: `
    .quickstart { margin-top: 24px; padding: 16px 20px; border: 1px solid #e3e3ef; border-radius: 12px; background: #f6f5ff; }
    .quickstart h3 { margin: 0 0 8px; font-size: 16px; }
    .quickstart h3.sub { margin: 24px 0 8px; padding-top: 16px; border-top: 1px solid #e3e3ef; }
    .quickstart pre { margin: 12px 0; padding: 12px 14px; overflow-x: auto; background: #1a1a2e; color: #ece9ff; border-radius: 8px; font: 13px/1.6 ui-monospace, monospace; }
    .quickstart :not(pre) > code { background: #ece9ff; color: #4834d4; padding: 1px 6px; border-radius: 6px; font: 13px/1.4 ui-monospace, monospace; }
    .quickstart .steps { margin: 8px 0; padding-left: 22px; }
    .quickstart .steps > li { margin: 0 0 14px; }
    .quickstart .note { margin-top: 16px; color: #555; }
    .repo { margin-top: 20px; }
    .repo a { font-weight: 600; color: #4834d4; text-decoration: none; }
    .repo a:hover { text-decoration: underline; }
    a:focus-visible { outline: 3px solid #6c5ce7; outline-offset: 2px; }
  `,
})
export class Home {
  protected readonly repoUrl = REPO_URL;
  protected readonly clone = CLONE;
  protected readonly api = API;
  protected readonly wcRoutes = WC_ROUTES;
  protected readonly wcCommit = WC_COMMIT;
  protected readonly wcRoot = WC_ROOT;
  protected readonly hostMatcher = HOST_MATCHER;
  protected readonly hostRoute = HOST_ROUTE;
  protected readonly hostBoot = HOST_BOOT;
}
