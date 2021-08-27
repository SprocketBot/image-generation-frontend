<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import type {
  ElementsMap,
  } from "../../types";
  import LinksDisplay from "../molecules/LinkDisplay.svelte";

  const previewEl = getContext<Writable<SVGElement>>("previewEl");
  const saving = getContext<Writable<boolean>>("saving");
  const links = getContext<Writable<ElementsMap>>("links");
  function clearLink(event) {
    $links.delete(event.detail);
    $links = $links;
  }
  function clearProp(event) {
    $links.get(event.detail.el).delete(event.detail.prop);
    $links = $links;
  }
  function finish() {
    $saving = true;
  }
</script>

<section class="controls">
  <header>
    <h3>Dynamic Values</h3>
    <span class="spacer" />
    {#if $previewEl && !$saving}
      <button>Test</button>
      <button on:click={finish}>Done</button>
    {/if}
  </header>
  <section>
    {#each [...$links] as [el, linkmap]}
      <LinksDisplay
        on:clear_link={clearLink}
        on:clear_prop={clearProp}
        {el}
        {linkmap}
      />
    {/each}
  </section>
</section>

<style lang="postcss">
  section.controls {
    @apply h-full;
  }
  section > header {
    @apply border-b-2 border-sproc_dark_gray-800 flex items-center px-10;
  }
  section > header > h3 {
    @apply text-lg font-bold;
  }
  section > header > .spacer {
    @apply flex-1;
  }
  section > header > button {
    @apply px-2 py-1 bg-primary-500 hover:bg-primary-600 ml-4 text-sproc_dark_gray-500;
  }
  section > section {
    @apply pl-10 select-none;
  }
</style>
