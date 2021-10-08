<script lang="ts">
  import { selectedEl , previewEl, saving} from "../../stores";

  import SvgList from "./SVGList.svelte";
  import DataItems from "./DataItems.svelte";
  import { blur, fly } from "svelte/transition";
  import {absoluteWhileTransitioning} from "../../utils/absoluteWhileTransitioning";
  import SaveControls from "./SaveControls.svelte";

</script>

{#if $saving}
  <div out:blur|local={{}} in:fly={{ y: 50 }} use:absoluteWhileTransitioning>
    <SaveControls />
  </div>
{:else if $selectedEl}
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