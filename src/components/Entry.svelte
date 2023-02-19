<script>
    import { onDestroy } from "svelte";
    import { entries } from "../stores/entries";
    import EntryWrite from "./EntryWrite.svelte";
    import EntryRead from "./EntryRead.svelte";
    import { now } from "../stores/now";
    export let id = null;
    export let newEntry = false;

    let editable = newEntry;
    let entry = { name: null, time: null };
    let label = newEntry ? "new entry" : editable ? "editable entry" : "entry";

    const unsubscribe = entries.subscribe((all) => {
        const found = all.find((e) => e.id === id);
        if (found) {
            entry = found;
        }
    });

    $: time =
        entry.time || $now.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });

    onDestroy(unsubscribe);
</script>

<li class="a" aria-label={label}>
    {#if editable}
        <EntryWrite {id} name={entry.name} description={entry.description} {time} />
    {:else}
        <EntryRead {id} name={entry.name} description={entry.description} {time} />
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
