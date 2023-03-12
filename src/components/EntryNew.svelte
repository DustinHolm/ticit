<script>
    import { entries } from "../stores/entries";
    import { timeAsString } from "../util/time";

    export let time;
    export let name;
    export let description;

    const onConfirm = () => {
        entries.create({ name, description, time });
    };
</script>

<span aria-label="entry time">{timeAsString(time)}</span>
<label for={"nameInput-new"}>Name</label>
<input bind:value={name} id={"nameInput-new"} type="text" />
<label for={"descriptionInput-new"}>Description</label>
<input bind:value={description} id={"descriptionInput-new"} type="text" />
<button on:click={onConfirm}>Confirm</button>
