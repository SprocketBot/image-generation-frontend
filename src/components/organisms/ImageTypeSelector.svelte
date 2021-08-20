<script lang="ts">
  import { getTemplate, getImageTypes } from "../../api";
  export let imageType;

  async function handleImageType(id = "sotw") {
    imageType = await getTemplate(id);
  }
</script>

{#await getImageTypes()}
  <h1>fetching image types</h1>
{:then imageTypes}
  {#each imageTypes as type}
    <h1>{type.title}</h1>
    <button
      on:click={() => {
        handleImageType(type.id);
      }}>Select</button
    >
  {/each}
{:catch error}
  <h1>Sorry!</h1>
  <p>We have encountered an error fetching image types.</p>
  <pre>{error}</pre>
{/await}
