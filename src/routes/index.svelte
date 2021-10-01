<script lang="ts">
  import Controls from "../components/organisms/Controls.svelte";
  import Preview from "../components/organisms/Preview.svelte";
  import EditSidePanel from "../components/organisms/EditSidePanel.svelte";
  import ImageTypeSelector from "../components/organisms/ImageTypeSelector.svelte";
  import ImageSelector from "../components/organisms/ImageSelector.svelte";

  import { onDestroy, setContext } from "svelte";
  import type { Writable } from "svelte/store";

  import EditLayout from "../components/layouts/EditLayout.svelte";
  import {
    indicatorBounds,
    previewEl,
    selectedEl,
    links,
    saving,
    imageTypeId,
    fontElements,
  } from "../stores";
  import type { BoundBox, ElementsMap } from "../types";

  let imageType;
  let svgData;

  setContext<Writable<SVGElement>>("previewEl", previewEl);
  setContext<Writable<BoundBox>>("indicatorBounds", indicatorBounds);
  setContext<Writable<SVGElement>>("selectedEl", selectedEl);
  setContext<Writable<ElementsMap>>("links", links);
  setContext<Writable<boolean>>("saving", saving);
  setContext<Writable<string>>("imageTypeId", imageTypeId);
  setContext<Writable<Map<string, Element>>>("fontElements", fontElements);
  

  onDestroy(async () => {
    $previewEl = undefined;
    $selectedEl = undefined;
    $indicatorBounds = {x:0, y:0, h:0, w:0}
    $links.clear();
    $fontElements.clear();
    $saving = false;
  })
</script>

<EditLayout>
  <div slot="preview">
    {#if svgData}
      <Preview {svgData} />
    {:else}
      <ImageSelector bind:svgData />
    {/if}
  </div>

  <div slot="controls">
    <Controls />
  </div>

  <div slot="sidePanel">
    {#if imageType}
      <EditSidePanel {imageType}/>
    {:else}
      <ImageTypeSelector bind:imageType/>
    {/if}
  </div>
</EditLayout>

<style lang="postcss">
  div {
    @apply h-full relative;
  }
</style>
