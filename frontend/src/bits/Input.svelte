<script>
    export let label;
    export let value;
    export let type = "text";
    export let onEnter = null;

    const handleKeyPress = (event) => {
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
