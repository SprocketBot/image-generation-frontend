<script lang="ts">
  import type { ImageTypeItemType } from "src/types";
  import { createEventDispatcher } from 'svelte';

  export let type:ImageTypeItemType;

	const dispatch = createEventDispatcher();
</script>
<div class="item" >
  <span class="name">
      {type.title}
  </span>
  <span class="spacer" />
  <span class="actions">
    <button
    on:click={() => {
      dispatch("fetchImageType", {id: type.id});
    }}>Select</button
  >
  </span>
</div>
  
<style lang="postcss">
  div.item {
        @apply flex items-center justify-center cursor-pointer mb-1 max-w-full;
    }
    span:not(.spacer) {
        @apply mr-4;
    }
    button {
        @apply bg-primary-500 hover:bg-primary-600 text-sproc_dark_gray-500 p-1 w-20;
    }
    button.outline {
        @apply bg-transparent border-primary-500 border-2 text-primary-500;
    }
    span.name {
        @apply overflow-ellipsis whitespace-nowrap min-w-0 overflow-hidden;
    }
    span.spacer {
        @apply flex-1 flex px-4;
    }
    span.spacer::after {
        content: "";
        background-image: linear-gradient(
            to right,
            black 15%,
            rgba(255, 255, 255, 0) 0%
        );
        background-position: bottom;
        height: 3px;
        background-size: 12px 1px;
        background-repeat: repeat-x;

        @apply flex-1;
    }
</style>