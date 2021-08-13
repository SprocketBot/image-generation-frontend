<script lang="ts">
  import { setContext } from "svelte";
  import type { Writable } from "svelte/store";

  import EditLayout from "../components/layouts/EditLayout.svelte";
  import {
    indicatorBounds,
    previewEl,
    selectedEl,
    template,
    links,
    svgData,
  } from "../stores";
  import type { BoundBox, ElementsMap, TemplateLeafNode } from "../types";
  import Tailwindcss from "../utils/Tailwindcss.svelte";

  setContext<Writable<SVGElement>>("previewEl", previewEl);
  setContext<Writable<BoundBox>>("indicatorBounds", indicatorBounds);
  setContext<Writable<SVGElement>>("selectedEl", selectedEl);
  setContext<Writable<any>>("template", template);
  setContext<Writable<ElementsMap>>("links", links);
  setContext<Writable<string>>("svgData", svgData);
</script>

<Tailwindcss />
<EditLayout
  source={`/static/img/techdemo_figma.svg`}
  templateName={`Star of the week`}
/>
