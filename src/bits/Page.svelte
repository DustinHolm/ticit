<div>
    <slot />
</div>

<style lang="sass">
    div
        min-height: 400px
        width: 800px
        background-color: white
        border-radius: 8px
        box-sizing: border-box
        margin: 16px
        padding: 8px
        overflow: hidden

    div :global(> *)
        max-width: 100%
</style>
