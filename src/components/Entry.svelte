<script>
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

    $: label = isNewEntry ? "new entry" : editable ? "editable entry" : "entry";
</script>

<li class="a" aria-label={label}>
    {#if isNewEntry}
        <span aria-label="entry time">{timeAsString($now)}</span>
        <label for={"nameInput-new"}>Name</label>
        <input bind:value={newName} id={"nameInput-new"} type="text" />
        <label for={"descriptionInput-new"}>Description</label>
        <input bind:value={newDescription} id={"descriptionInput-new"} type="text" />
        <button on:click={onConfirmNew} disabled={!$possibleEntryTypes.includes("Work")}
            >Confirm</button
        >
    {:else if editable}
        <label for={`timeInput-${entry.id}`}>Time</label>
        <input bind:value={newTime} id={`timeInput-${entry.id}`} type="time" role="textbox" />
        <label for={`nameInput-${entry.id}`}>Name</label>
        <input bind:value={newName} id={`nameInput-${entry.id}`} type="text" />
        <label for={`descriptionInput-${entry.id}`}>Description</label>
        <input bind:value={newDescription} id={`descriptionInput-${entry.id}`} type="text" />
        <button on:click={onDelete}>Delete</button>
        <button on:click={onCancel}>Cancel</button>
        <button on:click={onConfirm}>Confirm</button>
    {:else}
        <span aria-label="entry time">{timeAsString(entry.time)}</span>
        <span aria-label="entry name">{entry.name || "<undefined>"}</span>
        {#if entry.description}
            <span aria-label="entry description">{entry.description}</span>
        {/if}
        <button on:click={onEdit}>Edit</button>
        <button on:click={onRestart} disabled={!$possibleEntryTypes.includes("Work")}
            >Restart Task</button
        >
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
