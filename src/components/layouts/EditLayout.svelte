<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import { blur, fly } from "svelte/transition";

  const selectedEl = getContext<Writable<SVGElement>>("selectedEl");

</script>

<main>
  <section class="preview">
    <slot name="preview"/>
  </section>

  <section class="controls">
    <slot name="controls"/>
  </section>

  {#if $selectedEl}
    <aside class="fields" out:blur={{ duration: 250 }} in:fly={{x: 250, duration: 250}}>
      <slot name="fields"/>
    </aside>
  {:else}
    <aside class="previewEls" out:blur={{ duration: 250 }} in:fly={{x: 250, duration: 250}}>
      <slot name="previewEls"/>
    </aside>
  {/if}
</main>

<style lang="postcss">
  main {
    @apply h-screen max-h-screen w-screen
               grid grid-cols-6 grid-rows-6 text-gray-100;
  }
  main * {
    @apply h-full max-h-full min-h-full 
               w-full max-w-full min-w-full;
  }
  .preview {
    @apply bg-sproc_dark_gray-300 col-start-1 
                col-span-4 row-start-1 row-span-4;
  }
  .controls {
    @apply bg-sproc_light_gray-800 border-t-2 border-sproc_dark_gray-800
                col-span-4 col-start-1 row-start-5 row-span-2;
  }
  .previewEls {
    @apply bg-sproc_light_gray-800 border-l-2 border-sproc_dark_gray-800
                col-span-2 col-start-5 row-start-1 row-span-6;
  }
  .fields {
    @apply bg-sproc_light_gray-800 border-l-2 border-t-2 border-sproc_dark_gray-800
                col-span-2 col-start-5 row-start-1 row-span-6;
  }
</style>
