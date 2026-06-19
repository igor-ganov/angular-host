import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>Not found</h2>
    <p>No Angular route matched this path.</p>
  `,
})
export class NotFound {}
