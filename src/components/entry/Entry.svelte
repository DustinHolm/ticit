<script>
    import EntryBreakDisplay from "./EntryBreakDisplay.svelte";
    import EntryBreakEdit from "./EntryBreakEdit.svelte";
    import EntryDisplay from "./EntryDisplay.svelte";
    import EntryEdit from "./EntryEdit.svelte";
    import EntryNew from "./EntryNew.svelte";
    export let entry = { name: null, time: null };
    export let isNewEntry = false;

    let editable = false;
</script>

{#if isNewEntry}
    <EntryNew />
{:else if editable && entry.entryType && entry.entryType !== "Work"}
    <EntryBreakEdit {entry} endEdit={() => (editable = false)} />
{:else if editable}
    <EntryEdit {entry} endEdit={() => (editable = false)} />
{:else if entry.entryType && entry.entryType !== "Work"}
    <EntryBreakDisplay {entry} startEdit={() => (editable = true)} />
{:else}
    <EntryDisplay {entry} startEdit={() => (editable = true)} />
{/if}
