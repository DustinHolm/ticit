<script lang="ts">
    import Flex from "../../components/Flex.svelte";
    import IconButton from "../../components/IconButton.svelte";
    import ArrowLeft from "../../components/icons/ArrowLeft.svelte";
    import ArrowRight from "../../components/icons/ArrowRight.svelte";
    import { date, nextDayPossible } from "../stores/date";
    import { dateAsString } from "../../util/time";

    interface Props {
        updateAvailable: boolean;
        onPrevious: () => void;
        previousPossible: boolean;
        onNext: () => void;
        nextPossible: boolean;
    }

    let { updateAvailable, onPrevious, previousPossible, onNext, nextPossible }: Props = $props();
</script>

<Flex padding="8px">
    <Flex direction="column" justifyContent="flex-end" alignItems="center">
        {#if updateAvailable}
            <a href="https://github.com/DustinHolm/ticit/releases" target="_blank">Update</a>
        {/if}
        <IconButton onClick={onPrevious} disabled={!previousPossible} label="Show previous content">
            <ArrowLeft />
        </IconButton>
    </Flex>

    <Flex alignItems="center">
        <IconButton onClick={date.previous} label="Previous day" size="small">
            <ArrowLeft />
        </IconButton>

        <span id="date">{dateAsString($date)}</span>

        <IconButton onClick={date.next} label="Next day" disabled={!$nextDayPossible} size="small">
            <ArrowRight />
        </IconButton>
    </Flex>

    <Flex direction="column" justifyContent="flex-end" alignItems="center">
        <IconButton onClick={onNext} disabled={!nextPossible} label="Show next content">
            <ArrowRight />
        </IconButton>
    </Flex>
</Flex>

<style lang="sass">
    #date
        text-align: center
        font-size: larger
        margin: 0 16px
</style>
