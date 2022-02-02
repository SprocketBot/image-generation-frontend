<script lang="ts">
    import { getSavedInputs } from "$api/savedInputs.api";
    export let value = "";
    export let reportCode: string;
</script>

{#await getSavedInputs(reportCode)}
    <div>Loading...</div>
{:then results}
    <select bind:value>
        {#each results as result}
            <option>{result}</option>
        {/each}
    </select>
{:catch}
    <div>Error fetching from minio</div>
{/await}

<style lang="postcss">
    select {
        @apply bg-primary-500 text-sproc_light_gray-800 px-2 py-1 w-full;
    }
    div {
        @apply bg-primary-500 text-sproc_light_gray-800 px-2 py-1 w-full;
    }
</style>
