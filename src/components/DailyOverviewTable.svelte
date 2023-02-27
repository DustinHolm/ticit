<script>
    import { entrySumByName } from "../stores/entries";

    const getDisplayedDuration = (duration) => {
        const hours = Math.floor(duration / (1000 * 60 * 60));
        const minutes = Math.floor(duration / (1000 * 60)) - hours * 60;

        return `${hours}h ${minutes}m`;
    };
</script>

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Time spent</th>
        </tr>
    </thead>
    <tbody>
        {#each $entrySumByName.entries() as entry}
            <tr>
                <td>{entry.name}</td>
                <td>{entry.description ? entry.description : "-"}</td>
                <td>{getDisplayedDuration(entry.duration)}</td>
            </tr>
        {/each}
    </tbody>
</table>
