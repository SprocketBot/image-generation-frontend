<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  import SvgList from "./SVGList.svelte";
  import TemplateItems from "./TemplateItems.svelte";
  import {blur, fly} from 'svelte/transition'

  export let template;
  const selectedEl = getContext<Writable<SVGElement>>("selectedEl");
  
</script>

{#if $selectedEl}
  <div out:blur={{}} in:fly={{ y: -50 }}>
    <TemplateItems template={template}/>
  </div>

{:else}
  <div out:blur={{}} in:fly={{ y: -50 }}>
    <SvgList />
  </div>
{/if}