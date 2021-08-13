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

  let selectedProperty: SVGProperty | undefined = undefined;

  function selectProperty(select: SVGProperty) {
    if (selectedProperty === select) {
      selectedProperty = undefined;
    } else {
      selectedProperty = select;
    }
  }

  let options: any = {
    text: {},
    stroke: {},
    fill: {},
  };
  $: console.log(options);
</script>

<div on:click={selectThisElement} class:unselected>
  {el.id}
  <span><button on:click|stopPropagation={clearLink}>Delete</button></span>
  {#if el === $selectedEl}
    <dl>
      {#each [...linkmap] as [property, variable]}
        <dt on:click={() => selectProperty(property)}>
          {property}:
        </dt>
        {#if selectedProperty === property}
          <dd transition:slide>
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
        {/if}
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
    @apply font-bold pl-4 cursor-pointer;
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
