<script lang="ts">
  import { fly } from "svelte/transition";

  const { srcs, card_display_classes }: { srcs: Array<string> } = $props();

  const swap_duration = 500;
  const swap_distance = 500;

  let curr_vid = $state(0);
  let innerWidth;
</script>

{#if srcs.length === 1}
  <video
    src={srcs[0]}
    autoplay
    muted
    disablepictureinpicture
    loop
    class="max-h-40 border-2 rounded-xl m-auto mb-3 bg-white"
  ></video>
{:else}
  <div class="grid">
    {#key curr_vid}
      <video
        in:fly={{ duration: swap_duration, x: -swap_distance }}
        out:fly={{
          duration: swap_duration,
          x: swap_distance,
        }}
        src={srcs[curr_vid]}
        autoplay
        muted
        disablepictureinpicture
        onended={() => {
          curr_vid = (curr_vid + 1) % srcs.length;
        }}
        class="max-h-40 border-2 rounded-xl m-auto mb-3 col-start-1 row-start-1 bg-white"
      ></video>
    {/key}
  </div>
{/if}

<svelte:window bind:innerWidth />
