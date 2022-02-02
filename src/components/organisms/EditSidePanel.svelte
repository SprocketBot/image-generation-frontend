<script lang="ts">
  import { selectedEl , previewEl} from "$src/stores";

  import SvgList from "$components/organisms/SVGList.svelte";
  import DataItems from "$components/organisms/DataItems.svelte";
  import { blur, fly } from "svelte/transition";
  import {absoluteWhileTransitioning} from "$utils/absoluteWhileTransitioning";

</script>

{#if $selectedEl}
  <div out:blur|local={{}} in:fly={{ y: 50 }} use:absoluteWhileTransitioning>
    <DataItems/>
  </div>
{:else if $previewEl}
  <div out:blur|local={{}} in:fly={{ y: 50 }} use:absoluteWhileTransitioning>
    <SvgList />
  </div>
{:else}
  <div out:blur|local={{}} in:fly={{ y: 50 }} use:absoluteWhileTransitioning class="text">
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