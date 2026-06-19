import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="topbar">
      <h1>Angular host + web-component subtree router</h1>
      <nav aria-label="Primary">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
        <a routerLink="/about" routerLinkActive="active">About</a>
        <a routerLink="/feature" routerLinkActive="active">Feature (web component)</a>
      </nav>
    </header>
    <main>
      <router-outlet />
    </main>
  `,
  styles: `
    :host { display: block; max-width: 880px; margin: 0 auto; padding: 24px; font: 16px/1.6 system-ui, sans-serif; color: #1a1a2e; }
    .topbar { border-bottom: 1px solid #e3e3ef; padding-bottom: 12px; margin-bottom: 20px; }
    h1 { font-size: 20px; margin: 0 0 12px; }
    nav { display: flex; flex-wrap: wrap; gap: 10px; }
    nav a { text-decoration: none; padding: 6px 12px; border-radius: 8px; color: #2d3436; background: #f1f1f6; }
    nav a:hover { background: #e3e3ef; }
    nav a.active { background: #6c5ce7; color: #fff; }
    a:focus-visible { outline: 3px solid #6c5ce7; outline-offset: 2px; }
    main { min-height: 240px; }
  `,
})
export class App {}
