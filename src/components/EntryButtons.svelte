<script>
    import { entries, possibleEntryTypes } from "../stores/entries";
    import { now } from "../stores/now";
</script>

<button on:click={() => entries.takeBreak($now)} disabled={!$possibleEntryTypes.includes("Break")}
    >Take break</button
>
<button on:click={() => entries.endDay($now)} disabled={!$possibleEntryTypes.includes("EndOfDay")}
    >End day</button
>
