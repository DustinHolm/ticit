<script lang="ts">
    import type { MouseEventHandler } from "svelte/elements";

    export let disabled = false;
    export let onClick: MouseEventHandler<HTMLButtonElement> | null = null;
    export let size: "small" | "medium" | "large" = "medium";
    export let label: string | null = null;
    export let color: string = "black";

    const sizes = {
        small: 20,
        medium: 25,
        large: 30,
    };
</script>

<button on:click={onClick} {disabled} class={size} title={label}>
    <svg class:disabled viewBox={"0 0 64 64"} height={sizes[size]} width={sizes[size]} fill={color}>
        <slot />
    </svg>
</button>

<style lang="sass">
    svg.disabled
        fill: lightgrey

    button
        margin: 4px
        padding: 2px
        background-color: white
        border: 2px solid lightgrey
        border-radius: 50%

    button:hover:enabled
        background-color: lightgrey

    button.small
        height: 30px
        width: 30px

    button.medium
        height: 35px
        width: 35px

    button.large
        height: 40px
        width: 40px
</style>
