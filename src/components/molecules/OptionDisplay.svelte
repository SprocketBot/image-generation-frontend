<script lang="ts">
  import type { OptionType, SVGProperty } from "src/types";
import { onMount } from "svelte";
  import { links } from "../../stores";
  import DropdownButton from "../atoms/DropdownButton.svelte";

  export let el : SVGElement;
  export let property: SVGProperty;
  export let option: OptionType;
  let selection = $links.get(el).get(property)?.options[option.name] || option.default;

  onMount(async ()=>{
    if(! $links.get(el).get(property).options[option.name]){
      updateOption({detail: option.default})
    }
  })
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