import { Injectable, PLATFORM_ID, Inject, NgModule } from '@angular/core';
import { Actions, createEffect, ofType, EffectsModule } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of, EMPTY } from 'rxjs';
import { map, tap, filter, switchMap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import * as ThemeActions from './theme.actions';

@Injectable()
export class ThemeEffects {
  // Skip effects in SSR - they'll be created with noop implementations
  saveThemePreference$ = createEffect(() => 
    of(1).pipe(
      filter(() => isPlatformBrowser(this.platformId)),
      switchMap(() => this.actions$.pipe(
        ofType(ThemeActions.toggleTheme),
        tap(({ isDarkMode }) => {
          localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        }),
        map(() => ThemeActions.toggleThemeSuccess())
      ))
    )
  );

  loadThemePreference$ = createEffect(() => 
    of(1).pipe(
      switchMap(() => this.actions$.pipe(
        ofType(ThemeActions.loadThemePreference),
        map(() => {
          if (!isPlatformBrowser(this.platformId)) {
            return ThemeActions.setTheme({ isDarkMode: false });
          }
          
          const savedTheme = localStorage.getItem('theme');
          if (savedTheme) {
            return ThemeActions.setTheme({ isDarkMode: savedTheme === 'dark' });
          }
          return ThemeActions.setTheme({ isDarkMode: false });
        })
      ))
    )
  );

  applyTheme$ = createEffect(() => 
    of(1).pipe(
      filter(() => isPlatformBrowser(this.platformId)),
      switchMap(() => this.actions$.pipe(
        ofType(ThemeActions.setTheme),
        tap(({ isDarkMode }) => {
          const htmlElement = document.documentElement;
          if (isDarkMode) {
            htmlElement.classList.add('dark-theme');
            htmlElement.classList.remove('light-theme');
          } else {
            htmlElement.classList.add('light-theme');
            htmlElement.classList.remove('dark-theme');
          }
        }),
        map(() => ThemeActions.setThemeSuccess())
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
} 