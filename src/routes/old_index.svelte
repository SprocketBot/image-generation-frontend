<script lang="ts">
  import Controls from "$components/organisms/Controls.svelte";
  import Preview from "$components/organisms/Preview.svelte";
  import EditSidePanel from "$components/organisms/EditSidePanel.svelte";
  import ImageTypeSelector from "$components/organisms/ImageTypeSelector.svelte";
  import ImageSelector from "$components/organisms/ImageSelector.svelte";

  import EditLayout from "$components/layouts/EditLayout.svelte";
  import { svgData, imageType } from "$src/stores";



  
</script>

<EditLayout>
  <div slot="preview">
    {#if $svgData}
      <Preview/>
    {:else}
      <ImageSelector/>
    {/if}
  </div>

  <div slot="controls">
    <Controls />
  </div>

  <div slot="sidePanel">
    {#if $imageType}
      <EditSidePanel/>
    {:else}
      <ImageTypeSelector/>
    {/if}
  </div>
</EditLayout>

<style lang="postcss">
  div {
    @apply h-full relative;
  }
</style>
