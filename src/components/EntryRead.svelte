<script>
    export let id;
    export let time;
    export let name;
    export let description;
</script>

<span aria-label="entry time">{time}</span>
<span aria-label="entry name">{name || "<undefined>"}</span>
{#if description}
    <span aria-label="entry description">{description}</span>
{/if}
<button>Edit</button>
<button>Restart Task</button>
