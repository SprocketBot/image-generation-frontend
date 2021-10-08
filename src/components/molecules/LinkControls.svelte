<script lang="ts">
  import {selectedEl, indicatorBounds, links} from "../../stores"
  import { slide } from "svelte/transition";
  import { optionTypes } from "../../utils/SvgRules";
  import OptionDisplay from "../molecules/OptionDisplay.svelte";
  import type { SVGProperty } from "../../types";

  function selectThisElement(el) {
    if($selectedEl === el) {
      $selectedEl = undefined
    } else {
      $selectedEl = el;
      const rect = $selectedEl.getBoundingClientRect();
      $indicatorBounds = { w: rect.width, h: rect.height, x: rect.x, y: rect.y };

    }
  }
  function clearLink(el) {
    $links.delete(el);
    $links = $links;
  }
  function clearProperty(el:SVGElement, property: SVGProperty) {
    $links.get(el).delete(property);
    $links.get(el).size == 0 ? clearLink(el) : $links = $links;
  }

</script>

<section>
  {#each [...$links] as [el, linkmap]}
    <header on:click={()=>selectThisElement(el)}>
      {el.id}
      <span><button on:click|stopPropagation={()=>clearLink(el)}>Delete</button></span>
    </header>
    {#if el === $selectedEl}
      <ul transition:slide|local>
        {#each [...linkmap] as [property, data]}
          <li>
          {property} --> {linkmap.get(property).varPath}:
          <button on:click|stopPropagation={() => clearProperty(el, property)}>
            Delete
          </button>
          {#if optionTypes[property].length}
          <ul>
            <span>Options: </span>
              {#each optionTypes[property] as option}
                <li>
                  <OptionDisplay {el} {property} {option} />
                </li>
              {/each}
          </ul>
          {/if}
          </li>
        {/each}
        </ul>
    {/if}
  {/each}
</section>

<style lang="postcss">
  section {
    @apply pl-10 pt-5 select-none
  }
  header {
    @apply cursor-pointer font-bold;
  }
  ul {
    @apply font-bold pl-4;
  }
  li {
    @apply pl-8;
  }
  button {
    @apply text-red-500;
  }
</style>