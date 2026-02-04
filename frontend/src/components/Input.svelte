<script lang="ts">
    import type { KeyboardEventHandler } from "svelte/elements";

    interface Props {
        label: string;
        value: any; // eslint-disable-line @typescript-eslint/no-explicit-any
        type?: "text" | "time";
        options?: string[];
        onEnter?: (() => void) | null;
    }

    let {
        label,
        value = $bindable(),
        type = "text",
        options = [],
        onEnter = null,
    }: Props = $props();

    let datalistId = crypto.randomUUID();

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
        <input bind:value onkeypress={handleKeyPress} type="text" list={datalistId} />
    {/if}
    {#if options.length > 0}
        <datalist id={datalistId}>
            {#each options as option}
                <option value={option}></option>
            {/each}
        </datalist>
    {/if}
</label>

<style lang="sass">
    label
        font-size: small
        
    input
        display: block
</style>
