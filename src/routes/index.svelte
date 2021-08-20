<script lang="ts">
  import Controls from "../components/organisms/Controls.svelte";
  import Preview from "../components/organisms/Preview.svelte";
  import EditSidePanel from "../components/organisms/EditSidePanel.svelte"
  import ImageTypeSelector from "../components/organisms/ImageTypeSelector.svelte"
  import ImageSelector from "../components/organisms/ImageSelector.svelte"

  import { onMount, setContext } from "svelte";
  import type { Writable } from "svelte/store";

  import EditLayout from "../components/layouts/EditLayout.svelte";
  import {
    indicatorBounds,
    previewEl,
    selectedEl,
    template,
    links,
    svgData,
  } from "../stores";
  import type { BoundBox, ElementsMap } from "../types";
  import Tailwindcss from "../utils/Tailwindcss.svelte";

  setContext<Writable<SVGElement>>("previewEl", previewEl);
  setContext<Writable<BoundBox>>("indicatorBounds", indicatorBounds);
  setContext<Writable<SVGElement>>("selectedEl", selectedEl);
  setContext<Writable<any>>("template", template);
  setContext<Writable<ElementsMap>>("links", links);
  setContext<Writable<string>>("svgData", svgData); 
  
</script>

<Tailwindcss />
<EditLayout>
  <div slot="preview">
    {#if $svgData}
      <Preview svgData={$svgData} />
    {:else}
      <ImageSelector />
    {/if}
  </div>

  <div slot="controls">
    <Controls />
  </div>

  <div slot="sidePanel">
    {#if $template}
      <EditSidePanel template={$template}/>
    {:else}
      <ImageTypeSelector />
    {/if}
</div>

  
</EditLayout>


<style lang="postcss">
  div {
    @apply h-full;
  }
</style>