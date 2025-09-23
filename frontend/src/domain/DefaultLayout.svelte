<script lang="ts">
    import DailyData from "./daily_data/DailyData.svelte";
    import DailyOverviewPage from "./pages/DailyOverviewPage.svelte";
    import Page from "../components/Page.svelte";
    import EntryPage from "./pages/EntryPage.svelte";
    import PageSelector from "./pages/PageSelector.svelte";
    import SimpleTimePage from "./pages/SimpleTimePage.svelte";

    interface Props {
        updateAvailable: boolean;
    }

    let { updateAvailable }: Props = $props();

    let currentPage = $state(0);
    let width = $state(0);

    const allPages = [0, 1, 2];
    const widthPx = 500;
    const onNext = () => (currentPage = currentPage + 1);
    const onPrevious = () => (currentPage = currentPage - 1);

    let maxPages = $derived(Math.max(1, Math.floor(width / widthPx)));
    let shownPages = $derived.by(() => {
        let i = allPages.indexOf(currentPage);
        let shown = allPages.slice(i, i + maxPages);
        const diff = maxPages - shown.length;
        if (diff > 0) {
            const earlier = allPages.slice(i - diff, i);
            shown = [...earlier, ...shown];
        }
        return shown;
    });
    let nextPossible = $derived(shownPages[shownPages.length - 1] < allPages.length - 1);
    let previousPossible = $derived(shownPages[0] > 0);

    $effect(() => {
        if (currentPage > shownPages[0]) {
            currentPage = shownPages[0];
        }
    });
</script>

<svelte:window bind:innerWidth={width} />

<div class={"outer"}>
    <PageSelector {updateAvailable} {onNext} {nextPossible} {onPrevious} {previousPossible} />

    <div class={"inner"}>
        {#if shownPages.includes(0)}
            <Page {widthPx}>
                <EntryPage />
            </Page>
        {/if}

        {#if shownPages.includes(1)}
            <Page {widthPx}>
                <DailyOverviewPage />
            </Page>
        {/if}

        {#if shownPages.includes(2)}
            <Page {widthPx}>
                <SimpleTimePage />
            </Page>
        {/if}
    </div>

    <DailyData />
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
        align-items: flex-start
        justify-content: center
        background-color: lightgrey
        overflow: auto
</style>
