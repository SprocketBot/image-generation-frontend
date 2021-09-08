<script lang="ts">
  import type { ElementsMap, SprocketData } from "src/types";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  import { uploadTemplate } from "../../api";

  const links = getContext<Writable<ElementsMap>>("links")
  const saving = getContext<Writable<boolean>>("saving");
  const previewEl = getContext<Writable<SVGElement>>("previewEl");
  const fontSet = getContext<Writable<Set<string>>>("fontSet")
  const imageTypeId = getContext<Writable<string>>("imageTypeId")

  let filename = "";
  let fontfiles = {};
  let fontDataURLs = {};

  async function base64convert (file) {
    return new Promise((resolve, reject)=>{
      const reader = new FileReader()
      reader.onload = (e) => {
        resolve(e.target.result);
      }
      reader.onerror = (e) =>{
        reject(e.target.error);
      }
      reader.readAsDataURL(file)
    })
    
  }


  async function saveOutput() {
    // read in all the font files and bake them into svg
    for(const font of [...$fontSet]){
      if(fontfiles[font]?.length){
        const style = document.createElementNS($previewEl.namespaceURI, "style");
        style.innerHTML = style.innerHTML + `@font-face {
          font-family: "${font}";
          src: url("${fontDataURLs[font]}");
        }`
  
        $previewEl.appendChild(style);
      }
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
    $saving = false;
  }
</script>


<section>
  <header>
    <h3>Saving Page</h3>
    <button on:click={()=>{$saving=false;}}>Cancel</button> 
  </header>
  <dl>
    <dt>Upload Fonts: </dt>
    {#each [...$fontSet] as font}
      <dd>
        <span>{font}:</span> 
        <input type="file" class="file" bind:files={fontfiles[font]}/>
      </dd>
    {/each}
    </dl>
  <label for="filename">Filename: </label>
  <input type="text" id="filename" bind:value={filename}/>
  
  <button on:click={saveOutput}>Save</button>
</section>



<style lang="postcss">
  section {
    @apply px-4 py-4 max-w-full w-full select-none;
  }
  header {
    @apply flex justify-between mb-4;
  }
  h3 {
    @apply text-lg;
  }
  button {
    @apply px-2 py-1 bg-primary-500 hover:bg-primary-600 text-sproc_dark_gray-500;
  }
  dd {
    @apply flex;
  }
  input {
    @appy text-sproc_dark_gray-500;
  }
  input.file {
    @appy justify-right flex;
  }
</style>