<script>
    export let id;
    export let time;
    export let name;
    export let description;
    export let onEdit;
</script>

<span aria-label="entry time">{time}</span>
<span aria-label="entry name">{name || "<undefined>"}</span>
{#if description}
    <span aria-label="entry description">{description}</span>
{/if}
<button on:click={() => onEdit(true)}>Edit</button>
<button>Restart Task</button>
