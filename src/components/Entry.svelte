<script>
    import { onDestroy } from "svelte";
    import { entries } from "../stores/entries";
    import EntryWrite from "./EntryWrite.svelte";
    import EntryRead from "./EntryRead.svelte";
    import { nowAsTimeString } from "../stores/now";
    import EntryNew from "./EntryNew.svelte";
    export let id = null;
    export let isNewEntry = false;

    let editable = false;
    let entry = { name: null, time: null };
    $: label = isNewEntry ? "new entry" : editable ? "editable entry" : "entry";

    const unsubscribe = entries.subscribe((all) => {
        const found = all.find((e) => e.id === id);
        if (found) {
            entry = found;
        }
    });

    $: time = entry.time || $nowAsTimeString;

    const onEdit = (newState) => {
        editable = newState;
    };

    onDestroy(unsubscribe);
</script>

<li class="a" aria-label={label}>
    {#if isNewEntry}
        <EntryNew name={entry.name} description={entry.description} {time} />
    {:else if editable}
        <EntryWrite {id} name={entry.name} description={entry.description} {time} {onEdit} />
    {:else}
        <EntryRead name={entry.name} description={entry.description} {time} {onEdit} />
    {/if}
</li>

<style lang="sass">
    .a
        border: 1px solid black
        background-color: red
        display: flex

    .a > *
        flex: auto
</style>
