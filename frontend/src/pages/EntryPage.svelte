<script lang="ts">
    import EntryList from "../components/EntryList.svelte";
    import EntryNew from "../components/entry/EntryNew.svelte";
</script>

<div>
    <EntryList />
</div>

<div class="interaction">
    New entry
    <EntryNew />
</div>

<style lang="sass">
    .interaction
        margin-top: 24px
</style>
