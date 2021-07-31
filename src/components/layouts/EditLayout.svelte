<script lang="ts">
  import Controls from "../organisms/Controls.svelte";
  import Preview from "../organisms/Preview.svelte";
  import SvgList from "../organisms/SVGList.svelte";
  import TemplateItems from "../organisms/TemplateItems.svelte";
  // import TemplateItem from "../molecules/TemplateItem.svelte";
  import { getContext, onMount } from "svelte";
  import type { Writable } from "svelte/store";
  import { fly } from "svelte/transition";
  import { getTemplate } from "../../api";

  export let source: string;
  export let templateName: string;

  const selectedEl = getContext<Writable<SVGElement>>("selectedEl");
  const template = getContext<Writable<any>>("template");
  const svgData = getContext<Writable<string>>("svgData");

  let ready = false;
  onMount(async () => {
    if (!source || !templateName) {
      throw new Error("missing a prop for the layout");
    }
    // [$svgData, $template] = await Promise.all([
    //   fetch(source).then((r) => r.text()),
    //   getTemplate(templateName),
    // ])
    $svgData = await fetch(source).then((r) => r.text());
    $template = await getTemplate(templateName);

    ready = true;
  });
</script>

<main>
  <section class="preview">
    <slot name="preview">
      {#if ready}
        <Preview svgData={$svgData} />
      {:else}
        <h1>Fetching image</h1>
      {/if}
      <!-- <Preview source="/img/techdemo_figma.svg" /> -->
    </slot>
  </section>
  <section class="controls">
    <Controls />
  </section>

  {#if $selectedEl}
    <aside class="fields" transition:fly={{ x: 250, opacity: 1 }}>
      <slot name="fields">
        {#if ready}
          <TemplateItems template={$template} />
        {/if}
      </slot>
    </aside>
  {:else}
    <aside class="previewEls">
      <slot name="previewEls">
        <SvgList />
      </slot>
    </aside>
  {/if}
</main>

<style lang="postcss">
  main {
    @apply h-screen max-h-screen w-screen
               grid grid-cols-6 grid-rows-6;

    /* grid-template-columns: auto 30rem;
        grid-template-rows: auto 30rem;
        grid-template-areas: 
            "preview els"
            "controls fields"; */
  }
  main * {
    @apply h-full max-h-full min-h-full 
               w-full max-w-full min-w-full;
  }
  .preview {
    @apply bg-gray-50 col-start-1 
                col-span-4 row-start-1 row-span-4;
    /* grid-area: preview; */
  }
  .controls {
    @apply bg-gray-200 border-t-2 border-gray-800
                col-span-4 col-start-1 row-start-5 row-span-2;
    /* grid-area: controls; */
  }
  .previewEls {
    @apply bg-gray-200 border-l-2 border-gray-800
                col-span-2 col-start-5 row-start-1 row-span-6;
    /* grid-area: els; */
  }
  .fields {
    @apply bg-gray-200 border-l-2 border-t-2 border-gray-800
                col-span-2 col-start-5 row-start-1 row-span-6;

    /* grid-area: fields; */
  }
</style>
