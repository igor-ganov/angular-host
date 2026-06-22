import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

const REPO_URL = 'https://github.com/igor-ganov/angular-webcomponent-routing';

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
      <pre><code>git clone --recursive {{ repoUrl }}.git
cd angular-webcomponent-routing
bun install && bun run start</code></pre>
      <p>
        Then open <a routerLink="/feature">Feature</a>, switch its <strong>Items</strong> / <strong>Counter</strong>
        tabs, or deep-link straight to <a routerLink="/feature/item/2">/feature/item/2</a> — no page reload.
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
    .quickstart pre { margin: 12px 0; padding: 12px 14px; overflow-x: auto; background: #1a1a2e; color: #ece9ff; border-radius: 8px; font: 13px/1.6 ui-monospace, monospace; }
    .repo { margin-top: 20px; }
    .repo a { font-weight: 600; color: #4834d4; text-decoration: none; }
    .repo a:hover { text-decoration: underline; }
    a:focus-visible { outline: 3px solid #6c5ce7; outline-offset: 2px; }
  `,
})
export class Home {
  protected readonly repoUrl = REPO_URL;
}
