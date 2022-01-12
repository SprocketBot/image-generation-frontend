<script lang="ts">
    import { getImagesOfType, getImageTypes, getTemplate, uploadTemplate } from "$src/api";
    import ImageTypeSelector from "$components/organisms/ImageTypeSelector.svelte";
    import PageHeader from "$src/components/molecules/PageHeader.svelte";
    import { imageType, imageTypeId } from "$src/stores";
    import ImageSelector from "$src/components/molecules/ImageSelector.svelte";
    import { goto } from "$app/navigation";
    
    let reportCode:string;
    let action = "create";
    let filename:string = "";

    let canSave = false;
    let filenames: string[];

    async function  start(){
        goto(`/edit/${$imageTypeId}/${filename}`)
    }

    async function getFilenames(id){
        filenames = await getImagesOfType(id);
    }
    $:{
        canSave = filename.length > 3 && !filenames.includes(filename)

    }

    $:{
        getFilenames($imageTypeId);
    }
</script>

  <section>
    <PageHeader/>
    <h2>I want to</h2>
    <form>
        <label class="{action === 'create' ? 'selected' : ''}">
            <input type="radio" bind:group={action} value={"create"}>
            Create
        </label>
        <label class="{action === 'edit' ? 'selected' : ''}">
            <input type="radio" bind:group={action} value={"edit"}>
            Edit
        </label>
        <label class="{action === 'run' ? 'selected' : ''}">
            <input type="radio" bind:group={action} value={"run"}>
            Run
        </label>
    </form>

    <h2>A Template Using Data From </h2>
      {#await getImageTypes()}
        <h2>fetching image types</h2>
      {:then imageTypes}
        <ImageTypeSelector {imageTypes}/>
        {#if action === "create" && $imageTypeId}
            <h2>Give your project a name</h2>
            <input type="text" bind:value={filename}/> <span>{canSave}</span>
            <h2>And Upload a template</h2>
            <ImageSelector />
        {:else if action === "edit"}
            <h2>Pick a project to edit</h2>
            
        {:else}
            <!-- <RunOptions /> -->
        {/if}
            <button on:click={()=>start()}>GO!</button>
      {:catch error}
        <h1>Sorry!</h1>
        <p>We have encountered an error fetching image types.</p>
        <pre>{error}</pre>
      {/await}

      <!-- {#if !reportCode}
          <ImageTypeSelector on:selected={reportCodeSelected} />
      {:else}
          <div class="form-wrapper">
              <h3>Select Filters</h3>
              <div class="filters">
                  <ReportFilters {reportCode} bind:values={filterValues} />
              </div>
              <span>
                  <h3>Select Input Image</h3>
                  <SavedInputSelector {reportCode} bind:value={inputFile} />
              </span>
          </div>

          <button disabled={disable} on:click={generateReport}>
              {#if disable}
                  Select things
              {:else}
                  Generate Image
              {/if}
          </button>
      {/if} -->
  </section>

<style lang="postcss">
  section {
      @apply px-4 py-4 bg-sproc_light_gray-800 w-1/2
      h-3/4 flex flex-col;
  }
  /* h2 {
      @apply text-xl font-bold text-center text-primary-500;
  } */
  h2 {
    @apply text-lg font-bold  border-b-primary-500 mb-2;
  }
  form {
      @apply flex mb-3;
  }
  form > label{
      @apply flex-grow text-center;
  }
  form > .selected{
      @apply bg-primary-500 text-sproc_light_gray-800
  }
  input[type="radio"]{
    @apply hidden mb-3
  }

  input + span{
      @apply cursor-pointer
  }


  input[type=text] {
    @apply bg-primary-500 text-sproc_light_gray-600;
  }
  
  span {
      @apply px-4 block;
  }
  button {
      @apply px-2 py-1 bg-primary-500 hover:bg-primary-600 mx-4 text-sproc_dark_gray-500 mb-2;
  }

  button:disabled{
      @apply cursor-default bg-primary-700;
  }

  
</style>
