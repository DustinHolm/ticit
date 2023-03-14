<script>
    import DaySelector from "../components/DaySelector.svelte";
    import DailyData from "../components/DailyData.svelte";
    import DailyOverviewPage from "../pages/DailyOverviewPage.svelte";
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

<DaySelector />
<DailyData />
{#if currentPage === 0 || maxPages > 1}
    <EntryPage />
{/if}
{#if currentPage === 1 || maxPages > 1}
    <DailyOverviewPage />
{/if}
<PageSelector {onNext} {nextPossible} {onPrevious} {previousPossible} />
