<script setup lang="ts">
import { UiBadge, UiButton, UiCard } from '@sonar-room/ui';
import type { ThemePreference } from '@sonar-room/features/app-shell';
import { LAUNCHER_CONFIG } from './config';

const props = defineProps<{
  themePreference: ThemePreference;
}>();

const emit = defineEmits<{
  'update:themePreference': [themePreference: ThemePreference];
}>();

function updateThemePreference(event: Event): void {
  emit('update:themePreference', (event.target as HTMLSelectElement).value as ThemePreference);
}
</script>

<template>
  <main class="shell sr-ui-theme">
    <header class="flex items-center justify-between gap-brand-md border-b border-border px-brand-lg py-brand-md">
      <RouterLink class="font-semibold text-foreground no-underline" :to="{ name: 'launcher' }">
        {{ LAUNCHER_CONFIG.productName }}
      </RouterLink>
      <label class="flex items-center gap-brand-sm text-sm text-muted-foreground" for="theme-preference">
        Theme
        <select
          id="theme-preference"
          class="rounded-md border border-border bg-card px-brand-sm py-brand-xs text-foreground"
          :value="props.themePreference"
          @change="updateThemePreference"
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
    </header>

    <section class="hero" aria-labelledby="app-title">
      <UiBadge variant="outline">Phase 1 desktop launcher</UiBadge>
      <h1 id="app-title">{{ LAUNCHER_CONFIG.productName }}</h1>
      <p class="summary">
        One local desktop surface for opening supported music platforms without
        replacing their catalogs or playback contracts.
      </p>
      <div class="hero-actions" aria-label="Launcher actions">
        <UiButton size="lg">Start setup</UiButton>
        <UiButton variant="ghost" size="lg">View integrations</UiButton>
      </div>
    </section>

    <UiCard class="panel" aria-labelledby="platforms-title">
      <div class="panel-heading">
        <h2 id="platforms-title">Supported platforms</h2>
        <UiBadge variant="secondary">Pending stories</UiBadge>
      </div>
      <ul class="platforms">
        <li v-for="platform in LAUNCHER_CONFIG.supportedPlatforms" :key="platform.id">
          <span>{{ platform.name }}</span>
          <small>{{ platform.launchMode }}</small>
        </li>
      </ul>
    </UiCard>
  </main>
</template>