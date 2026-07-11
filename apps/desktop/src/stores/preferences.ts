import { defineStore } from 'pinia';
import {
  applyTheme,
  persistThemePreference,
  type ThemePreference,
  watchSystemThemeChange,
} from '@sonar-room/features/app-shell';

export const usePreferencesStore = defineStore('preferences', {
  state: () => ({
    themePreference: 'system' as ThemePreference,
  }),

  actions: {
    initialize(themePreference: ThemePreference): void {
      this.themePreference = themePreference;
      applyTheme(themePreference);
      watchSystemThemeChange(() => {
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