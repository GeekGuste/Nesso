import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { API_BASE_URL } from './api/nesso-client-service';
import { LOCALE_ID } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideHttpClient(), 
    provideRouter(routes),
    importProvidersFrom(MarkdownModule.forRoot()),
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl },
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ]
};
