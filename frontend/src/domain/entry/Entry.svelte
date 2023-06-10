<script lang="ts">
    import { type ExistingEntry } from "../../types";
    import EntryBreakDisplay from "./variants/EntryBreakDisplay.svelte";
    import EntryBreakEdit from "./variants/EntryBreakEdit.svelte";
    import EntryDisplay from "./variants/EntryDisplay.svelte";
    import EntryEdit from "./variants/EntryEdit.svelte";

    export let entry: ExistingEntry;

    let editable = false;
</script>

{#if editable && entry.entryType !== "Work"}
    <EntryBreakEdit {entry} endEdit={() => (editable = false)} />
{:else if editable}
    <EntryEdit {entry} endEdit={() => (editable = false)} />
{:else if entry.entryType !== "Work"}
    <EntryBreakDisplay {entry} startEdit={() => (editable = true)} />
{:else}
    <EntryDisplay {entry} startEdit={() => (editable = true)} />
{/if}
