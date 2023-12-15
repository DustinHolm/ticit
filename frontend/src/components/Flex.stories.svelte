<script context="module" lang="ts">
    import Flex from "./Flex.svelte";

    export const meta = {
        title: "Components/Flex",
        component: { Flex },
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
    };
</script>

<script lang="ts">
    import { Story, Template } from "@storybook/addon-svelte-csf";
</script>

<Template let:args>
    <Flex {...args}>
        {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as i}
            <span>Element {i}</span>
        {/each}
    </Flex>
</Template>

<Story name="Default" />

<style lang="sass">
    span
        border: 1px solid black
        padding: 8px
</style>
