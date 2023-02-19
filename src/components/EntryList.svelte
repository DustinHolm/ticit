<script>
    import Entry from "./Entry.svelte";
    import { sortedIds } from "../stores/entries";
</script>

<ul class="a">
    {#each $sortedIds as id (id)}
        <Entry {id} />
    {/each}
    <Entry newEntry={true} />
</ul>

<style lang="sass">
    .a
        border: 1px solid black
        background-color: green
</style>
