<script lang="ts">
import { getContext } from "svelte";
import type { Writable } from "svelte/store";
import type { BoundBox } from "../../types";


    const bounds = getContext<Writable<BoundBox>>("indicatorBounds");
</script>

<div style="top: {$bounds.y}px; left: {$bounds.x}px; width: {$bounds.w}px; height: {$bounds.h}px"/>

<style>
    div {
        position: absolute;
        border: 1px solid red;
        z-index: 100;
    }
</style>