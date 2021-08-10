<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import type { BoundBox, TemplateVariable, SVGProperty } from "../../types";
  import LinksDisplay from "../molecules/LinkDisplay.svelte";

  const selectedEl = getContext<Writable<SVGElement>>("selectedEl");
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
</script>

<section>
  <!-- <div> -->
  <div>
    Links
    <button>Test</button>
    <button>Done</button>
  </div>
  {#each [...$links] as [el, linkmap]}
    <LinksDisplay
      on:clear_link={clearLink}
      on:clear_prop={clearProp}
      {el}
      {linkmap}
    />
  {/each}
  <!-- </div> -->
</section>

<style lang="postcss">
  section {
    height: 100%;
    /* display: grid; */
    /* grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr; */
  }
  section div:first-child {
    @apply border-b-2 border-gray-600;
  }
  .unconfirmed {
    @apply text-gray-500;
  }
  .delete {
    @apply text-red-500;
  }
  /* .edit {
    @apply text-yellow-500;
  } */
</style>
