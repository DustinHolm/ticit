<script lang="ts">
    import IconButton from "../../bits/IconButton.svelte";
    import Pencil from "../../bits/icons/Pencil.svelte";
    import type { ExistingEntry } from "../../types";
    import { timeAsString } from "../../util/time";
    import EntryBase from "./EntryBase.svelte";

    export let entry: ExistingEntry;
    export let startEdit: () => void;

    let text = entry.entryType === "EndOfDay" ? "End of day" : entry.entryType;

    const onEdit = () => {
        startEdit();
    };
</script>

<EntryBase entryType={entry.entryType} label="readonly break entry">
    <svelte:fragment slot="time">
        <span aria-label="entry time" class="large" id="time">
            {timeAsString(entry.time)}
        </span>
    </svelte:fragment>

    <svelte:fragment slot="texts">
        <span aria-label="entry name" class="large" id="name">{text}</span>
    </svelte:fragment>

    <svelte:fragment slot="buttons">
        <IconButton onClick={onEdit} label="Edit entry">
            <Pencil />
        </IconButton>
    </svelte:fragment>
</EntryBase>
