import 'angular2-universal-polyfills/browser';

import { platformUniversalDynamic } from 'angular2-universal/browser';
import { AppModule } from './app/app.module.client';

const platformRef = platformUniversalDynamic();

document.addEventListener('DOMContentLoaded', () => {
  platformRef.bootstrapModule(AppModule);
})
