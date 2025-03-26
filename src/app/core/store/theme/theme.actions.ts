import { createAction, props } from '@ngrx/store';

export const initTheme = createAction('[Theme] Initialize Theme');

export const themeInitialized = createAction(
  '[Theme] Theme Initialized',
  props<{ isDarkMode: boolean }>()
);

export const toggleTheme = createAction('[Theme] Toggle Theme', props<{ isDarkMode: boolean }>());
export const toggleThemeSuccess = createAction('[Theme] Toggle Theme Success');

export const setTheme = createAction('[Theme] Set Theme', props<{ isDarkMode: boolean }>());
export const setThemeSuccess = createAction('[Theme] Set Theme Success');

export const loadThemePreference = createAction('[Theme] Load Theme Preference');
export const loadThemePreferenceSuccess = createAction(
  '[Theme] Load Theme Preference Success',
  props<{ isDarkMode: boolean }>()
); 