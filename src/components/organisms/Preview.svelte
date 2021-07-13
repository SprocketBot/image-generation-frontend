<script lang="ts">
    import { getContext, onMount } from "svelte";
    import type { Writable } from "svelte/store";
import Indicator from "../molecules/Indicator.svelte";

    export let source: string = undefined;
    let container: HTMLElement;
    let svgElement: SVGElement;
    const previewEl = getContext<Writable<SVGElement>>("previewEl");

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
            
        }
    });
</script>

<div bind:this={container}>
    <Indicator/>
</div>

<style lang="postcss">
    div {
        @apply h-full w-full p-8 flex justify-center align-middle relative;
    }
    div :global(svg) {
        @apply h-full w-auto;
    }
</style>
