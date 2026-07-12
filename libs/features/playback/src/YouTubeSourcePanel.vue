<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from "vue";
import { UiButton, UiCard, UiInput } from "@sonar-room/ui";
import { usePlaybackSession } from "./playback-session";
import { parseYouTubeEmbedUrl } from "./youtube-url";

const sourceUrl = ref("");
const playerHost = ref<HTMLElement | null>(null);
const inputError = ref<string | null>(null);
const session = usePlaybackSession();
const statusMessage = computed(
  () => inputError.value ?? session.state.error?.message ?? null,
);

async function submitSource(): Promise<void> {
  const result = parseYouTubeEmbedUrl(sourceUrl.value);
  if (!result.ok) {
    inputError.value = result.error.message;
    return;
  }

  inputError.value = null;
  await nextTick();
  if (playerHost.value) await session.load(playerHost.value, result.value);
}

onBeforeUnmount(() => session.dispose());
</script>

<template>
  <UiCard
    class="gap-brand-md grid shadow-none p-brand-md"
    aria-labelledby="youtube-source-title"
  >
    <header class="gap-brand-xs grid">
      <h2
        id="youtube-source-title"
        class="m-0 font-semibold text-foreground text-lg"
      >
        YouTube
      </h2>
      <p class="m-0 text-muted-foreground text-sm">
        Paste public YouTube video or playlist URL. No account connection.
      </p>
    </header>

    <form class="flex flex-wrap gap-brand-sm" @submit.prevent="submitSource">
      <UiInput
        v-model="sourceUrl"
        type="url"
        class="flex-1 min-w-[16rem]"
        placeholder="https://www.youtube.com/watch?v=..."
        aria-describedby="youtube-source-help youtube-source-error"
        :aria-invalid="Boolean(statusMessage)"
      />
      <UiButton type="submit">Load player</UiButton>
    </form>
    <p id="youtube-source-help" class="m-0 text-muted-foreground text-xs">
      Supported: public `youtube.com` and `youtu.be` video or playlist URLs.
    </p>
    <p
      v-if="statusMessage"
      id="youtube-source-error"
      class="m-0 text-destructive text-sm"
      role="alert"
    >
      {{ statusMessage }}
    </p>

    <div
      class="-top-96 absolute bg-black border border-border rounded-lg overflow-hidden"
      aria-label="Visible YouTube player"
    >
      <div ref="playerHost" class="w-full min-h-50" />
    </div>
  </UiCard>
</template>
