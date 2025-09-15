<script lang="ts">
    interface Props {
        label: string;
        backgroundColor?: string | null;
        time?: import('svelte').Snippet;
        texts?: import('svelte').Snippet;
        buttons?: import('svelte').Snippet;
    }

    let {
        label,
        backgroundColor = null,
        time,
        texts,
        buttons
    }: Props = $props();
</script>

<li style:background-color={backgroundColor} aria-label={label}>
    <div class="content">
        {@render time?.()}
        <div class="texts">
            {@render texts?.()}
        </div>
    </div>

    <div class="buttons">
        {@render buttons?.()}
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
