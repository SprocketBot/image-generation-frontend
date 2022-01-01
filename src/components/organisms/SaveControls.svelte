<script lang="ts">
  import { links, previewEl, imageTypeId, fontElements } from "$src/stores";
  import type { SprocketData } from "$src/types";
  import { uploadTemplate } from "$src/api";

  let filename = "";
  let uploading = false;
  let canSave = false;
  let saved = false;
  let saveError = false;

  $:{
    canSave = $links.size > 0 && $fontElements.size > 0 && filename.slice(-4) === ".svg"
  }

  async function saveOutput() {
    // read in all the font files and bake them into svg
    uploading = true;
    if($fontElements.size > 0){
      const fontsDefs = document.createElementNS($previewEl.namespaceURI, "def");
      fontsDefs.setAttribute("id", "fonts");
      for(const [, tag] of $fontElements){
        fontsDefs.append(tag);
      }
      $previewEl.appendChild(fontsDefs);
    }
    
    // bake in sproket-data into svg
    for (const [el, linkmap] of $links) {
      const sproketData: SprocketData[] = [];
      for (const [linkType, data] of linkmap) {
        sproketData.push({
          varPath: data.varPath,
          options: data.options,
          type: linkType,
        });
      }
      const sproketDataString = JSON.stringify(sproketData);
      sproketDataString.replace('"', "'");
      el.setAttribute("data-sprocket", sproketDataString);
    }

    let svgData = $previewEl.outerHTML;
    let result = await uploadTemplate(svgData, $imageTypeId, filename)

    if(result.etag){
      saved = true;
    } else{
      saveError = true;
    }

    uploading = false;
    //TODO: prompt user file uploaded successfully, and yeet everything
  }



</script>


<section>
  {#if $links.size === 0}
    <strong>You haven't assigned any links</strong>
  {/if}
  {#if $fontElements.size===0}
    <strong>You have not uploaded any fonts. This may cause text to not be rendered properly</strong>
  {/if}
  <p>Give your file a name you'll rembmer. Don't forget to add the '.svg' extension</p>
  
  <label for="filename">Filename: </label>
  <input type="text" id="filename" bind:value={filename}/>
  
  <button on:click={saveOutput} disabled={!canSave || uploading}>
    {#if uploading}
      Working
    {:else}
      Save
    {/if}
  </button>

  {#if saved}
    <p>Success! You can now refresh to make a new template or head over to the generate tab to run one!</p>
  {:else if saveError}
    <p>Well this is awkward... something went wrong. Ping someone?</p>
  {/if}
</section>



<style lang="postcss">
  section {
    @apply p-4 max-w-full w-full select-none;
  }
  button {
    @apply px-2 py-1 bg-primary-500 hover:bg-primary-600 text-sproc_dark_gray-500;
  }
  button:disabled {
    @apply bg-sproc_light_gray-500 cursor-default
  }
  label {
    @apply text-xl text-primary-500
  }
  input[type=text] {
    @apply text-sproc_dark_gray-500 bg-primary-500;
  }
  strong {
    @apply block text-xl text-pink-600
  }
  p {
    @apply text-xl text-primary-500 py-3
  }
</style>