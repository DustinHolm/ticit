<script>
    import { entries } from "../stores/entries";
    import { nowAsTimeString } from "../stores/now";

    export let time;
    export let name;
    export let description;
    export let onEdit;

    const onRestart = () => {
        entries.setEntry({ id: null, name, description, time: $nowAsTimeString });
    };
</script>

<span aria-label="entry time">{time}</span>
<span aria-label="entry name">{name || "<undefined>"}</span>
{#if description}
    <span aria-label="entry description">{description}</span>
{/if}
<button on:click={() => onEdit(true)}>Edit</button>
<button on:click={onRestart}>Restart Task</button>
