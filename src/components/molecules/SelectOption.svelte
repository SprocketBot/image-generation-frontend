<script lang="ts">
  import { onMount } from "svelte";

  export let options;
  export let defaultOption = "none";

  export let value;
  let selected;
  onMount(() => {
    console.log(options);
  });
  function handleChange() {
    console.log(value);
    console.log(x);
  }
</script>

<div>
  <select
    bind:value={selected}
    on:blur={() => {
      handleChange();
    }}
  >
    <option value="none">Leave As Is</option>
    {#each options as option}
      <option value={option.key}>{option.key}</option>
    {/each}
  </select>
</div>
