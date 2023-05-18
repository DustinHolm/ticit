<script>
    import EntryList from "../components/EntryList.svelte";
    import Entry from "../components/Entry.svelte";
    import EntryButtons from "../components/EntryButtons.svelte";
</script>

<div>
    <EntryList />
</div>
<div class="interaction">
    <Entry isNewEntry={true} />
    <EntryButtons />
</div>

<style lang="sass">
    .interaction
        margin-top: 24px
</style>
