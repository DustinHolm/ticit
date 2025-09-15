<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import ListElementForm from "./ListElementForm.svelte";

    const { Story } = defineMeta({
        title: "Components/ListElementForm",
        component: ListElementForm,
    });
</script>

<Story name="Default" asChild>
    <ListElementForm label="Default">
        {#snippet time()}
            <span class="large" id="time"> 10:24 </span>
        {/snippet}

        {#snippet texts()}
            <span class="large" id="name">Title</span>
        {/snippet}

        {#snippet buttons()}
            Button
        {/snippet}
    </ListElementForm>
</Story>
