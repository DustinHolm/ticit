<script lang="ts">
    import IconButton from "../../../components/IconButton.svelte";
    import Input from "../../../components/Input.svelte";
    import ListElementForm from "../../../components/ListElementForm.svelte";
    import Checkmark from "../../../components/icons/Checkmark.svelte";
    import Close from "../../../components/icons/Close.svelte";
    import TrashCan from "../../../components/icons/TrashCan.svelte";
    import { entries } from "../../stores/entries";
    import type { ExistingEntry } from "../../../types";
    import { timeAsString, timeFromString } from "../../../util/time";

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

<ListElementForm label="editable entry">
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
</ListElementForm>
