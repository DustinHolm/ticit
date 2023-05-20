<script>
    export let direction = "row";
    export let grow = false;
    export let justifyContent = "space-between";
    export let alignItems = "normal";
    export let padding = "0";
</script>

<div
    class:grow
    style={`flex-direction: ${direction};
            justify-content: ${justifyContent};
            align-items: ${alignItems};
            padding: ${padding}`}
>
    <slot />
</div>

<style lang="sass">
    div
        display: flex

    div :global(> *)
        flex: 0 0 auto

    div.grow :global(> *)
        flex: auto
</style>
