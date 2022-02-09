<script lang="ts">
  import { getImagesOfType, uploadTemplate } from "$src/api";
  import ImageSelector from "../molecules/ImageSelector.svelte";
  import { session } from "$app/stores";
  import { goto } from "$app/navigation";
  import LoadingIndicator from "../atoms/LoadingIndicator.svelte";

  export let imageType;

  let filenames: string[];
  let filename = ""
  let previewEl:SVGElement = undefined;
  let canGo

  let navigating = false;
  async function getFilenames(id) {
      filenames = undefined;
      filenames = await getImagesOfType(id);
  }

  async function go() {
    navigating = true;
    await uploadTemplate(previewEl, imageType.report_code, filename);
    $session = {
        previewEl : previewEl,
        imageType : imageType
    }
    goto(`/edit/${imageType.report_code}/${filename}`);
  }

  $:{
    canGo =
      filenames && previewEl && imageType &&
      filename.length > 3 &&
      !filenames.includes(filename) &&
      /[A-Za-z0-9_]+/.test(filename);
  }

</script>


<h2>Give your project a name</h2>
<input type="text" bind:value={filename} /> 
    {#await getFilenames(imageType.report_code)}
        <span>updating filenames</span>
    {:then filenames} 
        <span>{canGo}</span>
    {/await}
<h2>And Upload a template</h2>
<ImageSelector bind:previewEl/>
<button disabled={!canGo} on:click={() => go()}>
    {#if navigating}
        <LoadingIndicator/>
    {:else}
        GO!
    {/if}
</button>

<style lang="postcss">


  h2 {
      @apply text-lg font-bold  border-b-primary-500 my-2;
  }
  
  input[type="text"] {
      @apply bg-primary-500 text-sproc_light_gray-600;
  }

  span {
      @apply px-4;
  }
  button {
      @apply justify-self-end px-2 py-1 bg-primary-500 hover:bg-primary-600 m-4 text-sproc_dark_gray-500 mb-2;
  }
  button:disabled {
      @apply cursor-default bg-primary-700;
  }
</style>
