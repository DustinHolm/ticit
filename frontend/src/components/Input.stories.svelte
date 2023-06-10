<script lang="ts">
    import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
    import Input from "./Input.svelte";

    let value: unknown = undefined;
</script>

<Meta
    title="Components/Input"
    component={Input}
    argTypes={{
        label: { control: "text" },
        type: {
            control: "radio",
            options: ["text", "time"],
        },
        onEnter: { action: "enter", control: false },
    }}
/>

<Template let:args>
    <Input {...args} bind:value />
</Template>

<Story name="Default" />

<Story name="Text" args={{ type: "text" }} />

<Story name="Time" args={{ type: "time" }} />
