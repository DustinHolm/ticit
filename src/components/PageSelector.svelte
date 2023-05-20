<script>
    import Flex from "../bits/Flex.svelte";
    import IconButton from "../bits/IconButton.svelte";
    import ArrowLeft from "../bits/icons/ArrowLeft.svelte";
    import ArrowRight from "../bits/icons/ArrowRight.svelte";
    import { date, nextDayPossible } from "../stores/date";
    import { dateAsString } from "../util/time";

    export let onPrevious;
    export let previousPossible;
    export let onNext;
    export let nextPossible;
</script>

<Flex padding="8px">
    <IconButton onClick={onPrevious} disabled={!previousPossible} label="Show previous content">
        <ArrowLeft />
    </IconButton>

    <Flex alignItems="center">
        <IconButton onClick={date.previous} label="Previous day" size="small">
            <ArrowLeft />
        </IconButton>

        <span id="date">{dateAsString($date)}</span>

        <IconButton onClick={date.next} label="Next day" disabled={!$nextDayPossible} size="small">
            <ArrowRight />
        </IconButton>
    </Flex>

    <IconButton onClick={onNext} disabled={!nextPossible} label="Show next content">
        <ArrowRight />
    </IconButton>
</Flex>

<style lang="sass">
    #date
        text-align: center
        font-size: larger
        margin: 0 16px
</style>
