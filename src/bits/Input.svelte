<script>
    export let label;
    export let value;
    export let type = "text";
</script>

<div>
    <label>
        {label}
        {#if type === "time"}
            <input bind:value type="time" role="textbox" />
        {:else}
            <input bind:value type="text" />
        {/if}
    </label>
</div>

<style lang="sass">
    label
        font-size: small
    input
        display: block
</style>
