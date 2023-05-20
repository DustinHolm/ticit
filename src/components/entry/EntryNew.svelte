<script>
    import IconButton from "../../bits/IconButton.svelte";
    import Input from "../../bits/Input.svelte";
    import Checkmark from "../../bits/icons/Checkmark.svelte";
    import Fireworks from "../../bits/icons/Fireworks.svelte";
    import Teabag from "../../bits/icons/Teabag.svelte";
    import { entries, possibleEntryTypes } from "../../stores/entries";
    import { now } from "../../stores/now";
    import { timeAsString } from "../../util/time";
    import EntryBase from "./EntryBase.svelte";

    let newName = null;
    let newDescription = null;

    const onBreak = () => entries.takeBreak($now);
    const onEnd = () => entries.endDay($now);
    const onConfirm = () => {
        entries.create({
            name: newName,
            description: newDescription,
            time: $now,
            entryType: "Work",
        });

        newName = null;
        newDescription = null;
    };
</script>

<EntryBase>
    <svelte:fragment slot="time">
        <span aria-label="entry time" class="large" id="time">
            {timeAsString($now)}
        </span>
    </svelte:fragment>

    <svelte:fragment slot="texts">
        <Input label="Name" bind:value={newName} onEnter={onConfirm} />

        <Input label="Description" bind:value={newDescription} onEnter={onConfirm} />
    </svelte:fragment>

    <svelte:fragment slot="buttons">
        <IconButton
            onClick={onEnd}
            disabled={!$possibleEntryTypes.includes("EndOfDay")}
            label="End day"
        >
            <Fireworks />
        </IconButton>

        <IconButton
            onClick={onBreak}
            disabled={!$possibleEntryTypes.includes("Break")}
            label="Take break"
        >
            <Teabag />
        </IconButton>

        <IconButton
            onClick={onConfirm}
            disabled={!$possibleEntryTypes.includes("Work")}
            label="Create"
        >
            <Checkmark />
        </IconButton>
    </svelte:fragment>
</EntryBase>
