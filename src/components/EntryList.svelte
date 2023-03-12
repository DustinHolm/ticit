<script>
    import Entry from "./Entry.svelte";
    import { entries } from "../stores/entries";
</script>

<ul class="a">
    {#each $entries as entry (entry.id)}
        <Entry {entry} />
    {/each}
</ul>

<style lang="sass">
    .a
        border: 1px solid black
        background-color: green
</style>
