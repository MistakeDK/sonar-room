<script setup lang="ts">
import { computed } from 'vue';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md border font-semibold leading-none transition-colors duration-mid ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-primary bg-primary text-primary-foreground shadow-[0_2px_0_var(--brand-color-primary-bg)] hover:bg-[var(--brand-color-primary-hover)]',
        secondary: 'border-border bg-secondary text-secondary-foreground hover:bg-[var(--brand-color-fill-secondary)]',
        ghost: 'border-transparent bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground',
      },
      size: {
        default: 'h-[var(--brand-control-height-lg)] px-brand text-sm',
        sm: 'h-[var(--brand-control-height)] px-brand-sm text-xs',
        lg: 'h-[var(--brand-control-height-lg)] px-brand-lg text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

const props = withDefaults(defineProps<{
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
  type?: 'button' | 'submit' | 'reset';
  class?: string;
}>(), {
  variant: 'default',
  size: 'default',
  type: 'button',
});

const classes = computed(() => cn(buttonVariants({ variant: props.variant, size: props.size }), props.class));
</script>

<template>
  <button :type="type" :class="classes">
    <slot />
  </button>
</template>
