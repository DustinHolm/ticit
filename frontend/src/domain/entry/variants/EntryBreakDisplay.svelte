<script lang="ts">
    import IconButton from "../../../components/IconButton.svelte";
    import Pencil from "../../../components/icons/Pencil.svelte";
    import type { ExistingEntry } from "../../../types";
    import { timeAsString } from "../../../util/time";
    import ListElementForm from "../../../components/ListElementForm.svelte";

    interface Props {
        entry: ExistingEntry;
        startEdit: () => void;
    }

    let { entry, startEdit }: Props = $props();

    let text = entry.entryType === "EndOfDay" ? "End of day" : entry.entryType;
    let backgroundColor = entry.entryType === "EndOfDay" ? "lightgreen" : "lightblue";

    const onEdit = () => {
        startEdit();
    };
</script>

<ListElementForm {backgroundColor} label="readonly break entry">
    {#snippet time()}
    
            <span aria-label="entry time" class="large" id="time">
                {timeAsString(entry.time)}
            </span>
        
    {/snippet}

    {#snippet texts()}
    
            <span aria-label="entry name" class="large" id="name">{text}</span>
        
    {/snippet}

    {#snippet buttons()}
    
            <IconButton onClick={onEdit} label="Edit entry">
                <Pencil />
            </IconButton>
        
    {/snippet}
</ListElementForm>
