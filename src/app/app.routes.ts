import type { Routes } from '@angular/router';
import { About } from './about/about';
import { featureMatcher } from './feature/feature.config';
import { FeatureHost } from './feature/feature-host';
import { Home } from './home/home';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: Home },
  { path: 'about', component: About },
  // The whole /feature subtree is consumed by one route and handed to the web component.
  { matcher: featureMatcher, component: FeatureHost },
  { path: '**', component: NotFound },
];
