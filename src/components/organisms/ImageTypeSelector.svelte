<script lang="ts">
  import { getTemplate, getImageTypes } from "../../api";
  export let imageType;

  async function handleImageType(id) {
    const template = await getTemplate(id);
    imageType = template.template_structure;
  }
</script>

<ul>
  {#await getImageTypes()}
    <h1>fetching image types</h1>
  {:then imageTypes}
    {#each imageTypes as type}
      <li>
        <h1>{type.display_name}</h1>
        <p>{type.description}</p>
        <button
          on:click={() => {
            handleImageType(type.report_code);
          }}>Select</button
        >
      </li>
    {/each}
  {:catch error}
    <h1>Sorry!</h1>
    <p>We have encountered an error fetching image types.</p>
    <pre>{error}</pre>
  {/await}
</ul>

<style lang="postcss">
  ul {
    @apply px-4 py-2;
  }
  h1 {
    @apply text-lg font-bold border-b-primary-500 border-b-2 mb-2;
  }
  button {
    @apply text-white bg-primary-500 p-1 border-none cursor-pointer hover:bg-primary-600 focus:bg-primary-600 text-sproc_dark_gray-500 float-right;
  }
  li {
    @apply mb-8;
  }
</style>
