export const THEME_PREFERENCE_STORAGE_KEY = 'sonar-room.theme-preference';

export type ThemePreference = 'light' | 'dark' | 'system';
export type ResolvedTheme = Exclude<ThemePreference, 'system'>;

const themePreferences: ThemePreference[] = ['light', 'dark', 'system'];

function getStorage(): Storage | undefined {
  if (typeof window === 'undefined') {
    return undefined;
  }

  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

export function isThemePreference(value: string | null): value is ThemePreference {
  return value !== null && themePreferences.includes(value as ThemePreference);
}

export function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function resolveThemePreference(preference: ThemePreference): ResolvedTheme {
  return preference === 'system' ? getSystemTheme() : preference;
}

export function loadThemePreference(): ThemePreference {
  const storage = getStorage();

  if (!storage) {
    return 'system';
  }

  try {
    const savedPreference = storage.getItem(THEME_PREFERENCE_STORAGE_KEY);
    return isThemePreference(savedPreference) ? savedPreference : 'system';
  } catch {
    return 'system';
  }
}

export function persistThemePreference(preference: ThemePreference): void {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  try {
    storage.setItem(THEME_PREFERENCE_STORAGE_KEY, preference);
  } catch {
    return;
  }
}

export function applyTheme(preference: ThemePreference): ResolvedTheme {
  const resolvedTheme = resolveThemePreference(preference);

  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
    document.documentElement.style.colorScheme = resolvedTheme;
  }

  return resolvedTheme;
}

export function watchSystemThemeChange(callback: (theme: ResolvedTheme) => void): () => void {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return () => undefined;
  }

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const listener = (event: MediaQueryListEvent) => callback(event.matches ? 'dark' : 'light');

  mediaQuery.addEventListener?.('change', listener);

  return () => mediaQuery.removeEventListener?.('change', listener);
}

export function initializeTheme(): ThemePreference {
  const preference = loadThemePreference();
  applyTheme(preference);
  return preference;
}