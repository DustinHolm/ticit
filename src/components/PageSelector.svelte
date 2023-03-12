<script>
    export let onPrevious;
    export let previousPossible;
    export let onNext;
    export let nextPossible;
</script>

<div>
    <button on:click={onPrevious} disabled={!previousPossible}>Left</button>
    <button on:click={onNext} disabled={!nextPossible}>Right</button>
</div>
