<script>
    import { entries } from "../stores/entries";

    export let time;
    export let name;
    export let description;

    const onConfirm = () => {
        entries.setEntry({ id: null, name, description, time });
    };
</script>

<span aria-label="entry time">{time}</span>
<label for={"nameInput-new"}>Name</label>
<input bind:value={name} id={"nameInput-new"} type="text" />
<label for={"descriptionInput-new"}>Description</label>
<input bind:value={description} id={"descriptionInput-new"} type="text" />
<button on:click={onConfirm}>Confirm</button>
