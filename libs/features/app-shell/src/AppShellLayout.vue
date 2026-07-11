<script setup lang="ts">
import appLogo from "./assets/app-logo.svg";

const navigationItems = [
  {
    label: "Provider",
    routeName: "providers",
    to: "/providers",
  },
  {
    label: "Music",
    routeName: "music",
    to: "/music",
  },
] as const;
</script>

<template>
  <div
    class="grid provider:grid-cols-[var(--brand-layout-sidebar-width)_minmax(0,1fr)] bg-background min-h-screen"
  >
    <aside
      class="flex flex-col gap-brand-md bg-card px-brand py-brand-md border-border provider:border-r border-b provider:border-b-0 min-h-screen"
    >
      <div
        class="flex items-center gap-brand-sm bg-card px-brand-xs border border-border rounded-lg h-brand-xxl font-bold text-foreground text-sm"
      >
        <img
          :src="appLogo"
          alt="Music Launcher"
          class="size-brand-xl shrink-0"
        />
        <span class="truncate">Sonar room</span>
      </div>

      <nav class="gap-1.5 grid" aria-label="Main navigation">
        <RouterLink
          v-for="item in navigationItems"
          :key="item.routeName"
          :to="item.to"
          class="flex items-center gap-brand-sm px-brand-sm border rounded-lg h-control-lg text-sm text-left"
          :class="
            $route.name === item.routeName
              ? 'border-primary bg-primary font-bold text-primary-foreground'
              : 'border-transparent bg-transparent text-muted-foreground'
          "
          :aria-current="$route.name === item.routeName ? 'page' : undefined"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </aside>

    <main class="p-brand-md provider:p-brand-xl min-w-0">
      <RouterView />
    </main>
  </div>
</template>
