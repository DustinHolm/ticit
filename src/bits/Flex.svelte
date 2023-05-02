<script>
    export let direction = "row";
    export let grow = false;
    export let justifyContent = "space-between";

    $: column = direction === "column";
    $: row = !column;
</script>

<div class:row class:column class:grow style={`justify-content: ${justifyContent}`}>
    <slot />
</div>

<style lang="sass">
    div
        display: flex

    div :global(> *)
        flex: 0 0 auto

    div.grow :global(> *)
        flex: auto

    .row
        flex-direction: row

    .column
        flex-direction: column
</style>
