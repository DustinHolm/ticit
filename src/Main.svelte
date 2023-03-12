<script>
    import HorizontalLayout from "./layouts/HorizontalLayout.svelte";
    import { entries } from "./stores/entries";
</script>

<main>
    {#await entries.init() then}
        <HorizontalLayout />
    {/await}
</main>

<style lang="sass" global>
    main
        height: 100vh
        width: 100vw

    body
        margin: 0
</style>
