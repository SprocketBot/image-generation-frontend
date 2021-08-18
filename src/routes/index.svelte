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

  let files;
  onMount(async () => {
    if (!source || !templateName) {
      throw new Error("missing a prop for the layout");
    }
  });

  async function handleUpload(){
    if(files?.[0]){
      const reader = new FileReader();
      reader.readAsText(files[0])
      reader.onloadend = e => {
        $svgData = e.target.result.toString();
      }
      
    }
    else{
      $svgData = await fetch(source).then((r) => r.text());
    }
  }
  async function handleImageType(){
    $template = await getTemplate(templateName);
  }
</script>

<Tailwindcss />
<EditLayout>
  <div slot="preview">
    {#if $svgData}
      <Preview svgData={$svgData} />
    {:else}
      <input type="file" id="upload" bind:files>
      <button on:click={handleUpload}>
        {#if files?.[0]}
          Go!
        {:else}
          Use tech demo
        {/if}
      </button>
    {/if}
  </div>

  <div slot="controls">
    <Controls />
  </div>

  <div slot="sidePanel">
    {#if $template}
      {#if $selectedEl}
        <div out:blur={{}} in:fly={{ y: -50 }}>
          <TemplateItems template={$template}/>
        </div>
        
      {:else}
        <div out:blur={{}} in:fly={{ y: -50 }}>
          <SvgList />
        </div>
      {/if}
    {:else}
        <button on:click={handleImageType}>Select an Image Type</button>
    {/if}
</div>

  
</EditLayout>


<style lang="postcss">
  div {
    @apply h-full;
  }
</style>