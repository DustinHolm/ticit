<script lang="ts">
    import type { KeyboardEventHandler } from "svelte/elements";

    export let label: string;
    export let value: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    export let type: "text" | "time" = "text";
    export let onEnter: (() => void) | null = null;

    const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (onEnter && event.key === "Enter") {
            onEnter();
        }
    };
</script>

<label>
    {label}
    {#if type === "time"}
        <input bind:value on:keypress={handleKeyPress} type="time" role="textbox" />
    {:else}
        <input bind:value on:keypress={handleKeyPress} type="text" />
    {/if}
</label>

<style lang="sass">
    label
        font-size: small
        
    input
        display: block
</style>
