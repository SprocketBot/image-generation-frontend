<script lang="ts">
  import { getTemplate, getImageTypes } from "../../api";
  import ImageTypeItem from "../molecules/ImageTypeItem.svelte";
  import { createEventDispatcher, getContext } from "svelte";
  import type { Writable } from "svelte/store";
  export let imageType = undefined;
  const dispatch = createEventDispatcher();

  const imageTypeId = getContext<Writable<string>>("imageTypeId")
  async function handleImageType(id) {
    const template = await getTemplate(id);
    console.log(id);
    $imageTypeId = id;
    imageType = template.template_structure;
    dispatch("selected", id);
  }
</script>

<section>
  <h1>Select an Image Type</h1>
  {#await getImageTypes()}
    <h2>fetching image types</h2>
  {:then imageTypes}
    {#each imageTypes as type}
      <ImageTypeItem {type} select={handleImageType} />
    {/each}
  {:catch error}
    <h1>Sorry!</h1>
    <p>We have encountered an error fetching image types.</p>
    <pre>{error}</pre>
  {/await}
</section>

<style lang="postcss">
  section {
    @apply px-4 py-2 overflow-auto h-full select-none;
  }
  h1 {
    @apply text-lg font-bold  border-b-primary-500 border-b-2 mb-2;
  }
</style>
