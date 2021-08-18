<script lang="ts">
  import type { ElementsMap, SVGProperty, TemplateVariable } from "../../types";
  import { variableOperations } from "../../utils/SvgRules";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import Accordion from "../atoms/Accordion.svelte";
  import DropdownButton from "../atoms/DropdownButton.svelte";

  export let item: any = {};
  export let key: string = "Variables";
  export let name: string = "";

  const selectedEl = getContext<Writable<SVGElement>>("selectedEl");
  const links = getContext<Writable<ElementsMap>>("links");
  function setLink(event) {
    if (!$links.get($selectedEl)) {
      $links.set($selectedEl, new Map<SVGProperty, TemplateVariable>());
    }
    $links.get($selectedEl).set(event.detail, name);
    $links = $links;
  }
</script>

<Accordion>
  <div slot="header" let:shown class="item">
    <span class="open-indicator">
      {shown || !Object.keys(item).length ? "-" : "+"}
    </span>
    <span class="name">
      {key}
    </span>
    <span class="spacer" />
    <span class="actions" />
    {#if item.description}
      <p class="description">{item.description}</p>
    {/if}
  </div>
  <div slot="content" class="container">
    {#if item.hasOwnProperty("type")}
      <DropdownButton
        on:clicked={setLink}
        name="Use as"
        choices={variableOperations[item.type]}
      />
    {:else}
      {#each Object.entries(item) as [key, child]}
        {#if key !== "description"}
          <svelte:self
            name="{name ? `${name}.` : ''}{key}"
            item={child}
            {key}
          />
        {/if}
      {/each}
    {/if}
  </div>
</Accordion>

<style lang="postcss">
  .open-indicator {
    @apply w-4;
  }
  div.container {
    @apply pl-6 py-2;
  }
  div.item {
    @apply flex items-center justify-center cursor-pointer;
  }
  span:not(.spacer):not(.open-indicator) {
    @apply mr-4;
  }
  button {
    @apply bg-gray-400 hover:bg-gray-500 p-1 w-20;
  }
  span.spacer {
    @apply flex-1 flex pr-5 pl-5;
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
  p.description {
    @apply text-sm;
  }
</style>
