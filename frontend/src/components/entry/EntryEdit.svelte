<script lang="ts">
    import IconButton from "../../bits/IconButton.svelte";
    import Input from "../../bits/Input.svelte";
    import Checkmark from "../../bits/icons/Checkmark.svelte";
    import Close from "../../bits/icons/Close.svelte";
    import TrashCan from "../../bits/icons/TrashCan.svelte";
    import { entries } from "../../stores/entries";
    import type { ExistingEntry } from "../../types";
    import { timeAsString, timeFromString } from "../../util/time";
    import EntryBase from "./EntryBase.svelte";

    export let entry: ExistingEntry;
    export let endEdit: () => void;

    let newTime = timeAsString(entry.time);
    let newName = entry.name;
    let newDescription = entry.description;

    const onConfirm = async () => {
        await entries.edit({
            id: entry.id,
            name: newName,
            description: newDescription,
            time: timeFromString(newTime),
            entryType: entry.entryType,
        });
        endEdit();
    };

    const onCancel = () => {
        newTime = timeAsString(entry.time);
        newName = entry.name;
        newDescription = entry.description;
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

<EntryBase label="editable entry">
    <svelte:fragment slot="time">
        <Input label="Time" bind:value={newTime} type={"time"} onEnter={onConfirm} />
    </svelte:fragment>

    <svelte:fragment slot="texts">
        <Input label="Name" bind:value={newName} onEnter={onConfirm} />

        <Input label="Description" bind:value={newDescription} onEnter={onConfirm} />
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
