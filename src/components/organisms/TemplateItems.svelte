<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { Writable } from "svelte/store";

  import { getTemplate } from "../../api";
  import TemplateItem from "../molecules/TemplateItem.svelte";

  export let templateName: string;

  const template = getContext<Writable<any>>("template");
  onMount(() => getTemplate(templateName).then((r) => ($template = r)));
  $: if (templateName) getTemplate(templateName).then((r) => ($template = r));
</script>

<TemplateItem item={$template} />
