<li>
    <div class="content">
        <slot name="content" />
    </div>
    <div class="buttons">
        <slot name="buttons" />
    </div>
</li>

<style lang="sass">
    li
        border: 1px solid black
        border-radius: 8px
        display: flex
    li:not(:last-child)
        margin-bottom: 8px
    .content
        flex-grow: 1
</style>
