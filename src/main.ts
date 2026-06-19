import { bootstrapApplication } from '@angular/platform-browser';
// Side-effect import: registers the <feature-app> custom element before bootstrap.
import '@igor-ganov/feature-web-component';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
