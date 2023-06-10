<script lang="ts">
    import { Meta, Story } from "@storybook/addon-svelte-csf";
    import Page from "./Page.svelte";
</script>

<Meta title="Components/Page" component={Page} />

<Story name="Default">
    <div class="outer">
        Outer div
        <Page>Content in Page</Page>
    </div>
</Story>

<Story name="Long content">
    <div class="outer">
        Outer div
        <Page>
            <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
            {#each Array.from({ length: 100 }) as _, i}
                <p>Line {i + 1} in Page</p>
            {/each}
        </Page>
    </div>
</Story>

<Story name="Wide content">
    <div class="outer">
        Outer div
        <Page>
            <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
            {#each Array.from({ length: 100 }) as _, i}
                <span>String {i + 1} in Page</span>
            {/each}
        </Page>
    </div>
</Story>

<style lang="sass">
    .outer
        background-color: lightgreen
        padding: 16px

    span
        padding-right: 8px
</style>
