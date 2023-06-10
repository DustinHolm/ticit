<script>
    import { Meta, Story } from "@storybook/addon-svelte-csf";
    import IconButton from "./IconButton.svelte";
    import Pencil from "./icons/Pencil.svelte";
    import ArrowRight from "./icons/ArrowRight.svelte";
    import ChevronLeft from "./icons/ChevronLeft.svelte";
    import Teabag from "./icons/Teabag.svelte";
</script>

<Meta
    title="Components/IconButton"
    component={IconButton}
    argTypes={{
        disabled: { control: "boolean" },
        size: { control: "radio", options: ["small", "medium", "large"] },
        label: { control: "text" },
        onClick: { action: "click", control: false },
    }}
/>

<Story name="WithPencil" let:args>
    <IconButton {...args}>
        <Pencil />
    </IconButton>
</Story>

<Story name="WithTeabag" let:args>
    <IconButton {...args}>
        <Teabag />
    </IconButton>
</Story>

<Story name="WithChevronLeft" let:args>
    <IconButton {...args}>
        <ChevronLeft />
    </IconButton>
</Story>

<Story name="WithArrowRight" let:args>
    <IconButton {...args}>
        <ArrowRight />
    </IconButton>
</Story>
