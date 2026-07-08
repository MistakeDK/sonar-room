<script setup lang="ts">
import { computed } from 'vue';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const badgeVariants = cva('inline-flex w-fit items-center rounded-full border border-transparent px-3 py-1 text-xs font-extrabold uppercase leading-none tracking-widest', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      outline: 'border-border bg-transparent text-foreground',
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
