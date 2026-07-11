<script setup lang="ts">
import { Search } from '@lucide/vue';
import { UiButton, UiCard, UiInput } from '@sonar-room/ui';
import ProviderFilterChip from './ProviderFilterChip.vue';
</script>

<template>
  <UiCard class="grid gap-brand-sm p-brand-sm shadow-none">
    <div class="grid gap-brand-sm provider:grid-cols-[minmax(var(--brand-layout-filter-min-width),1fr)_auto] provider:items-center">
      <UiInput type="search" aria-label="Tìm provider" placeholder="Tìm provider..." />
      <UiButton variant="ghost" size="icon" aria-label="Tìm provider">
        <Search />
      </UiButton>
    </div>
    <div class="flex flex-wrap gap-brand-xs" role="tablist" aria-label="Lọc provider theo trạng thái">
      <ProviderFilterChip :active="true" :count="3">Tất cả</ProviderFilterChip>
      <ProviderFilterChip :count="2">Kết nối</ProviderFilterChip>
      <ProviderFilterChip :count="1">Mất kết nối</ProviderFilterChip>
    </div>
  </UiCard>
</template>