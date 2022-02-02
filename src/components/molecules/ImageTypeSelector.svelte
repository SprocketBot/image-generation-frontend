<script lang="ts">
  export let imageTypes:any[]
  export let value;
</script>

<select bind:value>
  {#each imageTypes as type}
    <option value={type}>
      <div>{type.display_name}</div>
      <div>{type.description}</div>
    </option>
  {/each}
</select> 

<style lang="postcss">
  select {
        @apply bg-primary-500 text-sproc_light_gray-800 px-2 py-1 w-full box-content;
  }
  option{
    @apply flex ;
  }
</style>
