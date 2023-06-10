<script lang="ts">
    import EntryList from "../entry/EntryList.svelte";
    import EntryNew from "../entry/variants/EntryNew.svelte";
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
