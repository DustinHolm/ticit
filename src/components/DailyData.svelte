<script>
    import Flex from "../bits/Flex.svelte";
    import { breakEntry, totalTime } from "../stores/summaries";
    import { secondsAsDurationString } from "../util/time";

    $: breakDuration = $breakEntry ? $breakEntry.duration : 0;
    $: workDuration = $totalTime ? $totalTime : 0;
</script>

<Flex padding="8px">
    <span>Break time: {secondsAsDurationString(breakDuration)}</span>
    <span>Time worked: {secondsAsDurationString(workDuration)}</span>
</Flex>

<style lang="sass">
    #data-panel
        flex: 2 0 auto
        margin: 0 16px

    #date
        text-align: center
        font-size: larger
</style>
