<script lang="ts">
    import Flex from "../../components/Flex.svelte";
    import { breakEntry, totalTime } from "../stores/summaries";
    import { secondsAsDurationString } from "../../util/time";

    let breakDuration = $derived($breakEntry.then((entry) => (entry ? entry.duration : 0)));
</script>

{#await Promise.all([breakDuration, $totalTime])}
    <Flex padding="8px">
        <span>Break time: {secondsAsDurationString(0)}</span>
        <span>Time worked: {secondsAsDurationString(0)}</span>
    </Flex>
{:then resolved}
    <Flex padding="8px">
        <span>Break time: {secondsAsDurationString(resolved[0])}</span>
        <span>Time worked: {secondsAsDurationString(resolved[1])}</span>
    </Flex>
{/await}
