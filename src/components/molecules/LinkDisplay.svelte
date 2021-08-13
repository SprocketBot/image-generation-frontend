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
  let unselected = true;
  $: unselected = el === $selectedEl;
</script>

<div on:click={selectThisElement} class:unselected>
  {el.id}
  <span><button on:click|stopPropagation={clearLink}>Delete</button></span>
  {#if el === $selectedEl}
  <dl>
    {#each [...linkmap] as [property, variable]}
      <dt>
        {property}:
      </dt>
      <dd>
        <span>{variable}</span>
        <button on:click|stopPropagation={() => clearProperty(property)}>
          Delete
        </button>
      </dd>
    {/each}
  </dl>
  {/if}
</div>

<style lang="postcss">
  div {
    cursor: pointer;
  }
  div.unselected {
    cursor: default;
  }
  dt {
    @apply font-bold pl-4;
  }
  dd {
    @apply pl-8
  }
  span.spacer {
    @apply pl-5;
  }
  button {
    color: red;
  }
</style>
