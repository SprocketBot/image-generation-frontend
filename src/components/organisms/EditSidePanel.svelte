<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  import SvgList from "./SVGList.svelte";
  import DataItems from "./DataItems.svelte";
  import { blur, fly } from "svelte/transition";
  import {absoluteWhileTransitioning} from "../../utils/absoluteWhileTransitioning";
  import SaveControls from "./SaveControls.svelte";

  export let imageType;
  const selectedEl = getContext<Writable<SVGElement>>("selectedEl");
  const previewEl = getContext<Writable<SVGElement>>("previewEl");
  const saving = getContext<Writable<boolean>>("saving");

</script>

{#if $saving}
  <div out:blur={{}} in:fly={{ y: 50 }} use:absoluteWhileTransitioning>
    <SaveControls />
  </div>
{:else if $selectedEl}
  <div out:blur={{}} in:fly={{ y: 50 }} use:absoluteWhileTransitioning>
    <DataItems {imageType} />
  </div>
{:else if $previewEl}
  <div out:blur={{}} in:fly={{ y: 50 }} use:absoluteWhileTransitioning>
    <SvgList />
  </div>
{:else}
  <div out:blur={{}} in:fly={{ y: 50 }} use:absoluteWhileTransitioning class="text">
    <strong>Please upload your svg template.</strong>
  </div>
{/if}


<style lang="postcss">
  div.text {
    @apply p-4;
  }
  strong {
    @apply text-primary-500;
  }
</style>