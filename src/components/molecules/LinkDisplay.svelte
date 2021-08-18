<script lang="ts">
  import type { BoundBox, PropertiesMap, SVGProperty } from "../../types";
  import { createEventDispatcher, getContext } from "svelte";
  import { slide } from "svelte/transition";
  import type { Writable } from "svelte/store";

  export let el: SVGElement;
  export let linkmap: PropertiesMap;

  const dispatch = createEventDispatcher();

  const selectedEl = getContext<Writable<SVGElement>>("selectedEl");
  const indicatorBounds = getContext<Writable<BoundBox>>("indicatorBounds");
  function selectThisElement() {
    if($selectedEl === el) {
      $selectedEl = undefined
    } else {
      $selectedEl = el;
      const rect = $selectedEl.getBoundingClientRect();
      $indicatorBounds = { w: rect.width, h: rect.height, x: rect.x, y: rect.y };

    }
  }
  function clearLink() {
    dispatch("clear_link", el);
  }
  function clearProperty(property: SVGProperty) {
    dispatch("clear_prop", { el: el, prop: property });
  }
  let unselected = true;
  $: unselected = el === $selectedEl;

  let options: any = {
    text: {},
    stroke: {},
    fill: {},
  };
</script>

<div class:unselected>
  <header on:click={selectThisElement}>
    {el.id}
    <span><button on:click|stopPropagation={clearLink}>Delete</button></span>
  </header>
  
  {#if el === $selectedEl}
    <dl transition:slide>
      {#each [...linkmap] as [property, variable]}
        <dt>
          {property}:
        </dt>
          <dd>
            <span>{variable}</span>
            <button on:click|stopPropagation={() => clearProperty(property)}>
              Delete
            </button>

            {#if property === "text"}
              <select bind:value={options.text.align}>
                <option value="">Do not change</option>
                <option value="center">Center</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            {:else if property === "fill"}
              <label>
                Fill with cool stuff?
                <input type="checkbox" bind:checked={options.fill.isCool} />
              </label>
            {/if}
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
    @apply pl-8;
  }
  span.spacer {
    @apply pl-5;
  }
  button {
    @apply text-red-500;
  }
</style>
