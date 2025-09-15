<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import Table from "./Table.svelte";

    const { Story } = defineMeta({
        title: "Components/Table",
        component: Table,
    });
</script>

<Story name="Default" asChild>
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

<Story name="No rows" asChild>
    <Table
        headers={[
            { name: "Head a", width: "50%" },
            { name: "Head b", width: "25%" },
            { name: "Head c", width: "25%" },
        ]}
        rows={[]}
    />
</Story>
