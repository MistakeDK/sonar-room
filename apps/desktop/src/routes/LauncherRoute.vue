<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { LauncherFeature } from '@sonar-room/features/launcher';
import { usePreferencesStore } from '../stores/preferences';
import type { ThemePreference } from '@sonar-room/features/app-shell';

const preferences = usePreferencesStore();
const { themePreference } = storeToRefs(preferences);

function updateThemePreference(themePreference: ThemePreference): void {
  preferences.setThemePreference(themePreference);
}
</script>

<template>
  <LauncherFeature
    :theme-preference="themePreference"
    @update:theme-preference="updateThemePreference"
  />
</template>