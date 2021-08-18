<script lang="ts">
  import Controls from "../components/organisms/Controls.svelte";
  import Preview from "../components/organisms/Preview.svelte";
  import SvgList from "../components/organisms/SVGList.svelte";
  import TemplateItems from "../components/organisms/TemplateItems.svelte";

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
  import { getTemplate } from "../api";
  import {blur, fly} from 'svelte/transition'

  setContext<Writable<SVGElement>>("previewEl", previewEl);
  setContext<Writable<BoundBox>>("indicatorBounds", indicatorBounds);
  setContext<Writable<SVGElement>>("selectedEl", selectedEl);
  setContext<Writable<any>>("template", template);
  setContext<Writable<ElementsMap>>("links", links);
  setContext<Writable<string>>("svgData", svgData);

  export let source: string = `/static/img/techdemo_figma.svg`;
  export let templateName: string = `Star of the week`;

  let ready = false;
  onMount(async () => {
    if (!source || !templateName) {
      throw new Error("missing a prop for the layout");
    }
    $svgData = await fetch(source).then((r) => r.text());
    $template = await getTemplate(templateName);

    ready = true;
  });
</script>

<Tailwindcss />
<EditLayout>
  <div slot="preview">
    {#if ready}
      <Preview svgData={$svgData} />
    {:else}
      <h1>Fetching image</h1>
    {/if}
  </div>

  <div slot="controls">
    <Controls />
  </div>

  <div slot="sidePanel">
    {#if $selectedEl}
      <div out:blur={{}} in:fly={{ y: -50 }}>
        <TemplateItems template={$template}/>
      </div>
      
    {:else}
      <div out:blur={{}} in:fly={{ y: -50 }}>
        <SvgList />
      </div>
    {/if}
</div>

  
</EditLayout>


<style lang="postcss">
  div {
    @apply h-full;
  }
</style>