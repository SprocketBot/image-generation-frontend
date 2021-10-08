<script lang="ts">
  import type { PropertiesMap, SVGProperty } from "../../types";
  import {selectedEl, indicatorBounds, links} from "../../stores"
  import { slide } from "svelte/transition";
  import { optionTypes } from "../../utils/SvgRules";
  import OptionDisplay from "./OptionDisplay.svelte";

  export let el: SVGElement;
  export let linkmap: PropertiesMap;
  
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
    $links.delete(el);
    $links = $links;
  }
  function clearProperty(property: SVGProperty) {
    $links.get(el).delete(property);
    $links.get(el).size == 0 ? clearLink() : $links = $links;
  }
  let unselected = true;
  $: unselected = el === $selectedEl;

</script>

<div >
  <header class:unselected on:click={selectThisElement}>
    {el.id}
    <span><button on:click|stopPropagation={clearLink}>Delete</button></span>
  </header>
  
  {#if el === $selectedEl}
    <dl transition:slide|local>
      {#each [...linkmap] as [property, data]}
        <dt>
          {property}:
          <button on:click|stopPropagation={() => clearProperty(property)}>
            Delete
          </button>
        </dt>
          <dd>
            <span>{data.type}</span>
            {#if optionTypes[property].length}
              <dl>
                <dt>Options:</dt>
                <dd>
                  {#each optionTypes[property] as option}
                    <OptionDisplay {el} {property} {option} />
                  {/each}
                </dd>
              </dl>
            {/if}
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
