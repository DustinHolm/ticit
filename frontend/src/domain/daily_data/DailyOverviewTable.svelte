<script lang="ts">
    import { workEntriesSummaries } from "../stores/summaries";
    import { secondsAsDurationString } from "../../util/time";
</script>

<table>
    <thead>
        <tr>
            <th id="name">Name</th>
            <th id="description">Description</th>
            <th id="time">Time spent</th>
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
    #name, #description
        width: 40%

    #time
        width: 20%

    table
        width: 100%
        text-align: left
        border-collapse: collapse
        table-layout: fixed

    tr:not(:last-child)
        border-bottom: 1px solid lightgrey
        
    td, th
        padding: 8px
        overflow-wrap: break-word
        word-wrap: break-word
</style>
