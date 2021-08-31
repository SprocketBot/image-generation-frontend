<script lang="ts">
    import { getSavedInputs } from "../../api/savedInputs.api";
    export let value = "";
    export let reportCode: string;
</script>

<select bind:value>
    {#await getSavedInputs(reportCode)}
        <option>Loading...</option>
    {:then results}
        {#each results as result}
            <option>{result}</option>
        {/each}
    {:catch}
        <option>Error!</option>
    {/await}
</select>

<style lang="postcss">
    select {
        @apply bg-primary-500 text-sproc_light_gray-800 px-2 py-1 w-full;
    }
</style>
