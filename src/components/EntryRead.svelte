<script>
    import { entries } from "../stores/entries";
    import { now } from "../stores/now";
    import { timeAsString } from "../util/time";

    export let time;
    export let name;
    export let description;
    export let onEdit;

    const onRestart = () => {
        entries.create({ name, description: null, time: $now });
    };
</script>

<span aria-label="entry time">{timeAsString(time)}</span>
<span aria-label="entry name">{name || "<undefined>"}</span>
{#if description}
    <span aria-label="entry description">{description}</span>
{/if}
<button on:click={() => onEdit(true)}>Edit</button>
<button on:click={onRestart}>Restart Task</button>
