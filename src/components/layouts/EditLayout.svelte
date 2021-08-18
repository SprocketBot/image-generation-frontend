<main>
  <section class="preview">
    <slot name="preview" />
  </section>

  <section class="controls">
    <slot name="controls" />
  </section>
  <aside class="side-panel">
    <slot name="sidePanel"/>
  </aside>
</main>

<style lang="postcss">
  main {
    @apply h-screen max-h-screen w-screen
               grid grid-cols-6 grid-rows-6 text-gray-100 bg-sproc_light_gray-800;
  }
  main * {
    @apply h-full max-h-full min-h-full 
               w-full max-w-full min-w-full;
  }
  .preview {
    @apply bg-sproc_dark_gray-300 col-start-1 
                col-span-4 row-start-1 row-span-4;
  }
  .controls {
    @apply bg-sproc_light_gray-800 border-t-2 border-sproc_dark_gray-800
                col-span-4 col-start-1 row-start-5 row-span-2;
  }
  .side-panel {
    @apply bg-sproc_light_gray-800 border-l-2 border-sproc_dark_gray-800
                col-span-2 col-start-5 row-start-1 row-span-6;
  }
</style>
