<script lang="ts">
    import { getFilterValues } from "$api/filters.api";

    export let reportCode: string;
    export let values = {};
</script>

{#await getFilterValues(reportCode)}
    <h2>Loading...</h2>
{:then filters}
    {#each filters as filter}
        <label>
            <span>{filter.name}</span>
            <select bind:value={values[filter.code]}>
                {#each filter.data as option}
                    <option value={option.value}>
                        {option.description}
                    </option>
                {/each}
            </select>
        </label>
    {/each}
{/await}

<style lang="postcss">
    label {
        @apply flex flex-col mx-4;
    }
    label span {
        @apply font-bold;
    }
    select {
        @apply bg-primary-500 text-sproc_light_gray-800 px-2 py-1 w-full;
    }
</style>
