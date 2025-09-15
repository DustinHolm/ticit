<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import Flex from "./Flex.svelte";

    const { Story } = defineMeta({
        title: "Components/Flex",
        component: Flex,
        argTypes: {
            direction: {
                control: "radio",
                options: ["row", "row-reverse", "column", "column-reverse", "initial", "inherit"],
            },
            grow: { control: "boolean" },
            justifyContent: {
                control: "radio",
                options: [
                    "flex-start",
                    "flex-end",
                    "center",
                    "space-between",
                    "space-around",
                    "space-evenly",
                    "initial",
                    "inherit",
                ],
            },
            alignItems: {
                control: "radio",
                options: [
                    "normal",
                    "stretch",
                    "center",
                    "flex-start",
                    "flex-end",
                    "baseline",
                    "initial",
                    "inherit",
                ],
            },
            padding: { control: "text" },
        },
    });
</script>

<Story name="Default">
    {#snippet template(args)}
        <Flex {...args}>
            {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as i}
                <span>Element {i}</span>
            {/each}
        </Flex>
    {/snippet}
</Story>

<style lang="sass">
    span
        border: 1px solid black
        padding: 8px
</style>
