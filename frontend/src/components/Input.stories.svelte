<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import Input from "./Input.svelte";

    const { Story } = defineMeta({
        title: "Components/Input",
        component: Input,
        argTypes: {
            label: { control: "text" },
            type: {
                control: "radio",
                options: ["text", "time"],
            },
            onEnter: { action: "enter", control: false },
        },
    });
</script>

<Story name="Default" />

<Story name="Text" args={{ type: "text" }} />

<Story name="Time" args={{ type: "time" }} />

<Story name="Options" args={{ type: "text", options: ["Hello world", "foobar"] }} />
