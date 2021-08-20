<script lang="ts">
  import Controls from "../components/organisms/Controls.svelte";
  import Preview from "../components/organisms/Preview.svelte";
  import EditSidePanel from "../components/organisms/EditSidePanel.svelte"
  import ImageTypeSelector from "../components/organisms/ImageTypeSelector.svelte"
  import ImageSelector from "../components/organisms/ImageSelector.svelte"

  import { setContext } from "svelte";
  import type { Writable } from "svelte/store";

  import EditLayout from "../components/layouts/EditLayout.svelte";
  import {
    indicatorBounds,
    previewEl,
    selectedEl,
    links,
  } from "../stores";
  import type { BoundBox, ElementsMap } from "../types";
  import Tailwindcss from "../utils/Tailwindcss.svelte";

  let imageType;
  let svgData;
  
  setContext<Writable<SVGElement>>("previewEl", previewEl);
  setContext<Writable<BoundBox>>("indicatorBounds", indicatorBounds);
  setContext<Writable<SVGElement>>("selectedEl", selectedEl);
  setContext<Writable<ElementsMap>>("links", links);
      
</script>

<Tailwindcss />
<EditLayout>
  <div slot="preview">
    {#if svgData}
      <Preview svgData={svgData} />
    {:else}
      <ImageSelector bind:svgData/>
    {/if}
  </div>

  <div slot="controls">
    <Controls />
  </div>

  <div slot="sidePanel">
    {#if imageType}
      <EditSidePanel imageType={imageType}/>
    {:else}
      <ImageTypeSelector bind:imageType/>
    {/if}
</div>

  
</EditLayout>


<style lang="postcss">
  div {
    @apply h-full;
  }
</style>