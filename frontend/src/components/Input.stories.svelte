<script context="module" lang="ts">
    import Input from "./Input.svelte";

    export const meta = {
        title: "Components/Input",
        component: { Input },
        argTypes: {
            label: { control: "text" },
            type: {
                control: "radio",
                options: ["text", "time"],
            },
            onEnter: { action: "enter", control: false },
        },
    };
</script>

<script lang="ts">
    import { Story, Template } from "@storybook/addon-svelte-csf";

    let value: unknown = undefined;
</script>

<Template let:args>
    <Input {...args} bind:value />
</Template>

<Story name="Default" />

<Story name="Text" args={{ type: "text" }} />

<Story name="Time" args={{ type: "time" }} />
