import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { appReducers } from './core/store/index/app.reducer';
import { ThemeEffects } from './core/store/theme/theme.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(appReducers),
    provideEffects([ThemeEffects])
  ]
};
