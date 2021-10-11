<script lang="ts">
  import { links, previewEl, imageTypeId, fontElements } from "../../stores";
  import type { SprocketData } from "src/types";
  import { uploadTemplate } from "../../api";

  let uploading = false;
  let filename = "";

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
    await uploadTemplate(svgData, $imageTypeId, filename);

    //TODO: prompt user file uploaded successfully, and yeet everything
  }



</script>


<section>
  {#if $fontElements.size===0}
    <strong>You have not uploaded any fonts. This may cause text to not be rendered properly</strong>
  {:else}
    <p>Give your file a name you'll rembmer. Don't forget to add the '.svg' extension</p>
  {/if}
  
  <label for="filename">Filename: </label>
  <input type="text" id="filename" bind:value={filename}/>
  
  <button on:click={saveOutput}>
    {#if uploading}
      Working
    {:else}
      Save
    {/if}
  </button>
</section>



<style lang="postcss">
  section {
    @apply p-4 max-w-full w-full select-none;
  }
  button {
    @apply px-2 py-1 bg-primary-500 hover:bg-primary-600 text-sproc_dark_gray-500;
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