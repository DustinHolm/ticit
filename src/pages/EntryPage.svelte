<script>
    import EntryList from "../components/EntryList.svelte";
    import Entry from "../components/entry/Entry.svelte";
</script>

<div>
    <EntryList />
</div>

<div class="interaction">
    New entry
    <Entry isNewEntry={true} />
</div>

<style lang="sass">
    .interaction
        margin-top: 24px
</style>
