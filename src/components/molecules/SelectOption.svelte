<script lang="ts">
  import { onMount } from "svelte";

  export let options;
  export let defaultOption = "none";

  export let value;
  let selected;
  onMount(() => {
    console.log(options);
  });
</script>

<div>
  <select bind:value={selected}>
    <option value="none">Leave As Is</option>
    {#each options as option}
      <option value={option.key}>{option.key}</option>
    {/each}
  </select>
</div>
