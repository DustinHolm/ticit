<script lang="ts">
    import { workEntriesSummaries } from "../stores/summaries";
    import { secondsAsDurationString } from "../../util/time";
    import Table from "../../components/Table.svelte";

    const headers = [
        { name: "Name", width: "40%" },
        { name: "Description", width: "40%" },
        { name: "Time spent", width: "20%" },
    ];

    let rows = $derived.by(async () =>
        (await $workEntriesSummaries).map((entry) => [
            entry.name ? entry.name : "-",
            entry.description ? entry.description : "-",
            secondsAsDurationString(entry.duration),
        ]),
    );
</script>

{#await rows}
    <Table {headers} rows={[]} />
{:then resolvedRows}
    <Table {headers} rows={resolvedRows} />
{/await}
