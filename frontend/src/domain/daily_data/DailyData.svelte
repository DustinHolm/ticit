<script lang="ts">
    import Flex from "../../components/Flex.svelte";
    import { breakEntry, totalTime, weeklyTotalTime } from "../stores/summaries";
    import { secondsAsDurationString } from "../../util/time";

    let breakDuration = $derived($breakEntry.then((entry) => (entry ? entry.duration : 0)));
</script>

{#await Promise.all([$totalTime, breakDuration, $weeklyTotalTime])}
    <Flex padding="8px">
        <div>
            <span>Time worked: {secondsAsDurationString(0)}</span>
            <span>Break time: {secondsAsDurationString(0)}</span>
        </div>

        <span>Total time Week: {secondsAsDurationString(0)}</span>
    </Flex>
{:then resolved}
    <Flex padding="8px">
        <span>
            Work: {secondsAsDurationString(resolved[0])}
            (Break: {secondsAsDurationString(resolved[1])})
        </span>

        <span>Total work this week: {secondsAsDurationString(resolved[2])}</span>
    </Flex>
{/await}
