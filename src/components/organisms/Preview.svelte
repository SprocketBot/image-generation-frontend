<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { Writable } from "svelte/store";
  import type { BoundBox } from "../../types";
  import { selectableElements } from "../../utils/SvgRules";
  import Indicator from "../molecules/Indicator.svelte";

  export let source: string = undefined;
  let container: HTMLElement;
  let svgElement: SVGElement;
  const previewEl = getContext<Writable<SVGElement>>("previewEl");
  const indicatorBounds = getContext<Writable<BoundBox>>("indicatorBounds");
  const selectedEl = getContext<Writable<SVGElement>>("selectedEl");

  onMount(async () => {
    if (!source) {
      throw new Error("Missing required prop 'source'!");
    }
    const data = await fetch(source).then((r) => r.text());
    const parser = new DOMParser();
    const newEl = parser.parseFromString(data, "image/svg+xml").children[0];

    if (newEl.nodeName === "svg" && newEl instanceof SVGElement) {
      newEl.setAttribute("preserveAspectRatio", "xMinYMin");
      container.appendChild(newEl);
      console.log(previewEl);
      previewEl.set(newEl);

      attachListeners(newEl);
      console.log(newEl.children);
    }
  });

  function attachListeners(el: SVGElement) {
    if (selectableElements.includes(el.nodeName)) {
      const rect = el.getBoundingClientRect();
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

  function handleMousedown(e: MouseEvent) {
    if ($selectedEl) {
      if (!(e.target instanceof SVGElement)) {
        $indicatorBounds = {
          x: 0,
          y: 0,
          w: 0,
          h: 0,
        };
      }
    } else {
      $selectedEl;
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    console.log($selectedEl);
    if (e.key === "Escape") {
      $selectedEl = undefined;
    }
  }

  function handleDoubleClick(e: MouseEvent) {
    if (!(e.target instanceof Element)) return;
    if (!$previewEl.contains(e.target)) return;

    let target: Element = e.target;
    console.log(target.nodeName);
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
    console.log($selectedEl);
  }
</script>

<svelte:window on:keydown={handleKeydown} on:mousedown={handleMousedown} />
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
