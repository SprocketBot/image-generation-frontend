<script lang="ts">
  import { previewEl } from "$src/stores"
  import { svgStringToPreviewEl } from "$src/utils/svgUtils";

  const source: string = `/static/img/techdemo_figma2.svg`;
  let files;
  async function handleUpload(){
    let svgData:string;
    if(files?.[0]){
      const reader = new FileReader();
      reader.readAsText(files[0])
      reader.onloadend = e => {
        svgData = e.target.result.toString();
      }
      
    }
    else{
      svgData = await fetch(source).then((r) => r.text());
    }
    $previewEl = svgStringToPreviewEl(svgData);
  }

</script>

<div>
  <input type="file" accept=".svg" id="upload" bind:files on:change={handleUpload}>
  <button on:click={handleUpload}>
      Use tech demo
  </button>
</div>

<style lang="postcss">
  div{
    
  }
</style>