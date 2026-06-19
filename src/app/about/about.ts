import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>About</h2>
    <p>Another plain Angular route, for contrast with the delegated subtree.</p>
  `,
})
export class About {}
