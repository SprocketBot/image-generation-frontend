<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import type { BoundBox } from "../../types";

  const bounds = getContext<Writable<BoundBox>>("indicatorBounds");
  const selectedEl = getContext<Writable<SVGElement>>("selectedEl");

  function onWindowResize() {
    if (!$selectedEl) {
      $bounds = {
        x: -1,
        y: -1,
        h: 0,
        w: 0,
      };
    } else {
      const rect = $selectedEl.getBoundingClientRect();

      $bounds = {
        x: rect.x,
        y: rect.y,
        w: rect.width,
        h: rect.height,
      };
    }
  }
</script>

<svelte:window on:resize={onWindowResize} />

<div
  class:hasSelection={Boolean($selectedEl)}
  style="top: {$bounds.y - 3}px; left: {$bounds.x - 3}px; width: {$bounds.w +
    6}px; height: {$bounds.h + 6}px"
/>

<style>
  div {
    position: absolute;
    border: 2px solid red;
    z-index: 100;
    pointer-events: none;
  }
  div.hasSelection {
    border-color: blue;
  }
</style>
