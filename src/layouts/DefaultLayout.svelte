<script>
    import DailyData from "../components/DailyData.svelte";
    import DailyOverviewPage from "../pages/DailyOverviewPage.svelte";
    import Page from "../bits/Page.svelte";
    import EntryPage from "../pages/EntryPage.svelte";
    import PageSelector from "../components/PageSelector.svelte";

    let currentPage = 0;
    let width = 0;

    const onNext = () => (currentPage = currentPage + 1);
    const onPrevious = () => (currentPage = currentPage - 1);

    $: maxPages = Math.max(1, Math.floor(width / 800));
    $: nextPossible = currentPage < 1 && maxPages < 2;
    $: previousPossible = currentPage > 0 && maxPages < 2;
</script>

<svelte:window bind:innerWidth={width} />

<div class={"outer"}>
    <DailyData />
    <div class={"inner"}>
        {#if currentPage === 0 || maxPages > 1}
            <Page>
                <EntryPage />
            </Page>
        {/if}
        {#if currentPage === 1 || maxPages > 1}
            <Page>
                <DailyOverviewPage />
            </Page>
        {/if}
    </div>
    <PageSelector {onNext} {nextPossible} {onPrevious} {previousPossible} />
</div>

<style lang="sass">
    .outer
        height: 100%
        width: 100%
        display: flex
        flex-direction: column
        justify-content: space-between

    .inner
        flex-grow: 1
        display: flex
        flex-direction: row
        align-items: center
        justify-content: center
        background-color: lightgrey
        overflow: scroll
</style>
