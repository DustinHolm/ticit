<script lang="ts">
    interface Props {
        widthPx: number;
        children?: import("svelte").Snippet;
    }

    let { widthPx, children }: Props = $props();
</script>

<div style:width={widthPx + "px"}>
    {@render children?.()}
</div>

<style lang="sass">
    div
        min-height: 400px
        background-color: white
        border-radius: 8px
        box-sizing: border-box
        margin: 16px
        padding: 8px
        overflow: hidden

    div :global(> *)
        max-width: 100%
</style>
