<script lang="ts">
  import { WorkState } from "$src/types";
  import LinkControls from "$components/molecules/LinkControls.svelte";
  import { previewEl, workstate} from "$src/stores";
  import FontControls from "$components/molecules/FontControls.svelte";
  import SaveControls from "$components/organisms/SaveControls.svelte";
</script>

<section class="controls">
  <header>
    <h3 on:click={()=>$workstate = WorkState.Linking} class={$workstate === WorkState.Linking ? "selected" : ""}>Assign Values</h3>
    <h3 on:click={()=>$workstate = WorkState.Fonts} class={$workstate === WorkState.Fonts ? "selected" : ""}>Upload Font Files</h3>
    <h3 on:click={()=>$workstate = WorkState.Saving} class={$workstate === WorkState.Saving ? "selected" : ""}>Save Image</h3>
    <span class="spacer" />
    {#if $previewEl && $workstate!==WorkState.Saving}
      <button>Test</button>
    {/if}
  </header>
  {#if $workstate === WorkState.Linking}
    <LinkControls />
  {:else if $workstate === WorkState.Fonts}
    <FontControls />
  {:else}
    <SaveControls />
  {/if}
</section>

<style lang="postcss">
  section.controls {
    @apply h-full;
  }
  section > header {
    @apply border-b-2 border-sproc_dark_gray-800 flex items-center px-10;
  }
  section > header .selected {
    @apply  bg-primary-500 text-sproc_light_gray-800 cursor-pointer;
  }
  section > header > h3 {
    @apply font-bold text-lg mx-1 p-1 text-sproc_light_gray-50 rounded-t-xl hover:bg-primary-700 cursor-pointer px-5;
  }
  section > header > .spacer {
    @apply flex-1;
  }
  section > header > button {
    @apply px-2 py-1 bg-primary-500 hover:bg-primary-600 ml-4 text-sproc_dark_gray-500;
  }
</style>
