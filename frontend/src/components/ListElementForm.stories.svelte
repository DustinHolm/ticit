<script context="module" lang="ts">
    import ListElementForm from "./ListElementForm.svelte";

    export const meta = {
        title: "Components/ListElementForm",
        component: ListElementForm,
    };
</script>

<script lang="ts">
    import { Story } from "@storybook/addon-svelte-csf";
</script>

<Story name="Default">
    <ListElementForm label="Default">
        <svelte:fragment slot="time">
            <span class="large" id="time"> 10:24 </span>
        </svelte:fragment>

        <svelte:fragment slot="texts">
            <span class="large" id="name">Title</span>
        </svelte:fragment>

        <svelte:fragment slot="buttons">Button</svelte:fragment>
    </ListElementForm>
</Story>
