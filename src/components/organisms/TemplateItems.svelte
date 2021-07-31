<script lang="ts">
  import type { BoundBox } from "src/types";
  import { getContext, onMount } from "svelte";
  import type { Writable } from "svelte/store";
  import { getTemplate } from "../../api";
  import TemplateItem from "../molecules/TemplateItem.svelte";

  export let template: any;
  const selectedEl = getContext<Writable<SVGElement>>("selectedEl");
  const indicatorBounds = getContext<Writable<BoundBox>>("indicatorBounds");

  function getRelevantItems(el: SVGElement) {
    //console.log(el);
    return template;
  }
  function handleClick() {
    $indicatorBounds = { x: 0, y: 0, w: 0, h: 0 };
    $selectedEl = undefined;
  }
</script>

<button on:click={handleClick}>Finish</button>
{#if $selectedEl}
  <h1>{$selectedEl.id}</h1>
{/if}
<TemplateItem item={getRelevantItems($selectedEl)} />
