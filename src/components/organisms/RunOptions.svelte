<script lang="ts">
import { getFilterValues } from "$src/api/filters.api";
import { getOutputs } from "$src/api/outputs.api";
import { runReport } from "$src/api/run.api";
import OutputSelector from "../molecules/OutputSelector.svelte";

  import ReportFilters from "../molecules/ReportFilters.svelte";
  import SavedInputSelector from "../molecules/SavedInputSelector.svelte";

  export let imageType;
  export let savedImages;

  let filterValues = {};
  let mode: "select" | "download" = "select" 
  let filename = "";

  function run() {
    let filterNames = "";
    for(let key in filterValues){
      filterNames += `${filterValues[key]}_`
    }
    filterNames = filterNames.slice(0,-1);

    runReport(
      imageType.report_code, 
      `${imageType.report_code}/${filename}/template.svg`, 
      `${imageType.report_code}/${filename}/outputs/${filterNames}`, 
      filterValues)
  }

  $:{
    console.log(savedImages);
    console.log(filterValues)
  }
</script>

{#if mode == "select"}
  <h2>Pick a project to Edit</h2>
  <SavedInputSelector bind:value={filename} {savedImages}/>
  
{/if}

{#await getFilterValues(imageType.report_code)}
  <h2>Loading...</h2>
{:then filters}
  {#if mode == "select"}
    
    <h2>Select your filters</h2>

      <ReportFilters bind:values={filterValues} {filters} />
      <button disabled={filename == ""} on:click={()=>mode="download"}>--></button>
      
      {:else}
      <button on:click={()=>mode="select"}> back</button>
      
      {#await getOutputs(imageType.report_code, filename)}
        Grabbing previously generated images
      {:then outputs}
        {#each outputs as file}
          {file}
        {/each}
        <OutputSelector {imageType} {filterValues} />
      {:catch}
      {/await}

      <button on:click={()=>run()}>Run</button>
      {/if}
    {:catch}
            Error gathering filter values
    {/await}



<style lang="postcss">
  h2 {
        @apply text-lg font-bold  border-b-primary-500 mb-2;
    }
  button {
      @apply justify-self-end px-2 py-1 bg-primary-500 hover:bg-primary-600 m-4 text-sproc_dark_gray-500 mb-2;
  }

  button:disabled {
      @apply cursor-default bg-primary-700;
  }
</style>