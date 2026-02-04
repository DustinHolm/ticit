<script lang="ts">
    import Entry from "./Entry.svelte";
    import { entries } from "../stores/entries";

    interface Props {
        options?: string[];
    }

    let { options }: Props = $props();
</script>

<ul>
    {#each $entries as entry (entry.id)}
        <Entry {entry} {options} />
    {/each}
</ul>

<style lang="sass">
    ul
        margin: 0
        padding: 0
</style>
