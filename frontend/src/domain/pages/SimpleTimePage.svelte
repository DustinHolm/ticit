<script lang="ts">
    import { simpleTime } from "../stores/simpleTime";
    import Table from "../../components/Table.svelte";
    import { timeAsString } from "../../util/time";

    const headers = [
        { name: "Type", width: "50%" },
        { name: "Time", width: "50%" },
    ];

    let rows = $derived.by(async () => {
        const st = await $simpleTime;
        const r = [];
        if (st.startOfWork) {
            r.push(["Start of work", timeAsString(st.startOfWork)]);
        }
        if (st.startOfBreak) {
            r.push(["Start of break", timeAsString(st.startOfBreak)]);
        }
        if (st.endOfBreak) {
            r.push(["End of break", timeAsString(st.endOfBreak)]);
        }
        if (st.endOfDay) {
            r.push(["End of work", timeAsString(st.endOfDay)]);
        }
        return r;
    });
</script>

{#await rows}
    <Table {headers} rows={[]} />
{:then resolvedRows}
    <Table {headers} rows={resolvedRows} />
{/await}
