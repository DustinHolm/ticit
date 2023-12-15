<script context="module" lang="ts">
    import Table from "./Table.svelte";

    export const meta = {
        title: "Components/Table",
        component: Table,
    };
</script>

<script lang="ts">
    import { Story } from "@storybook/addon-svelte-csf";
</script>

<Story name="Default">
    <Table
        headers={[
            { name: "Head a", width: "50%" },
            { name: "Head b", width: "25%" },
            { name: "Head c", width: "25%" },
        ]}
        rows={[
            ["1", "2", "3"],
            ["1", "2", "3"],
            ["1", "2", "3"],
            ["1", "2", "3"],
        ]}
    />
</Story>

<Story name="No rows">
    <Table
        headers={[
            { name: "Head a", width: "50%" },
            { name: "Head b", width: "25%" },
            { name: "Head c", width: "25%" },
        ]}
        rows={[]}
    />
</Story>
