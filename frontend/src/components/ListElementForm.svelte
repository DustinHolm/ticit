<script lang="ts">
    export let label: string;
    export let backgroundColor: string | null = null;
</script>

<li style:background-color={backgroundColor} aria-label={label}>
    <div class="content">
        <slot name="time" />
        <div class="texts">
            <slot name="texts" />
        </div>
    </div>

    <div class="buttons">
        <slot name="buttons" />
    </div>
</li>

<style lang="sass">
    .buttons
        white-space: nowrap

    .content
        flex-grow: 1
        padding: 8px
        display: flex

        :global(#name + span)
            border-top: 1px solid lightgrey

        :global(#time)
            word-wrap: normal

        :global(.large)
            font-size: larger
            
        :global(span)
            word-wrap: anywhere
    
    .texts
        padding-left: 16px
        display: flex
        flex-grow: 1
        flex-direction: column
        
    li:not(:last-child)
        margin-bottom: 8px

    li
        border: 1px solid black
        border-radius: 8px
        display: flex
</style>
