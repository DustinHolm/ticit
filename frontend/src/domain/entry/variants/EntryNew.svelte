<script lang="ts">
    import IconButton from "../../../components/IconButton.svelte";
    import Input from "../../../components/Input.svelte";
    import ListElementForm from "../../../components/ListElementForm.svelte";
    import Checkmark from "../../../components/icons/Checkmark.svelte";
    import Fireworks from "../../../components/icons/Fireworks.svelte";
    import Teabag from "../../../components/icons/Teabag.svelte";
    import { entries, possibleEntryTypes } from "../../stores/entries";
    import { now } from "../../stores/now";
    import { timeAsString } from "../../../util/time";

    let newName: string | null = null;
    let newDescription: string | null = null;

    const onBreak = () => entries.takeBreak($now);
    const onEnd = () => entries.endDay($now);
    const onConfirm = async () => {
        await entries.create({
            name: newName,
            description: newDescription,
            time: $now,
            entryType: "Work",
        });

        newName = null;
        newDescription = null;
    };
</script>

<ListElementForm label="new entry">
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
            label="Create entry"
        >
            <Checkmark />
        </IconButton>
    </svelte:fragment>
</ListElementForm>
