<script lang="ts">
    interface Props {
        direction?: "row" | "row-reverse" | "column" | "column-reverse" | "initial" | "inherit";
        grow?: boolean;
        justifyContent?:
            | "flex-start"
            | "flex-end"
            | "center"
            | "space-between"
            | "space-around"
            | "space-evenly"
            | "initial"
            | "inherit";
        alignItems?:
            | "normal"
            | "stretch"
            | "center"
            | "flex-start"
            | "flex-end"
            | "baseline"
            | "initial"
            | "inherit";
        padding?: string;
        children?: import("svelte").Snippet;
    }

    let {
        direction = "row",
        grow = false,
        justifyContent = "space-between",
        alignItems = "normal",
        padding = "0",
        children,
    }: Props = $props();
</script>

<div
    class:grow
    style:flex-direction={direction}
    style:justify-content={justifyContent}
    style:align-items={alignItems}
    style:padding
>
    {@render children?.()}
</div>

<style lang="sass">
    div
        display: flex

    div :global(> *)
        flex: 0 0 auto

    div.grow :global(> *)
        flex: auto
</style>
