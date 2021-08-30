<script lang="ts">
    import { getFilterValues } from "../../api/filters.api";

    export let reportCode: string;
</script>

{#await getFilterValues(reportCode)}
    <h2>Loading...</h2>
{:then filters}
    <section>
        {#each filters as filter}
            <label>
                <span>{filter.name}</span>
                <select>
                    {#each filter.data as option}
                        <option value={option.value}
                            >{option.description}</option
                        >
                    {/each}
                </select>
            </label>
        {/each}
    </section>
{/await}

<style lang="postcss">
    label {
        @apply flex flex-col mx-4;
    }
    label span {
        @apply font-bold;
    }
    select {
        @apply bg-primary-500 text-white px-2 py-1;
    }
    section {
        @apply flex;
    }
</style>