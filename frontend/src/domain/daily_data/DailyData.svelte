<script lang="ts">
    import Flex from "../../components/Flex.svelte";
    import { breakEntry, totalTime } from "../stores/summaries";
    import { secondsAsDurationString } from "../../util/time";

    $: breakDuration = $breakEntry ? $breakEntry.duration : 0;
</script>

<Flex padding="8px">
    <span>Break time: {secondsAsDurationString(breakDuration)}</span>
    <span>Time worked: {secondsAsDurationString($totalTime)}</span>
</Flex>
