import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

/**
 * Application Bootstrap
 * 
 * This is the entry point of the Angular application.
 */
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

