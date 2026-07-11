<script setup lang="ts">
import { UiBadge } from '@sonar-room/ui';
import type { ProviderConnectionStatus } from '../fixtures';

defineProps<{
  status: ProviderConnectionStatus;
}>();
</script>

<template>
  <UiBadge
    variant="outline"
    class="inline-flex items-center gap-brand-xs rounded-full px-brand-sm text-sm font-semibold"
    :class="
      status === 'connected'
        ? 'border-primary bg-background text-foreground'
        : 'border-dashed border-border bg-background text-foreground'
    "
  >
    <span
      class="size-brand-xs rounded-full"
      :class="status === 'connected' ? 'bg-primary' : 'bg-muted-foreground'"
    />
    <slot />
  </UiBadge>
</template>