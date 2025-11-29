import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { TODO_REPOSITORY_PROVIDER } from './infrastructure';

/**
 * Application Configuration
 * 
 * Configures providers and application-wide settings.
 * This is where we wire up the infrastructure providers.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Wire up the repository provider
    // This connects the domain abstraction to the infrastructure implementation
    TODO_REPOSITORY_PROVIDER
  ]
};

