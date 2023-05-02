<script>
    import Flex from "../bits/Flex.svelte";
    import IconButton from "../bits/IconButton.svelte";
    import ArrowLeft from "../bits/icons/ArrowLeft.svelte";
    import ArrowRight from "../bits/icons/ArrowRight.svelte";
    import { date, nextDayPossible } from "../stores/date";
    import { breakEntry, totalTime } from "../stores/summaries";
    import { dateAsString, secondsAsDurationString } from "../util/time";

    $: breakDuration = $breakEntry ? $breakEntry.duration : 0;
    $: workDuration = $totalTime ? $totalTime : 0;
</script>

<Flex>
    <IconButton onClick={date.previous} label="previous day">
        <ArrowLeft />
    </IconButton>

    <div id="data-panel">
        <Flex direction="column">
            <span id="date">{dateAsString($date)}</span>
            <Flex>
                <span>Break time: {secondsAsDurationString(breakDuration)}</span>
                <span>Time worked: {secondsAsDurationString(workDuration)}</span>
            </Flex>
        </Flex>
    </div>

    <IconButton onClick={date.next} label="next day" disabled={!$nextDayPossible}>
        <ArrowRight />
    </IconButton>
</Flex>

<style lang="sass">
    #data-panel
        flex: 2 0 auto
        margin: 0 16px

    #date
        text-align: center
        font-size: larger
</style>
