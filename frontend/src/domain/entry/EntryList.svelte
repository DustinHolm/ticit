<script lang="ts">
    import Entry from "./Entry.svelte";
    import { entries } from "../stores/entries";
</script>

<ul>
    {#each $entries as entry (entry.id)}
        <Entry {entry} />
    {/each}
</ul>

<style lang="sass">
    ul
        margin: 0
        padding: 0
</style>
