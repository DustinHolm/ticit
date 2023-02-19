<script>
    import { now } from "../stores/now";

    let date = $now;
    $: displayDate = date.toLocaleDateString("de-DE");
    $: nextDayPossible = $now.getTime() - date.getTime() > 1000 * 60 * 60 * 24;

    const onPrevious = () => {
        date.setDate(date.getDate() - 1);
        date = date;
    };
    const onNext = () => {
        date.setDate(date.getDate() + 1);
        date = date;
    };
</script>

<div class="a">
    <button on:click={onPrevious} aria-label="previous day">Previous</button>
    <span>{displayDate}</span>
    {#if nextDayPossible}
        <button on:click={onNext} aria-label="next day">Next</button>
    {/if}
</div>

<style lang="sass">
    .a
        border: 1px solid black
        background-color: blue
</style>
