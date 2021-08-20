<script lang="ts">
import { onMount } from "svelte";

  import { getTemplate, getImageTypes } from "../../api";
  export let imageType;
  
  let imageTypes = [];
  let ready = false;
  onMount(async () => {
    imageTypes = await getImageTypes();
    console.log(imageTypes);
    ready = true;
  })
  async function handleImageType(id="sotw"){
      imageType = await getTemplate(id);
    }
</script>

{#if !ready}
  <h1>fetching image types</h1>
{:else}
  {#each imageTypes as type}
    <h1>{type.title}</h1>
    <button on:click={()=>{handleImageType(type.id)}}>Select</button>
  {/each}
{/if}