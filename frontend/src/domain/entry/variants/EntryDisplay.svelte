<script lang="ts">
    import IconButton from "../../../components/IconButton.svelte";
    import ListElementForm from "../../../components/ListElementForm.svelte";
    import Pencil from "../../../components/icons/Pencil.svelte";
    import Reload from "../../../components/icons/Reload.svelte";
    import { entries, possibleEntryTypes } from "../../stores/entries";
    import { now } from "../../stores/now";
    import type { ExistingEntry } from "../../../types";
    import { timeAsString } from "../../../util/time";

    interface Props {
        entry: ExistingEntry;
        startEdit: () => void;
    }

    let { entry, startEdit }: Props = $props();

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

<ListElementForm label="readonly entry">
    {#snippet time()}
        <span aria-label="entry time" class="large" id="time">
            {timeAsString(entry.time)}
        </span>
    {/snippet}

    {#snippet texts()}
        <span aria-label="entry name" class="large" id="name">
            {entry.name ?? "<undefined>"}
        </span>

        {#if entry.description}
            <span aria-label="entry description">{entry.description}</span>
        {/if}
    {/snippet}

    {#snippet buttons()}
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
    {/snippet}
</ListElementForm>
