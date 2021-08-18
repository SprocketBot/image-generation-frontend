<script lang="ts">
  import type { BoundBox } from "src/types";
  import {
    applicableOperations,
    variableForOperation,
  } from "../../utils/SvgRules";
  import { getContext, onMount } from "svelte";
  import type { Writable } from "svelte/store";
  import TemplateItem from "../molecules/TemplateItem.svelte";

  export let template: any;
  const selectedEl = getContext<Writable<SVGElement>>("selectedEl");
  const indicatorBounds = getContext<Writable<BoundBox>>("indicatorBounds");

  function getRelevantItems(el: SVGElement, t = {}) {
    let subTemplate = {};
    for (const item of Object.keys(t)) {
      if (t[item].hasOwnProperty("type")) {
        //item is a leaf element. Check if it can be applied to element and add it to subtemplate
        if (
          applicableOperations[el.nodeName]
            .map((x) => variableForOperation[x])
            .includes(t[item].type)
        ) {
          subTemplate[item] = t[item];
        }
      } else {
        //not a leaf item, add children and recusively search down the tree
        subTemplate[item] = getRelevantItems(el, t[item]);
      }
    }
    //remove any children without children
    for (const item of Object.keys(subTemplate)) {
      if (Object.keys(subTemplate[item]).length == 0) {
        delete subTemplate[item];
      }
    }
    return subTemplate;
  }

  function handleClick() {
    $indicatorBounds = { x: 0, y: 0, w: 0, h: 0 };
    $selectedEl = undefined;
  }
</script>
<section>
{#if $selectedEl}
<header>
  <h3>Editing Element: <strong>{$selectedEl.id}</strong></h3>
  <button on:click={handleClick}>Finish</button>
</header>
  <TemplateItem item={getRelevantItems($selectedEl, template)} />
{/if}
</section>

<style lang="postcss">
  section {
    @apply px-4 py-4 max-w-full w-full;
  }
  header {
    @apply flex justify-between;
  }
  button {
    @apply px-2 py-1 bg-primary-500 hover:bg-primary-600 text-sproc_dark_gray-500;
  }
</style>