<script setup lang="ts">
import { Pencil, RefreshCcw } from '@lucide/vue';
import { UiButton, UiCard } from '@sonar-room/ui';
import type { ProviderPresentation } from '../fixtures';
import ProviderStatusBadge from './ProviderStatusBadge.vue';

const props = defineProps<{
  provider: ProviderPresentation;
}>();
</script>

<template>
  <UiCard class="grid gap-brand p-brand provider:grid-cols-[var(--brand-size-xxl)_minmax(0,1fr)_auto] provider:items-center">
    <div class="grid size-brand-xxl place-items-center rounded-lg border border-border bg-card">
      <img :src="props.provider.logoUrl" :alt="props.provider.name" class="size-8 object-contain" />
    </div>

    <div class="grid min-w-0 gap-brand-xs">
      <div class="flex flex-wrap items-center gap-brand-sm">
        <h2 class="m-0 text-lg font-semibold tracking-tight text-foreground">{{ props.provider.name }}</h2>
        <ProviderStatusBadge :status="props.provider.status">{{ props.provider.statusLabel }}</ProviderStatusBadge>
      </div>
      <p class="m-0 text-sm leading-relaxed text-muted-foreground">{{ props.provider.description }}</p>
      <div class="flex flex-wrap gap-brand-xs">
        <span v-for="tag in props.provider.meta" :key="tag" class="rounded-full border border-border px-brand-xs py-1 text-sm text-muted-foreground">
          {{ tag }}
        </span>
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-brand-sm provider:justify-end">
      <div class="flex items-center gap-brand-xs">
        <UiButton :variant="props.provider.status === 'issue' ? 'default' : 'secondary'" size="icon" :aria-label="`Làm mới ${props.provider.name}`">
          <RefreshCcw />
        </UiButton>
        <UiButton variant="ghost" size="icon" :aria-label="`Chỉnh sửa ${props.provider.name}`">
          <Pencil />
        </UiButton>
      </div>
    </div>
  </UiCard>
</template>