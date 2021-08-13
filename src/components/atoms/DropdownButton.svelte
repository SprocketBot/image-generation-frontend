<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import clickOutside from "../../utils/clickOutside";
  export let name: string;
  export let choices: string[];
  let open = false;

  const dispatch = createEventDispatcher();
  /* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
  function openDropdown() {
    open = !open;
  }
  function handleClickOutside(event) {
    open = false;
  }
  function clickMe(choice: string) {
    open = false;
    dispatch("clicked", choice);
  }
</script>

<div use:clickOutside on:click_outside={handleClickOutside} class="dropdown">
  <button on:click={openDropdown} class="dropbtn">{name}</button>
  {#if open}
    <div id="myDropdown" class="dropdown-content">
      {#each choices as choice}
        <button on:click={() => clickMe(choice)}>{choice}</button>
      {/each}
    </div>
  {/if}
</div>

<style lang="postcss">
  .dropbtn {
    @apply text-white bg-primary-500 p-1 border-none cursor-pointer hover:bg-primary-600 focus:bg-primary-600;
  }

  .dropdown {
    @apply relative inline-block;
  }

  .dropdown-content {
    @apply absolute bg-primary-300 w-40 z-10 overflow-auto;
  }

  .dropdown-content button {
    @apply text-black px-2 py-1 no-underline block hover:bg-primary-500 w-full;
  }
</style>
