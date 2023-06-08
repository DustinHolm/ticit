<script lang="ts">
    import Input from "../../bits/Input.svelte";
    import IconButton from "../../bits/IconButton.svelte";
    import Checkmark from "../../bits/icons/Checkmark.svelte";
    import Close from "../../bits/icons/Close.svelte";
    import TrashCan from "../../bits/icons/TrashCan.svelte";
    import { entries } from "../../stores/entries";
    import { timeAsString, timeFromString } from "../../util/time";
    import EntryBase from "./EntryBase.svelte";
    import type { ExistingEntry } from "../../types";

    export let entry: ExistingEntry;
    export let endEdit: () => void;

    let newTime = timeAsString(entry.time);
    let text = entry.entryType === "EndOfDay" ? "End of day" : entry.entryType;

    const onConfirm = async () => {
        await entries.edit({
            id: entry.id,
            name: null,
            description: null,
            time: timeFromString(newTime),
            entryType: entry.entryType,
        });
        endEdit();
    };

    const onCancel = () => {
        newTime = timeAsString(entry.time);
        endEdit();
    };

    const onDelete = async () => {
        await entries.remove({
            id: entry.id,
            name: entry.name,
            description: entry.description,
            time: entry.time,
            entryType: entry.entryType,
        });
        endEdit();
    };
</script>

<EntryBase entryType={entry.entryType} label="editable break entry">
    <svelte:fragment slot="time">
        <Input label="Time" bind:value={newTime} type={"time"} onEnter={onConfirm} />
    </svelte:fragment>

    <svelte:fragment slot="texts">
        <span aria-label="entry name" class="large" id="name">{text}</span>
    </svelte:fragment>

    <svelte:fragment slot="buttons">
        <IconButton onClick={onDelete} label="Delete entry">
            <TrashCan />
        </IconButton>

        <IconButton onClick={onCancel} label="Cancel">
            <Close />
        </IconButton>

        <IconButton onClick={onConfirm} label="Confirm">
            <Checkmark />
        </IconButton>
    </svelte:fragment>
</EntryBase>
