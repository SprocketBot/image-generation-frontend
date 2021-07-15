<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import type { BoundBox, LinkType } from "../../types";
  import { recursiveObjectToArray } from "../../utils/helpers";
  import {
    applicableOperations,
    variableForOperation,
  } from "../../utils/SvgRules";
  import SelectOption from "../molecules/SelectOption.svelte";

  const selectedEl = getContext<Writable<SVGElement>>("selectedEl");
  const template = getContext<Writable<any>>("template");
  const indicatorBounds = getContext<Writable<BoundBox>>("indicatorBounds");
  const links = getContext<Writable<Array<LinkType>>>("links");

  //let value = [];
  let variableOptions = [];
  $: {
    variableOptions = [];
    recursiveObjectToArray($template, variableOptions);
  }

  let element: SVGElement;
  let options: Array<{
    option: string;
    value: string;
  }>;
  $: {
    element = $selectedEl;
    options = $selectedEl
      ? applicableOperations[$selectedEl.nodeName].map((option) => {
          return { option: option, value: "none" };
        })
      : [];
  }

  function removeLink(link) {
    $links = $links.filter((l) => l !== link);
  }
  function confirmLink() {
    $links = [...$links, { element: element, options: options }];
    $selectedEl = undefined;
    resetBounds();
  }
  function cancelLink() {
    $selectedEl = undefined;
    resetBounds();
  }
  function finishLinks() {
    console.log($links);
  }
  function resetBounds() {
    $indicatorBounds = {
      w: 0,
      h: 0,
      x: 0,
      y: 0,
    };
  }
</script>

<section>
  <!-- <div> -->
  Links:
  <ul>
    <div>
      {#each $links as link}
        <li>
          <!-- TODO: open up SelectOption if edit is selected -->
          {link.element.id}
          <!-- <button class="edit" on:click={() => editLink(link)}>Edit</button> -->
          <button class="delete" on:click={() => removeLink(link)}
            >Delete</button
          >
        </li>
      {/each}
    </div>

    <li>
      {#if $selectedEl}
        <div>
          <span class="unconfirmed">{$selectedEl.id}</span>
          <span>
            {#each options as option}
              Set {option.option} to :
              <SelectOption
                bind:x={option.value}
                options={variableOptions.filter(
                  (x) => x.value.type === variableForOperation[option.option]
                )}
              />
            {/each}
          </span>
          <button on:click={confirmLink}>Confirm</button>
          <button on:click={cancelLink}>Cancel</button>
        </div>
      {:else}
        <span class="unconfirmed">select an element or </span>
        <button on:click={finishLinks}>Finish</button>
      {/if}
    </li>
  </ul>

  <!-- </div> -->
</section>

<style lang="postcss">
  section {
    height: 100%;
    /* display: grid; */
    /* grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr; */
  }
  section div:first-child {
    @apply border-b-2 border-gray-600;
  }
  .unconfirmed {
    @apply text-gray-500;
  }
  .delete {
    @apply text-red-500;
  }
  .edit {
    @apply text-yellow-500;
  }
</style>
