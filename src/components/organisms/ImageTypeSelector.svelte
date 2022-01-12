<script lang="ts">
  import { imageTypeId } from "$src/stores";

  export let imageTypes:any[]
  let reportCode:string

  $:{
    $imageTypeId=reportCode;
  }
</script>

<select bind:value={reportCode}>
  {#each imageTypes as type}
    <option value={type.report_code}>
      <div>{type.display_name}</div>
      <div>{type.description}</div>
    </option>
  {/each}
</select> 

<style lang="postcss">

  select {
        @apply bg-primary-500 text-sproc_light_gray-800 px-2 py-1 w-full box-content ;
  }
  option{
    @apply flex ;
  }
</style>
