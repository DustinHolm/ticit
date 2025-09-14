<script lang="ts">
    import type { KeyboardEventHandler } from "svelte/elements";

    interface Props {
        label: string;
        value: any; // eslint-disable-line @typescript-eslint/no-explicit-any
        type?: "text" | "time";
        onEnter?: (() => void) | null;
    }

    let {
        label,
        value = $bindable(),
        type = "text",
        onEnter = null
    }: Props = $props();

    const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (onEnter && event.key === "Enter") {
            onEnter();
        }
    };
</script>

<label>
    {label}
    {#if type === "time"}
        <input bind:value onkeypress={handleKeyPress} type="time" role="textbox" />
    {:else}
        <input bind:value onkeypress={handleKeyPress} type="text" />
    {/if}
</label>

<style lang="sass">
    label
        font-size: small
        
    input
        display: block
</style>
