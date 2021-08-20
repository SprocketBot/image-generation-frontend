<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  import SvgList from "./SVGList.svelte";
  import DataItems from "./DataItems.svelte";
  import {blur, fly} from 'svelte/transition'

  export let imageType;
  const selectedEl = getContext<Writable<SVGElement>>("selectedEl");
  
</script>

{#if $selectedEl}
  <div out:blur={{}} in:fly={{ y: -50 }}>
    <DataItems imageType={imageType}/>
  </div>

{:else}
  <div out:blur={{}} in:fly={{ y: -50 }}>
    <SvgList />
  </div>
{/if}