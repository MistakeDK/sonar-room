<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '../lib/cn';

const props = defineProps<{
  class?: string;
}>();

const classes = computed(() => cn('rounded-[calc(var(--radius)+0.5rem)] border border-border/90 bg-card/70 text-card-foreground shadow-elevated backdrop-blur-lg', props.class));
</script>

<template>
  <section :class="classes">
    <slot />
  </section>
</template>
