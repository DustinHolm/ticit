<script lang="ts">
    import { invokeCompletions } from "../../util/tauri";
    import EntryList from "../entry/EntryList.svelte";
    import EntryNew from "../entry/variants/EntryNew.svelte";

    let completions = invokeCompletions();
</script>

<div>
    {#await completions}
        <EntryList />
    {:then finished}
        <EntryList options={finished} />
    {/await}
</div>

<div class="interaction">
    New entry
    {#await completions}
        <EntryNew />
    {:then finished}
        <EntryNew options={finished} />
    {/await}
</div>

<style lang="sass">
    .interaction
        margin-top: 24px
</style>
