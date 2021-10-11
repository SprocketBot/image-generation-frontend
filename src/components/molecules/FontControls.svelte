<script lang="ts">
  import {previewEl, fontElements} from "../../stores"

  let fileinput;

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

  async function onFileSelected(e) {
    console.log(e.target.files)
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
  <p>The service runs in a container with no installed fonts. You must upload every font used in the base image</p>

  <div class="fileinput" on:click={()=>{fileinput.click()}}>Upload Font Files</div>
  <ul>
    <input type="file" accept=".ttf, .otf, .woff, .woff2" multiple={true} id="fontFile" on:change={(e)=>onFileSelected(e)} bind:this={fileinput}/>
    {#each [...$fontElements] as [name, tag]}
      <li>
        {name} <button on:click={()=>removeFontFile(name)}>Remove</button>
      </li>
    {/each}
  </ul>
</section>

<style lang="postcss">
  section {
    @apply px-4 py-4 max-w-full w-full select-none;
  }
  h3 {
    @apply text-lg;
  }
  ul{
    @apply grid grid-cols-3 m-1
  }
  li{
    @apply flex w-full justify-between
  }
  li button{
    @apply justify-self-end
  }
  button {
    @apply px-2 py-1 bg-primary-500 hover:bg-primary-600 text-sproc_dark_gray-500;
  }
  input[type=file] {
    @apply hidden cursor-pointer
  }
  .fileinput {
    @apply px-2 py-1 bg-primary-500 hover:bg-primary-600 text-sproc_dark_gray-500;
  }
  p {
    @apply text-xl text-primary-500 py-3
  }
</style>