import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>Home</h2>
    <p>This page is owned by the Angular router.</p>
    <p>Open <strong>Feature (web component)</strong> above to cross the delegation boundary.</p>
  `,
})
export class Home {}
