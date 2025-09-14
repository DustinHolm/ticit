<script module lang="ts">
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
