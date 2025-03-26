import { createReducer, on } from '@ngrx/store';
import { ThemeState, initialState } from './theme.state';
import * as ThemeActions from './theme.actions';

export const themeReducer = createReducer(
  initialState,
  on(ThemeActions.toggleTheme, (state) => ({
    ...state,
    isDarkMode: !state.isDarkMode
  })),
  on(ThemeActions.setTheme, (state, { isDarkMode }) => ({
    ...state,
    isDarkMode
  })),
  on(ThemeActions.loadThemePreferenceSuccess, (state, { isDarkMode }) => ({
    ...state,
    isDarkMode
  }))
); 