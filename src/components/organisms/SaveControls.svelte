<script lang="ts">
  import type { ElementsMap, SprocketData } from "src/types";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  import { uploadTemplate } from "../../api";

  const links = getContext<Writable<ElementsMap>>("links")
  const saving = getContext<Writable<boolean>>("saving");
  const previewEl = getContext<Writable<SVGElement>>("previewEl");
  const fontSet = getContext<Writable<Set<string>>>("fontSet")


  async function saveOutput() { 
    for (const [el, linkmap] of $links) {
      const sproketData: SprocketData[] = [];
      for (const [linkType, data] of linkmap) {
        sproketData.push({
          varPath: data.varPath,
          options: data.options,
          type: linkType,
        });
      }
      const sproketDataString = JSON.stringify(sproketData);
      sproketDataString.replace('"', "'");
      el.setAttribute("data-sprocket", JSON.stringify(sproketData));
    }

    let svgData = $previewEl.outerHTML;
    await uploadTemplate(svgData, "sotw", "test2.svg");
    $saving = false;
  }
</script>


<div>Saving page</div>
  <button
    on:click={() => {
      $saving = false;
    }}>cancel</button
  >
  
  <button on:click={saveOutput}>Save</button>

{#each [...$fontSet] as font}
  {font}
{/each}