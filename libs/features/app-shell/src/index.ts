export { default as AppShellLayout } from './AppShellLayout.vue';
export {
  applyTheme,
  initializeTheme,
  persistThemePreference,
  watchSystemThemeChange,
} from './theme/theme';
export type { ResolvedTheme, ThemePreference } from './theme/theme';