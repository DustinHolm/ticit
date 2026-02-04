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

    interface Props {
        entry: ExistingEntry;
        endEdit: () => void;
        options?: string[];
    }

    let { entry, endEdit, options }: Props = $props();

    let newTime = $state(timeAsString(entry.time));
    let newName = $state(entry.name);
    let newDescription = $state(entry.description);

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
    {#snippet time()}
        <Input label="Time" bind:value={newTime} type={"time"} onEnter={onConfirm} />
    {/snippet}

    {#snippet texts()}
        <Input label="Name" bind:value={newName} {options} onEnter={onConfirm} />

        <Input label="Description" bind:value={newDescription} onEnter={onConfirm} />
    {/snippet}

    {#snippet buttons()}
        <IconButton onClick={onDelete} label="Delete entry">
            <TrashCan />
        </IconButton>

        <IconButton onClick={onCancel} label="Cancel">
            <Close />
        </IconButton>

        <IconButton onClick={onConfirm} label="Confirm">
            <Checkmark />
        </IconButton>
    {/snippet}
</ListElementForm>
