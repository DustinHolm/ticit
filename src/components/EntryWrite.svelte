<script>
    export let time;
    export let name;
    export let description;
</script>

<span>{time}</span>
<span>{name || "Undefined"}</span>
{#if description}
    <span>{description}</span>
{/if}
<button>Delete</button>
<button>Cancel</button>
<button>Apply</button>
