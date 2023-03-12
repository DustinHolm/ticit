<script>
    import { entries } from "../stores/entries";
    import { timeAsString, timeFromString } from "../util/time";

    export let id;
    export let time;
    export let name;
    export let description;
    export let onEdit;

    let newTime = timeAsString(time);
    let newName = name;
    let newDescription = description;

    const onConfirm = () => {
        entries.edit({
            id,
            name: newName,
            description: newDescription,
            time: timeFromString(newTime),
        });
        onEdit(false);
    };

    const onCancel = () => {
        newTime = timeAsString(time);
        newName = name;
        newDescription = description;
        onEdit(false);
    };

    const onDelete = () => {
        entries.remove({ id, name, description, time });
        onEdit(false);
    };
</script>

<label for={`timeInput-${id}`}>Time</label>
<input bind:value={newTime} id={`timeInput-${id}`} type="time" role="textbox" />
<label for={`nameInput-${id}`}>Name</label>
<input bind:value={newName} id={`nameInput-${id}`} type="text" />
<label for={`descriptionInput-${id}`}>Description</label>
<input bind:value={newDescription} id={`descriptionInput-${id}`} type="text" />
<button on:click={onDelete}>Delete</button>
<button on:click={onCancel}>Cancel</button>
<button on:click={onConfirm}>Confirm</button>
