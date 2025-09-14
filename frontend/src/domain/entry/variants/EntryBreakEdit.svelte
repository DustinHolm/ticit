<script lang="ts">
    import Input from "../../../components/Input.svelte";
    import IconButton from "../../../components/IconButton.svelte";
    import Checkmark from "../../../components/icons/Checkmark.svelte";
    import Close from "../../../components/icons/Close.svelte";
    import TrashCan from "../../../components/icons/TrashCan.svelte";
    import { entries } from "../../stores/entries";
    import { timeAsString, timeFromString } from "../../../util/time";
    import ListElementForm from "../../../components/ListElementForm.svelte";
    import type { ExistingEntry } from "../../../types";

    interface Props {
        entry: ExistingEntry;
        endEdit: () => void;
    }

    let { entry, endEdit }: Props = $props();

    let newTime = $state(timeAsString(entry.time));
    let text = entry.entryType === "EndOfDay" ? "End of day" : entry.entryType;
    let backgroundColor = entry.entryType === "EndOfDay" ? "lightgreen" : "lightblue";

    const onConfirm = async () => {
        await entries.edit({
            id: entry.id,
            name: null,
            description: null,
            time: timeFromString(newTime),
            entryType: entry.entryType,
        });
        endEdit();
    };

    const onCancel = () => {
        newTime = timeAsString(entry.time);
        endEdit();
    };

    const onDelete = async () => {
        await entries.remove({
            id: entry.id,
            name: entry.name,
            description: entry.description,
            time: entry.time,
            entryType: entry.entryType,
        });
        endEdit();
    };
</script>

<ListElementForm {backgroundColor} label="editable break entry">
    {#snippet time()}
    
            <Input label="Time" bind:value={newTime} type={"time"} onEnter={onConfirm} />
        
    {/snippet}

    {#snippet texts()}
    
            <span aria-label="entry name" class="large" id="name">{text}</span>
        
    {/snippet}

    {#snippet buttons()}
    
            <IconButton onClick={onDelete} label="Delete entry">
                <TrashCan />
            </IconButton>

            <IconButton onClick={onCancel} label="Cancel">
                <Close />
            </IconButton>

            <IconButton onClick={onConfirm} label="Confirm">
                <Checkmark />
            </IconButton>
        
    {/snippet}
</ListElementForm>
