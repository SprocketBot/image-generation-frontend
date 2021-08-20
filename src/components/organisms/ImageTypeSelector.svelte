<script lang="ts">
  import { getTemplate } from "../../api";
  export let imageType;
  //const template = getContext<Writable<any>>("template");
    
  async function handleImageType(id="sotw"){
      console.log("hello")
      imageType = await getTemplate(id);
    }
</script>


<button on:click={()=>handleImageType()}>Select an Image Type</button>