<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import IconButton from "./IconButton.svelte";
    import Pencil from "./icons/Pencil.svelte";
    import ArrowRight from "./icons/ArrowRight.svelte";
    import ChevronLeft from "./icons/ChevronLeft.svelte";
    import Teabag from "./icons/Teabag.svelte";

    const { Story } = defineMeta({
        title: "Components/IconButton",
        component: IconButton,
        argTypes: {
            disabled: { control: "boolean" },
            size: { control: "radio", options: ["small", "medium", "large"] },
            label: { control: "text" },
            onClick: { action: "click", control: false },
        },
    });
</script>

<Story name="WithPencil">
    {#snippet template(args)}
        <IconButton {...args}>
            <Pencil />
        </IconButton>
    {/snippet}
</Story>

<Story name="WithTeabag">
    {#snippet template(args)}
        <IconButton {...args}>
            <Teabag />
        </IconButton>
    {/snippet}
</Story>

<Story name="WithChevronLeft">
    {#snippet template(args)}
        <IconButton {...args}>
            <ChevronLeft />
        </IconButton>
    {/snippet}
</Story>

<Story name="WithArrowRight">
    {#snippet template(args)}
        <IconButton {...args}>
            <ArrowRight />
        </IconButton>
    {/snippet}
</Story>
