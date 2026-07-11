<script setup lang="ts">
import { UiButton } from '@sonar-room/ui';

withDefaults(defineProps<{
  active?: boolean;
  count?: number;
}>(), {
  active: false,
});
</script>

<template>
  <UiButton
    :variant="active ? 'default' : 'outline'"
    size="sm"
    role="tab"
    :aria-selected="active"
    class="min-h-control rounded-full px-brand-sm"
  >
    <slot />
    <span
      v-if="count !== undefined"
      class="inline-flex size-brand-md items-center justify-center rounded-full border border-current font-mono text-xs"
    >
      {{ count }}
    </span>
  </UiButton>
</template>