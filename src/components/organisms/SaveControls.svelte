<script lang="ts">
  import type { ElementsMap, SprocketData } from "src/types";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  import { uploadTemplate } from "../../api";

  const links = getContext<Writable<ElementsMap>>("links");
  const saving = getContext<Writable<boolean>>("saving");
  const previewEl = getContext<Writable<SVGElement>>("previewEl");
  const imageTypeId = getContext<Writable<string>>("imageTypeId");
  const fontElements = getContext<Writable<Map<string, Element>>>("fontElements");

  let uploading = false;
  let filename = "";

  async function base64convert (file) : Promise<string> {
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
    uploading = true;
    const fontsDefs = document.createElementNS($previewEl.namespaceURI, "def");
    fontsDefs.setAttribute("id", "fonts");
    for(const [, tag] of $fontElements){
      fontsDefs.append(tag);
    }
    $previewEl.appendChild(fontsDefs);
    
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


  async function onFileSelected(e) {
    if(e.target.files.length){
      for(const file of e.target.files){
        const tag = document.createElementNS($previewEl.namespaceURI, "a");
        tag.setAttribute("data-font-name", file.name);
        tag.setAttribute("href", await base64convert(file));
        $fontElements.set(file.name, tag);
      }
      e.target.value = '';
      $fontElements = $fontElements;
    }
  }
  async function removeFontFile(name:string) {
    $fontElements.delete(name);
    $fontElements = $fontElements;
  }
</script>


<section>
  <header>
    <h3>Saving Page</h3>
    <button on:click={()=>{$saving=false;}}>Cancel</button> 
  </header>
  <ul>
    <lh>Upload Fonts: </lh>
    <input type="file" class="file" accept=".ttf, .otf, .woff, .woff2" multiple={true} id="fontFile" on:change={(e)=>onFileSelected(e)} />
    <li>
      {#each [...$fontElements] as [name, tag]}
        {name} <button on:click={()=>removeFontFile(name)}>Remove</button>
      {/each}
    </li>
  </ul>
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