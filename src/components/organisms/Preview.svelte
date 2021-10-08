<script lang="ts">
  import { previewEl, indicatorBounds, selectedEl, svgData } from "..//../stores";
  import { onMount } from "svelte";
  import { selectableElements } from "../../utils/SvgRules";
  import Indicator from "../molecules/Indicator.svelte";

  let container: HTMLElement;

  onMount(async () => {
    if (!$svgData) {
      throw new Error("Missing required prop 'svgData'!");
    }
    const parser = new DOMParser();
    const newEl = parser.parseFromString($svgData, "image/svg+xml").children[0];

    if (newEl.nodeName === "svg" && newEl instanceof SVGElement) {
      container.appendChild(newEl);
      previewEl.set(newEl);

      attachListeners(newEl);
    }
  });

  function attachListeners(el: SVGElement) {
    if (selectableElements.includes(el.nodeName)) {
      el.onmouseenter = handleMouseEnter;
    }
    Array.from(el.children).forEach((e) => {
      if (e instanceof SVGElement) {
        attachListeners(e);
      }
    });
  }

  function handleMouseEnter(e: MouseEvent) {
    if ($selectedEl) return;
    if (!(e.target instanceof Element)) return;

    const el: Element = e.target;

    const rect = el.getBoundingClientRect();

    $indicatorBounds = {
      x: rect.x,
      y: rect.y,
      w: rect.width,
      h: rect.height,
    };
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      $selectedEl = undefined;
      $indicatorBounds = { x: 0, y: 0, h: 0, w: 0 };
    }
  }

  function handleDoubleClick(e: MouseEvent) {
    if (!(e.target instanceof Element)) return;
    if (!$previewEl.contains(e.target)) return;

    let target: Element = e.target;
    if (!selectableElements.includes(target.nodeName)) {
      while (
        !selectableElements.includes(target.nodeName) &&
        $previewEl.contains(target)
      ) {
        target = target.parentElement;
      }
      if (!$previewEl.contains(e.target)) return;
    }

    if (!(target instanceof SVGElement)) return;

    const rect = target.getBoundingClientRect();

    $indicatorBounds = {
      x: rect.x,
      y: rect.y,
      w: rect.width,
      h: rect.height,
    };

    $selectedEl = target;
  }
</script>

<svelte:window on:keydown={handleKeydown} />
<div bind:this={container} on:dblclick={handleDoubleClick}>
  <Indicator />
</div>

<style lang="postcss">
  div {
    @apply h-full w-full p-8 flex justify-center align-middle relative;
  }
  div :global(svg) {
    @apply h-full w-auto select-none;
  }
</style>
