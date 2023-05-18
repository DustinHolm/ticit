<script>
    import IconButton from "../bits/IconButton.svelte";
    import Input from "../bits/Input.svelte";
    import ListElement from "../bits/ListElement.svelte";
    import Checkmark from "../bits/icons/Checkmark.svelte";
    import Close from "../bits/icons/Close.svelte";
    import Pencil from "../bits/icons/Pencil.svelte";
    import Reload from "../bits/icons/Reload.svelte";
    import TrashCan from "../bits/icons/TrashCan.svelte";
    import { entries, possibleEntryTypes } from "../stores/entries";
    import { now } from "../stores/now";
    import { timeAsString, timeFromString } from "../util/time";
    export let entry = { name: null, time: null };
    export let isNewEntry = false;

    let editable = false;
    let newTime = entry.time ? timeAsString(entry.time) : null;
    let newName = entry.name;
    let newDescription = entry.description;

    const onEdit = () => {
        editable = true;
    };

    const onConfirmNew = () => {
        entries.create({
            name: newName,
            description: newDescription,
            time: $now,
            entryType: "Work",
        });
    };

    const onConfirm = () => {
        entries.edit({
            id: entry.id,
            name: newName,
            description: newDescription,
            time: timeFromString(newTime),
            entryType: entry.entryType,
        });
        editable = false;
    };

    const onCancel = () => {
        newTime = timeAsString(entry.time);
        newName = entry.name;
        newDescription = entry.description;
        editable = false;
    };

    const onDelete = () => {
        entries.remove({
            id: entry.id,
            name: entry.name,
            description: entry.description,
            time: entry.time,
            entryType: entry.entryType,
        });
        editable = false;
    };

    const onRestart = () => {
        entries.create({
            name: entry.name,
            description: null,
            time: $now,
            entryType: entry.entryType,
        });
    };
</script>

<ListElement>
    <svelte:fragment slot="content">
        <div class="content">
            {#if isNewEntry || !editable}
                <span aria-label="entry time" class="large">
                    {timeAsString(entry.time || $now)}
                </span>
            {:else}
                <Input label="Time" bind:value={newTime} type={"time"} />
            {/if}
            <div class="texts">
                {#if isNewEntry || editable}
                    <Input label="Name" bind:value={newName} />
                    <Input label="Description" bind:value={newDescription} />
                {:else}
                    <span aria-label="entry name" class="large">
                        {entry.name || "<undefined>"}
                    </span>
                    {#if entry.description}
                        <span aria-label="entry description">{entry.description}</span>
                    {/if}
                {/if}
            </div>
        </div>
    </svelte:fragment>
    <svelte:fragment slot="buttons">
        {#if isNewEntry}
            <IconButton
                onClick={onConfirmNew}
                disabled={!$possibleEntryTypes.includes("Work")}
                label="Create"
            >
                <Checkmark />
            </IconButton>
        {:else if editable}
            <IconButton onClick={onDelete} label="Delete task">
                <TrashCan />
            </IconButton>
            <IconButton onClick={onCancel} label="Cancel">
                <Close />
            </IconButton>
            <IconButton onClick={onConfirm} label="Confirm">
                <Checkmark />
            </IconButton>
        {:else}
            <IconButton onClick={onEdit} label="Edit task">
                <Pencil />
            </IconButton>
            <IconButton
                onClick={onRestart}
                disabled={!$possibleEntryTypes.includes("Work")}
                label="Restart task again"
            >
                <Reload />
            </IconButton>
        {/if}
    </svelte:fragment>
</ListElement>

<style lang="sass">
    .content
        padding: 8px
        display: flex
    .texts
        padding-left: 16px
        display: flex
        flex-grow: 1
        flex-direction: column
    .large
        font-size: larger
</style>
