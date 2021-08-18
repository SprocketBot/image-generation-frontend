<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
import { uploadTemplate } from "../../api";
  import type {
    BoundBox,
    TemplateVariable,
    SVGProperty,
    SproketData,
  } from "../../types";
  import LinksDisplay from "../molecules/LinkDisplay.svelte";

  const selectedEl = getContext<Writable<SVGElement>>("selectedEl");
  const previewEl = getContext<Writable<SVGElement>>("previewEl");
  const links =
    getContext<Writable<Map<SVGElement, Map<SVGProperty, TemplateVariable>>>>(
      "links"
    );

  $: {
    console.log($links);
  }

  function clearLink(event) {
    console.log(event);
    $links.delete(event.detail);
    $links = $links;
  }
  function clearProp(event) {
    console.log(event.detail);
    $links.get(event.detail.el).delete(event.detail.prop);
    $links = $links;
  }
  async function finish() {
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
      console.log(sproketDataString);
      el.setAttribute("data-sprocket", JSON.stringify(sproketData));
    }

    let svgData = $previewEl.outerHTML;
    await uploadTemplate(svgData, "sotw", "test.svg")
  }
</script>

<section class="controls">
  <header>
    <h3>Dynamic Values</h3>
    <span class="spacer" />
    <button>Test</button>
    <button on:click={finish}>Done</button>
  </header>
  <section>
    {#each [...$links] as [el, linkmap]}
      <LinksDisplay
        on:clear_link={clearLink}
        on:clear_prop={clearProp}
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
    @apply pl-10;
  }
  .unconfirmed {
    @apply text-gray-500;
  }
  .delete {
    @apply text-red-500;
  }
</style>
