<script lang="ts">
  export let svgData;
  const source: string = `/static/img/techdemo_figma.svg`;
  let files;
  

  // const svgData = getContext<Writable<string>>("svgData");

  async function handleUpload(){
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
  }
</script>

<input type="file" id="upload" bind:files>
<button on:click={handleUpload}>
  {#if files?.[0]}
    Go!
  {:else}
    Use tech demo
  {/if}
</button>