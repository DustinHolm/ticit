import { type Subscriber, type Unsubscriber, derived, get, writable } from "svelte/store";
import { date } from "./date";
import { entries } from "./entries";
import type { DailySummary, ExistingEntry } from "../types";
import { dateAsIsoString } from "../util/time";
import { invokeGetAllDailySummaries } from "../util/tauri";

const createSummaries = () => {
    const internalStore = writable<DailySummary[]>([]);
    let currentDate = get(date);
    let currentEntries: ExistingEntry[] = [];

    const subscribe = (
        run: Subscriber<DailySummary[]>,
        invalidate?: (value?: DailySummary[]) => void
    ): Unsubscriber => {
        const unsubscribeSummaries = internalStore.subscribe(run, invalidate);
        const unsubscribeEntries = entries.subscribe((newEntries) => {
            if (
                newEntries.length !== currentEntries.length ||
                JSON.stringify(newEntries) !== JSON.stringify(currentEntries)
            ) {
                currentEntries = newEntries;
                loadAll().catch(() =>
                    console.error(
                        `Could not fetch entries for day ${dateAsIsoString(currentDate)}.`
                    )
                );
            }
        });
        const unsubscribeDate = date.subscribe((newDate) => {
            if (newDate !== currentDate) {
                currentDate = newDate;
            }
        });
        return () => {
            unsubscribeSummaries();
            unsubscribeEntries();
            unsubscribeDate();
        };
    };

    const loadAll = async () => {
        const result = await invokeGetAllDailySummaries(currentDate);
        internalStore.set(result);
    };

    return { subscribe };
};

const entriesSummaries = createSummaries();

export const workEntriesSummaries = derived(entriesSummaries, (summaries) =>
    summaries.filter((s) => s.dailySummaryType === "Work")
);

export const breakEntry = derived(entriesSummaries, (summaries) =>
    summaries.find((s) => s.dailySummaryType === "Break")
);

export const totalTime = derived(workEntriesSummaries, (summaries) =>
    summaries.map((s) => s.duration).reduce((prev, current) => prev + current, 0)
);
