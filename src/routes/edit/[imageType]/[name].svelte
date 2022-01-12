<script lang="ts" context="module">
  export async function load({ fetch, params, url }){
    const response = await fetch(`/api/images/${params.imageType}`);
    const files:string[] = await response.json()
    console.log(files);
    
    if(! (params.name in response)){      
      return {
        status: 302,
        redirect: "/"
      }
    }

    return {
        props: {
          imageTypeId: params.imageType,
          name: params.name
        }
      }
  }
</script>

<script lang="ts">
  import { downloadImage, getTemplate } from "$src/api";
  import EditLayout from "$src/components/layouts/EditLayout.svelte";
  import Controls from "$src/components/organisms/Controls.svelte";
  import EditSidePanel from "$src/components/organisms/EditSidePanel.svelte";
  import Preview from "$src/components/organisms/Preview.svelte";

  import { downloadProgress, imageType, previewEl } from "$src/stores";
  import { svgStringToPreviewEl } from "$src/utils/svgUtils";

  import { onMount } from "svelte";

  export let imageTypeId;
  export let name;

  let downloaded: Promise<string>;
  onMount(async ()=>{
    if(!$previewEl){
      downloaded = downloadImage(imageTypeId, name);
      $previewEl = svgStringToPreviewEl(await downloaded);
      $imageType = (await getTemplate(imageTypeId)).template_structure
    } else{
      downloaded = new Promise<string>((res)=>{res("already present")})
    }
  })

</script>
<EditLayout>
  <div slot="preview">
    {#await downloaded}
      {$downloadProgress}
    {:then}
      <Preview/>
    {/await}
  </div>
  <div slot="controls">
    <Controls/>
  </div>
  <div slot="sidePanel">
    <EditSidePanel/>
  </div>
</EditLayout>