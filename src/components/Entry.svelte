<script>
    import EntryWrite from "./EntryWrite.svelte";
    import EntryRead from "./EntryRead.svelte";
    import { now } from "../stores/now";
    import EntryNew from "./EntryNew.svelte";
    export let entry = { name: null, time: null };
    export let isNewEntry = false;

    let editable = false;

    $: label = isNewEntry ? "new entry" : editable ? "editable entry" : "entry";
    $: time = entry.time || $now;

    const onEdit = (newState) => {
        editable = newState;
    };
</script>

<li class="a" aria-label={label}>
    {#if isNewEntry}
        <EntryNew name={entry.name} description={entry.description} {time} />
    {:else if editable}
        <EntryWrite
            id={entry.id}
            name={entry.name}
            description={entry.description}
            {time}
            {onEdit}
        />
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
