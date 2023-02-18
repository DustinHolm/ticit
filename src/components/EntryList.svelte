<script>
    import Entry from "./Entry.svelte";
    import { sortedIds } from "../stores/entries";
</script>

<div class="a">
    <ul>
        <li><Entry createOnly={true} /></li>
        {#each $sortedIds as id (id)}
            <li><Entry {id} /></li>
        {/each}
    </ul>
</div>

<style lang="sass">
    .a
        border: 1px solid black
        background-color: green
</style>
