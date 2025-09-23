import { derived } from "svelte/store";
import { date } from "./date";
import { entries } from "./entries";
import { invokeGetAllDailySummaries } from "../../util/tauri";

const entriesSummaries = derived(
    [entries, date],
    async ([, dateValue]) => await invokeGetAllDailySummaries(dateValue),
);

export const workEntriesSummaries = derived(entriesSummaries, async (summaries) =>
    (await summaries).filter((s) => s.dailySummaryType === "Work"),
);

export const breakEntry = derived(entriesSummaries, async (summaries) =>
    (await summaries).find((s) => s.dailySummaryType === "Break"),
);

export const totalTime = derived(workEntriesSummaries, async (summaries) =>
    (await summaries).map((s) => s.duration).reduce((prev, current) => prev + current, 0),
);
