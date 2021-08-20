<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import type {
    BoundBox,
    TemplateVariable,
    SVGProperty,
    SproketData,
  } from "../../types";

  import SvgList from "./SVGList.svelte";
  import DataItems from "./DataItems.svelte";
  import { blur, fly } from "svelte/transition";
  import { uploadTemplate } from "../../api";

  export let imageType;
  const selectedEl = getContext<Writable<SVGElement>>("selectedEl");
  const previewEl = getContext<Writable<SVGElement>>("previewEl");
  const links =
    getContext<Writable<Map<SVGElement, Map<SVGProperty, TemplateVariable>>>>(
      "links"
    );
  const saving = getContext<Writable<boolean>>("saving");

  async function saveOutput() {
    for (const [el, linkmap] of $links) {
      const sproketData: SproketData[] = [];
      for (const [linkType, variable] of linkmap) {
        sproketData.push({
          varPath: variable,
          type: linkType,
        });
      }
      const sproketDataString = JSON.stringify(sproketData);
      sproketDataString.replace('"', "'");
      el.setAttribute("data-sprocket", JSON.stringify(sproketData));
    }

    let svgData = $previewEl.outerHTML;
    await uploadTemplate(svgData, "sotw", "test2.svg"); 
    //TODO : figure out promise rejection issue here. It saves but then rejects
    $saving = false;
  }
</script>

{#if $saving}
  <div>Saving page</div>
  <button
    on:click={() => {
      $saving = false;
    }}>cancel</button
  >
  <button on:click={saveOutput}>Save</button>
{:else if $selectedEl}
  <div out:blur={{}} in:fly={{ y: -50 }}>
    <DataItems {imageType} />
  </div>
{:else}
  <div out:blur={{}} in:fly={{ y: -50 }}>
    <SvgList />
  </div>
{/if}
