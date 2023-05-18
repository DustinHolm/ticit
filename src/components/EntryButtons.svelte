<script>
    import IconButton from "../bits/IconButton.svelte";
    import Fireworks from "../bits/icons/Fireworks.svelte";
    import Teabag from "../bits/icons/Teabag.svelte";
    import { entries, possibleEntryTypes } from "../stores/entries";
    import { now } from "../stores/now";

    const onBreak = () => entries.takeBreak($now);
    const onEnd = () => entries.endDay($now);
</script>

<div>
    <IconButton
        onClick={onBreak}
        disabled={!$possibleEntryTypes.includes("Break")}
        size="large"
        label="Take break"
    >
        <Teabag />
    </IconButton>
    <IconButton
        onClick={onEnd}
        disabled={!$possibleEntryTypes.includes("EndOfDay")}
        size="large"
        label="End day"
    >
        <Fireworks />
    </IconButton>
</div>

<style lang="sass">
    div
        display: flex
        justify-content: flex-end
</style>
