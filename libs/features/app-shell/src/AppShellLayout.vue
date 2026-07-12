<script setup lang="ts">
import appLogo from "./assets/app-logo.svg";
import { GlobalPlaybackBar } from "@sonar-room/features/playback";

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
    class="grid min-h-screen bg-background provider:grid-cols-[var(--brand-layout-sidebar-width)_minmax(0,1fr)]"
  >
    <aside
      class="flex min-h-screen flex-col gap-brand-md border-b border-border bg-card px-brand py-brand-md provider:border-r provider:border-b-0"
    >
      <div
        class="flex h-brand-xxl items-center gap-brand-sm rounded-lg border border-border bg-card px-brand-xs text-sm font-bold text-foreground"
      >
        <img
          :src="appLogo"
          alt="Music Launcher"
          class="size-brand-xl shrink-0"
        >
        <span class="truncate">Sonar room</span>
      </div>

      <nav class="grid gap-1.5" aria-label="Main navigation">
        <RouterLink
          v-for="item in navigationItems"
          :key="item.routeName"
          :to="item.to"
          class="flex h-control-lg items-center gap-brand-sm rounded-lg border px-brand-sm text-left text-sm"
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

    <main class="min-h-screen min-w-0 p-brand-md pb-[8.25rem] provider:p-brand-xl provider:pb-[6.5rem]">
      <RouterView />
    </main>
  </div>
  <GlobalPlaybackBar />
</template>
