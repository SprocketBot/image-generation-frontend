<script lang="ts">
  import { previewEl, saving, links} from "../../stores";
  import LinksDisplay from "../molecules/LinkDisplay.svelte";

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
