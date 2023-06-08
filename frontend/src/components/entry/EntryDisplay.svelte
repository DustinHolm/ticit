<script lang="ts">
    import IconButton from "../../bits/IconButton.svelte";
    import Pencil from "../../bits/icons/Pencil.svelte";
    import Reload from "../../bits/icons/Reload.svelte";
    import { entries, possibleEntryTypes } from "../../stores/entries";
    import { now } from "../../stores/now";
    import type { ExistingEntry } from "../../types";
    import { timeAsString } from "../../util/time";
    import EntryBase from "./EntryBase.svelte";

    export let entry: ExistingEntry;
    export let startEdit: () => void;

    const onEdit = () => {
        startEdit();
    };

    const onRestart = async () => {
        await entries.create({
            name: entry.name,
            description: null,
            time: $now,
            entryType: entry.entryType,
        });
    };
</script>

<EntryBase label="readonly entry">
    <svelte:fragment slot="time">
        <span aria-label="entry time" class="large" id="time">
            {timeAsString(entry.time)}
        </span>
    </svelte:fragment>

    <svelte:fragment slot="texts">
        <span aria-label="entry name" class="large" id="name">
            {entry.name ?? "<undefined>"}
        </span>

        {#if entry.description}
            <span aria-label="entry description">{entry.description}</span>
        {/if}
    </svelte:fragment>

    <svelte:fragment slot="buttons">
        <IconButton onClick={onEdit} label="Edit entry">
            <Pencil />
        </IconButton>

        <IconButton
            onClick={onRestart}
            disabled={!$possibleEntryTypes.includes("Work")}
            label="Restart entry again"
        >
            <Reload />
        </IconButton>
    </svelte:fragment>
</EntryBase>
