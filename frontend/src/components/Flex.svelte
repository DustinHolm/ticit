<script lang="ts">
    export let direction:
        | "row"
        | "row-reverse"
        | "column"
        | "column-reverse"
        | "initial"
        | "inherit" = "row";
    export let grow = false;
    export let justifyContent:
        | "flex-start"
        | "flex-end"
        | "center"
        | "space-between"
        | "space-around"
        | "space-evenly"
        | "initial"
        | "inherit" = "space-between";
    export let alignItems:
        | "normal"
        | "stretch"
        | "center"
        | "flex-start"
        | "flex-end"
        | "baseline"
        | "initial"
        | "inherit" = "normal";
    export let padding = "0";
</script>

<div
    class:grow
    style:flex-direction={direction}
    style:justify-content={justifyContent}
    style:align-items={alignItems}
    style:padding
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
