<script>
    import { onDestroy } from "svelte";
    import { entries } from "../stores/entries";
    export let id = null;
    export let createOnly = false;

    let entry = { name: "test", time: "20:12" };

    const unsubscribe = entries.subscribe((all) => {
        const found = all.find((e) => e.id === id);
        if (found) {
            entry = found;
        }
    });

    let now = new Date();
    $: time = entry.time || now.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });

    onDestroy(unsubscribe);
</script>

<div class="a">
    <span>{time}</span>
    <span>{entry.name || "Undefined"}</span>
    {#if entry.description}
        <span>{entry.description}</span>
    {/if}
    <button>Restart Task</button>
</div>

<style lang="sass">
    .a
        border: 1px solid black
        background-color: red
        display: flex

    .a > *
        flex: auto
</style>
