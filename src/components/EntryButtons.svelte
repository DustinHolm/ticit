<script>
    import { entries, possibleEntryTypes } from "../stores/entries";
    import { now } from "../stores/now";

    $: isBreakPossible = $possibleEntryTypes.includes("Break");
    $: isBreak = $possibleEntryTypes.length === 1 && isBreakPossible;
    $: isEndDayPossible = $possibleEntryTypes.includes("EndOfDay");
</script>

<button on:click={() => entries.toggleBreak($now)} disabled={!isBreakPossible}>
    {isBreak ? "Resume working" : "Take break"}
</button>
<button on:click={() => entries.endDay($now)} disabled={!isEndDayPossible}>End day</button>
