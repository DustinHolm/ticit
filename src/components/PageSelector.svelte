<script>
    import Flex from "../bits/Flex.svelte";
    import IconButton from "../bits/IconButton.svelte";
    import ArrowLeft from "../bits/icons/ArrowLeft.svelte";
    import ArrowRight from "../bits/icons/ArrowRight.svelte";

    export let onPrevious;
    export let previousPossible;
    export let onNext;
    export let nextPossible;
</script>

<Flex>
    <IconButton onClick={onPrevious} disabled={!previousPossible}>
        <ArrowLeft />
    </IconButton>
    <IconButton onClick={onNext} disabled={!nextPossible}>
        <ArrowRight />
    </IconButton>
</Flex>
