<script lang="ts">
  import type { ElementsMap, OptionType, SVGProperty } from "src/types";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import DropdownButton from "../atoms/DropdownButton.svelte";

  export let el : SVGElement;
  export let property: SVGProperty;
  export let option: OptionType;
  let selection = option.default;

  const links = getContext<Writable<ElementsMap>>("links");

  function updateOption(event){
    const currentProperty = $links.get(el).get(property)
    let newOptions = {...currentProperty.options};
    newOptions[option.name]=event.detail;
    $links.get(el).set(property, {
      ...currentProperty,
      options : newOptions
    })
    selection = event.detail;
  }
</script>

{option.display_name}

<DropdownButton bind:name={selection} choices={option.options} on:clicked={updateOption}/>