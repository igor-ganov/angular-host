import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/**
 * The Angular side of the delegation boundary. It renders the `<feature-app>`
 * custom element and passes the base path it owns. From here on, the web
 * component's own router takes over every sub-path under `/feature`.
 *
 * CUSTOM_ELEMENTS_SCHEMA lets the template reference a tag Angular does not know.
 */
@Component({
  selector: 'app-feature-host',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <p class="hint">
      Angular matched <code>/feature/**</code> to a single route and delegated the whole subtree
      below to the web component. Use its navigation — the Angular route never changes and this
      component is never re-created.
    </p>
    <feature-app base="/feature"></feature-app>
  `,
  styles: `
    :host { display: block; }
    .hint { margin: 0 0 16px; color: #555; max-width: 60ch; }
    code { background: #eee; padding: 1px 6px; border-radius: 6px; }
  `,
})
export class FeatureHost {}
