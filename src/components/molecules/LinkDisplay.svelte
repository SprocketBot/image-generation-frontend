<script lang="ts">
  import type { BoundBox, PropertiesMap, SVGProperty } from "../../types";
  import { createEventDispatcher, getContext } from "svelte";
  import type { Writable } from "svelte/store";

  export let el: SVGElement;
  export let linkmap: PropertiesMap;

  const dispatch = createEventDispatcher();

  const selectedEl = getContext<Writable<SVGElement>>("selectedEl");
  const indicatorBounds = getContext<Writable<BoundBox>>("indicatorBounds");
  function selectThisElement() {
    console.log(el);
    $selectedEl = el;
    const rect = $selectedEl.getBoundingClientRect();
    $indicatorBounds = { w: rect.width, h: rect.height, x: rect.x, y: rect.y };
  }
  function clearLink() {
    dispatch("clear_link", el);
  }
  function clearProperty(property: SVGProperty) {
    dispatch("clear_prop", { el: el, prop: property });
  }
</script>

<div on:click={selectThisElement}>
  {el.id}
  <span><button on:click|stopPropagation={clearLink}>Del</button></span>
  {#if el === $selectedEl}
    {#each [...linkmap] as [property, variable]}
      <div>
        <span class="spacer" />
        <span>{property}: {variable}</span>
        <span
          ><button on:click|stopPropagation={() => clearProperty(property)}
            >Del</button
          ></span
        >
      </div>
    {/each}
  {/if}
</div>

<style lang="postcss">
  span.spacer {
    @apply pl-5;
  }
  button {
    color: red;
  }
</style>
