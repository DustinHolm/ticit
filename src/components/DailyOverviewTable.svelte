<script>
    import { workEntriesSummaries } from "../stores/summaries";
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
        {#each $workEntriesSummaries as entry}
            <tr>
                <td>{entry.name ? entry.name : "-"}</td>
                <td>{entry.description ? entry.description : "-"}</td>
                <td>{secondsAsDurationString(entry.duration)}</td>
            </tr>
        {/each}
    </tbody>
</table>

<style lang="sass">
    table
        width: 100%
        text-align: left
</style>
