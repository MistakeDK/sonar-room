<script setup lang="ts">
import ProviderCard from "./components/ProviderCard.vue";
import ProviderFilterPanel from "./components/ProviderFilterPanel.vue";
import { PROVIDER_FIXTURES } from "./fixtures";
import { YouTubeSourcePanel } from "@sonar-room/features/playback";
</script>

<template>
  <section
    class="gap-brand-md grid"
    aria-labelledby="provider-management-title"
  >
    <h1 id="provider-management-title" class="sr-only">Quáº£n lÃ½ provider</h1>
    <ProviderFilterPanel />
    <YouTubeSourcePanel />

    <section class="gap-brand-sm grid" aria-label="Danh sÃ¡ch provider">
      <ProviderCard
        v-for="provider in PROVIDER_FIXTURES"
        :key="provider.id"
        :provider="provider"
      />
    </section>
  </section>
</template>
