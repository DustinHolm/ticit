<script>
    import DefaultLayout from "./layouts/DefaultLayout.svelte";
    import { entries } from "./stores/entries";
</script>

<main>
    {#await entries.loadAll() then}
        <DefaultLayout />
    {/await}
</main>

<style lang="sass" global>
    main
        height: 100vh
        width: 100vw

    body
        margin: 0
</style>
