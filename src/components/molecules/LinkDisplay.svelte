<script lang="ts">
  import type { BoundBox, PropertiesMap, SVGProperty } from "../../types";
  import { createEventDispatcher, getContext } from "svelte";
  import { slide } from "svelte/transition";
  import type { Writable } from "svelte/store";
  import { optionOptions, optionTypes } from "../../utils/SvgRules";

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
  };
</script>

<div >
  <header class:unselected on:click={selectThisElement}>
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
            Options:
            {#each optionTypes[property] as option}
              {option}
              <select bind:value={options}>
                {#each optionOptions[option.toString()] as value}
                  <option value={value}>{value}</option>
                {/each}
              </select>
            {/each}
          </dd>
      {/each}
    </dl>
  {/if}
</div>

<style lang="postcss">
  header {
    cursor: pointer;
  }
  header.unselected {
    cursor: pointer;
  }
  select{
    cursor: pointer;
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
