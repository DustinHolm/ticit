<script lang="ts">
    import DefaultLayout from "./domain/DefaultLayout.svelte";
    import { entries } from "./domain/stores/entries";
    import { checkForUpdates } from "./util/tauri";

    let updateAvailable = false;

    checkForUpdates()
        .then((result) => {
            updateAvailable = result;
        })
        .catch((e) => {
            console.error("Could not check for updates", e);
        });
</script>

<main>
    {#await entries.loadAll() then}
        <DefaultLayout {updateAvailable} />
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
