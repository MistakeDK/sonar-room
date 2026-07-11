import { defineStore } from 'pinia';
import {
  applyTheme,
  persistThemePreference,
  type ThemePreference,
  watchSystemThemeChange,
} from '@sonar-room/features/app-shell';

let stopWatchingSystemTheme: (() => void) | undefined;

export const usePreferencesStore = defineStore('preferences', {
  state: () => ({
    themePreference: 'system' as ThemePreference,
  }),

  actions: {
    initialize(themePreference: ThemePreference): void {
      stopWatchingSystemTheme?.();
      this.themePreference = themePreference;
      applyTheme(themePreference);
      stopWatchingSystemTheme = watchSystemThemeChange(() => {
        if (this.themePreference === 'system') {
          applyTheme('system');
        }
      });
    },

    setThemePreference(themePreference: ThemePreference): void {
      this.themePreference = themePreference;
      persistThemePreference(themePreference);
      applyTheme(themePreference);
    },
  },
});