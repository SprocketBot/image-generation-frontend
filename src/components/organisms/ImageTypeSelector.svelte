<script lang="ts">
  import { getTemplate, getImageTypes } from "../../api";
  import ImageTypeItem from "../molecules/ImageTypeItem.svelte";
  export let imageType;

  async function handleFetchImageType(id = "sotw") {
    imageType = await getTemplate(id);
    //TODO: disable buttons when getting template
  }

</script>
<section>
 <h1>Select an Image Type</h1>
  {#await getImageTypes()}
    <h2>fetching image types</h2>
  {:then imageTypes}
    {#each imageTypes as type}
      <ImageTypeItem {type} on:fetchImageType={(event)=>handleFetchImageType(event.detail.id)}/>
    {/each}
  {:catch error}
    <h1>Sorry!</h1>
    <p>We have encountered an error fetching image types.</p>
    <pre>{error}</pre>
  {/await}
</section>

<style lang="postcss">
  section {
    @apply p-6 overflow-auto max-h-full select-none;
  }
  h1 {
    @apply text-lg font-bold;
  }
</style>
