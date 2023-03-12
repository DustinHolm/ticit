<script>
    import { date, nextDayPossible } from "../stores/date";
    import { dateAsString } from "../util/time";
</script>

<div class="a">
    <button on:click={date.previous} aria-label="previous day">Previous</button>
    <span>{dateAsString($date)}</span>
    {#if $nextDayPossible}
        <button on:click={date.next} aria-label="next day">Next</button>
    {/if}
</div>

<style lang="sass">
    .a
        border: 1px solid black
        background-color: blue
</style>
