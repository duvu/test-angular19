import { ActionReducerMap } from '@ngrx/store';
import { themeReducer } from '../theme/theme.reducer';

export interface AppState {
  theme: any; // Replace 'any' with ThemeState type if needed
}

export const appReducers: ActionReducerMap<AppState> = {
  theme: themeReducer
}; 