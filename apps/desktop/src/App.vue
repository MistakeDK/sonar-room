<script setup lang="ts">
import { UiBadge, UiButton, UiCard } from '@sonar-room/ui';
import { APP_CONFIG } from './config/appConfig';

const platforms = APP_CONFIG.supportedPlatforms;
</script>

<template>
  <main class="shell sr-ui-theme">
    <section class="hero" aria-labelledby="app-title">
      <UiBadge variant="outline">Phase 1 desktop launcher</UiBadge>
      <h1 id="app-title">{{ APP_CONFIG.productName }}</h1>
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
        <li v-for="platform in platforms" :key="platform.id">
          <span>{{ platform.name }}</span>
          <small>{{ platform.launchMode }}</small>
        </li>
      </ul>
    </UiCard>
  </main>
</template>
