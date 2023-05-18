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
    <IconButton onClick={onPrevious} disabled={!previousPossible} label="Show previous content">
        <ArrowLeft />
    </IconButton>
    <IconButton onClick={onNext} disabled={!nextPossible} label="Show next content">
        <ArrowRight />
    </IconButton>
</Flex>
