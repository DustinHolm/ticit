<script>
    import { breakEntry, totalTime } from "../stores/summaries";
    import { secondsAsDurationString } from "../util/time";

    $: breakDuration = $breakEntry ? $breakEntry.duration : 0;
    $: workDuration = $totalTime ? $totalTime : 0;
</script>

<div class="a">
    <span>DailyData</span>
    <span>Break time: {secondsAsDurationString(breakDuration)}</span>
    <span>Time worked: {secondsAsDurationString(workDuration)}</span>
</div>

<style lang="sass">
    .a
        border: 1px solid black
        background-color: yellow
        display: flex

    .a > *
        flex: auto
</style>
