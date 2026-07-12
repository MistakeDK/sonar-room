<script setup lang="ts">
import { computed } from "vue";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "@lucide/vue";
import { UiButton } from "@sonar-room/ui";
import { usePlaybackSession } from "./playback-session";

const session = usePlaybackSession();
const isPlaying = computed(
  () =>
    session.state.status === "playing" || session.state.status === "buffering",
);
const duration = computed(() => Math.floor(session.state.durationSeconds));
const position = computed(() => Math.floor(session.state.positionSeconds));
const title = computed(
  () =>
    session.state.title ??
    session.state.source?.canonicalUrl ??
    "No active player",
);
const subtitle = computed(() =>
  session.state.source ? "YouTube" : "Choose a provider to start playback",
);

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0")}`;
}

function togglePlayback(): void {
  if (isPlaying.value) session.pause();
  else session.play();
}

function commitSeek(event: Event): void {
  session.seek(Number((event.target as HTMLInputElement).value));
}
</script>

<template>
  <footer
    data-od-id="global-playback-bar"
    class="bottom-0 z-30 fixed inset-x-0 items-center gap-x-4 gap-y-2 provider:gap-6 grid grid-cols-[minmax(0,1fr)_auto] provider:grid-cols-[minmax(11.25rem,1fr)_minmax(20rem,32.5rem)_minmax(11.25rem,1fr)] bg-card shadow-lg px-brand-md provider:px-brand-xl py-brand-sm provider:py-brand-md border-border border-t min-h-33 provider:min-h-26"
    aria-label="Playback controls"
  >
    <div
      data-od-id="now-playing-track"
      class="flex items-center gap-brand-md min-w-0"
      :aria-label="title"
    >
      <div
        data-od-id="track-cover"
        class="bg-muted border border-border rounded-lg size-16 overflow-hidden shrink-0"
      >
        <img
          v-if="session.state.coverUrl"
          :src="session.state.coverUrl"
          :alt="`YouTube thumbnail for ${title}`"
          class="size-full object-cover"
        />
      </div>
      <div class="gap-1 grid min-w-0">
        <p class="font-bold text-foreground text-sm truncate">{{ title }}</p>
        <p class="text-muted-foreground text-xs truncate">{{ subtitle }}</p>
      </div>
    </div>

    <div
      data-od-id="playback-controls"
      class="flex justify-center items-center gap-brand-sm col-span-2 provider:col-span-1 min-w-0"
    >
      <UiButton
        data-od-id="previous-track"
        size="icon"
        variant="outline"
        class="bg-card rounded-full size-9"
        :disabled="!session.state.capabilities.canGoPrevious"
        aria-label="Previous track"
        @click="session.previous"
      >
        <SkipBack />
      </UiButton>
      <UiButton
        data-od-id="play-pause-button"
        size="icon"
        class="rounded-full size-10"
        :disabled="!session.state.source"
        :aria-label="isPlaying ? 'Pause' : 'Play'"
        @click="togglePlayback"
      >
        <Pause v-if="isPlaying" />
        <Play v-else />
      </UiButton>
      <UiButton
        data-od-id="next-track"
        size="icon"
        variant="outline"
        class="bg-card rounded-full size-9"
        :disabled="!session.state.capabilities.canGoNext"
        aria-label="Next track"
        @click="session.next"
      >
        <SkipForward />
      </UiButton>
      <div
        data-od-id="track-seek-controls"
        class="hidden provider:flex flex-1 items-center gap-brand-xs min-w-40"
      >
        <output
          data-od-id="current-time"
          class="font-mono tabular-nums text-muted-foreground text-xs"
          >{{ formatTime(position) }}</output
        >
        <input
          data-od-id="seek-range"
          :value="position"
          type="range"
          min="0"
          :max="duration"
          class="flex-1 min-w-0 accent-primary"
          aria-label="Seek track"
          :disabled="!session.state.capabilities.canSeek"
          @change="commitSeek"
        />
        <output
          data-od-id="track-duration"
          class="font-mono tabular-nums text-muted-foreground text-xs"
          >{{ formatTime(duration) }}</output
        >
      </div>
    </div>

    <div
      data-od-id="volume-controls"
      class="flex justify-end items-center gap-brand-sm"
    >
      <UiButton
        data-od-id="volume-range"
        size="icon"
        variant="outline"
        class="bg-card rounded-full size-9"
        :aria-label="session.state.muted ? 'Unmute' : 'Mute'"
        :disabled="!session.state.source"
        @click="session.state.muted ? session.unmute() : session.mute()"
      >
        <VolumeX v-if="session.state.muted" />
        <Volume2 v-else />
      </UiButton>
      <input
        :value="session.state.volume"
        type="range"
        min="0"
        max="100"
        class="hidden provider:block w-24 accent-primary"
        aria-label="Volume"
        :disabled="!session.state.source"
        @input="
          session.setVolume(Number(($event.target as HTMLInputElement).value))
        "
      />
    </div>
  </footer>
</template>
