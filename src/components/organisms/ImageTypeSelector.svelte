<script lang="ts">
  import { getTemplate } from "../../api";
  import { getContext } from "svelte";

  import type {Writable} from "svelte/store";
  const template = getContext<Writable<any>>("template");
    
  async function handleImageType(id="sotw"){
      console.log("hello")
      $template = await getTemplate(id);
    }
</script>


<button on:click={()=>handleImageType()}>Select an Image Type</button>