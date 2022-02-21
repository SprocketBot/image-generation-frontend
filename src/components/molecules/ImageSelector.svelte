<script lang="ts">
  import LoadingIndicator from "../atoms/LoadingIndicator.svelte";

  export let previewEl;

  let working: boolean = false;
  let files:FileList;
  let filename:string;

  async function handleUpload(){
    working = true;
    previewEl = undefined;
    let svgData:string;
    if(files?.[0]){
      svgData = await new Promise((res, rej)=>{
        const reader = new FileReader();
        reader.readAsText(files[0])
        reader.onloadend = e => {
          res(e.target.result.toString());
        }
        reader.onerror = () => rej("Error reading")
      })
      
      const parser = new DOMParser();
      const newEl = parser.parseFromString(svgData, "image/svg+xml").children[0];
      if (newEl.nodeName === "svg" && newEl instanceof SVGElement) {
        previewEl = newEl
        filename = files?.[0].name
      }
      else{
        filename = "Please select an SVG"
      }
    }
    working = false;
  }

</script>

<div>
  <label>
    {#if working}
      <LoadingIndicator />
    {:else if filename}
      {filename}
    {:else}
      Choose a file
    {/if}
    <input type="file" accept=".svg" id="upload" bind:files on:change={(e) => handleUpload()}>
  </label>
</div>

<style lang="postcss">
  div {
    @apply flex mb-3;
  }
  input[type="file"]{
    @apply hidden;
  }
  label{
    @apply cursor-pointer w-5/6 text-center text-lg bg-primary-500 text-sproc_light_gray-700;
  }

  
</style>