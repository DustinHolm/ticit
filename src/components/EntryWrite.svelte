<script>
    import { entries } from "../stores/entries";

    export let id;
    export let time;
    export let name;
    export let description;
    export let onEdit;

    let editInProgress = true;
    $: oldTime = editInProgress ? time : oldTime;
    $: oldName = editInProgress ? name : oldName;
    $: oldDescription = editInProgress ? description : oldDescription;

    const onConfirm = () => {
        editInProgress = false;
        entries.setEntry({ id, name, description, time });
        onEdit(false);
    };

    const onCancel = () => {
        editInProgress = false;
        time = oldTime;
        name = oldName;
        description = oldDescription;
        onEdit(false);
    };

    const onDelete = () => {
        editInProgress = false;
        entries.deleteEntry(id);
        onEdit(false);
    };
</script>

<label for={`timeInput-${id}`}>Time</label>
<input bind:value={time} id={`timeInput-${id}`} type="time" role="textbox" />
<label for={`nameInput-${id}`}>Name</label>
<input bind:value={name} id={`nameInput-${id}`} type="text" />
<label for={`descriptionInput-${id}`}>Description</label>
<input bind:value={description} id={`descriptionInput-${id}`} type="text" />
<button on:click={onDelete}>Delete</button>
<button on:click={onCancel}>Cancel</button>
<button on:click={onConfirm}>Confirm</button>
