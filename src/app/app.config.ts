import { type ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // 'reload' guarantees a fresh navigation even when the web component has
    // advanced the URL behind Angular's back, so re-entering the subtree works.
    provideRouter(routes, withRouterConfig({ onSameUrlNavigation: 'reload' })),
  ],
};
