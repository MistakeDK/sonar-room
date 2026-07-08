<script setup lang="ts">
import { computed } from 'vue';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const badgeVariants = cva('inline-flex w-fit items-center rounded-sm border px-brand-sm py-1 text-xs font-semibold leading-none transition-colors duration-mid', {
  variants: {
    variant: {
      default: 'border-primary bg-[var(--brand-color-primary-bg)] text-[var(--brand-color-primary-text)]',
      secondary: 'border-border bg-secondary text-secondary-foreground',
      outline: 'border-border bg-transparent text-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type BadgeVariants = VariantProps<typeof badgeVariants>;

const props = withDefaults(defineProps<{
  variant?: BadgeVariants['variant'];
  class?: string;
}>(), {
  variant: 'default',
});

const classes = computed(() => cn(badgeVariants({ variant: props.variant }), props.class));
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>
