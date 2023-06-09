<script lang="ts">
    import DefaultLayout from "./layouts/DefaultLayout.svelte";
    import { entries } from "./stores/entries";
</script>

<main>
    {#await entries.loadAll() then}
        <DefaultLayout />
    {/await}
</main>

<!-- svelte-ignore css-unused-selector -->
<style lang="sass" global>
    @font-face
        font-family: Inter
        font-style: normal
        font-weight: 400
        src: url("/assets/Inter-Regular.ttf") format("truetype")

    body 
        margin: 0
        font-family: Inter

    main
        height: 100vh
        width: 100vw
</style>
