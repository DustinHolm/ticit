<script>
    import { entries } from "../stores/entries";

    export let id;
    export let time;
    export let name;
    export let description;

    const onConfirm = () => entries.setEntry({ id, name, description, time });
</script>

<input bind:value={time} aria-label="entry time" placeholder="Time" />
<input bind:value={name} aria-label="entry name" placeholder="Name" />
<input bind:value={description} aria-label="entry description" placeholder="Description" />
<button>Delete</button>
<button>Cancel</button>
<button on:click={onConfirm} aria-label="confirm">Confirm</button>
