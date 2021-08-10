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

<style>
  .dropbtn {
    background-color: #3498db;
    color: white;
    padding: 0.25rem;
    border: none;
    cursor: pointer;
  }

  .dropbtn:hover,
  .dropbtn:focus {
    background-color: #2980b9;
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    overflow: auto;
    z-index: 1;
  }

  .dropdown-content button {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  .dropdown button:hover {
    background-color: #ddd;
  }
</style>
