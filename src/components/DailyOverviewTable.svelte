<script>
    import { entrySumByName } from "../stores/entries";
    import { secondsAsDurationString } from "../util/time";
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
        {#each $entrySumByName as entry}
            <tr>
                <td>{entry.name ? entry.name : "-"}</td>
                <td>{entry.description ? entry.description : "-"}</td>
                <td>{secondsAsDurationString(entry.duration)}</td>
            </tr>
        {/each}
    </tbody>
</table>
