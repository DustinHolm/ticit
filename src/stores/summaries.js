import { invoke } from "@tauri-apps/api";
import { derived, get, writable } from "svelte/store";
import { dateAsIsoString } from "../util/time";
import { date } from "./date";
import { entries } from "./entries";

const createSummaries = () => {
    const internalStore = writable([]);
    let currentDate = get(date);
    let currentEntries = [];

    const subscribe = (run, invalidate) => {
        const unsubscribeSummaries = internalStore.subscribe(run, invalidate);
        const unsubscribeEntries = entries.subscribe((newEntries) => {
            if (
                newEntries.length !== currentEntries.length ||
                JSON.stringify(newEntries) !== JSON.stringify(currentEntries)
            ) {
                currentEntries = newEntries;
                loadAll();
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
        let result = await invoke("durations_for_day", { day: dateAsIsoString(currentDate) });
        result = result.map((r) => ({ ...r, duration: Number.parseFloat(r.duration) }));
        console.log("summaries", result);
        internalStore.set(result);
    };

    return { subscribe };
};

const entriesSummaries = createSummaries();

export const workEntriesSummaries = derived(entriesSummaries, (summaries) =>
    summaries.filter((s) => s.daily_summary_type === "Work")
);

export const breakEntry = derived(entriesSummaries, (summaries) =>
    summaries.find((s) => s.daily_summary_type === "Break")
);

export const totalTime = derived(workEntriesSummaries, (summaries) =>
    summaries.map((s) => s.duration).reduce((prev, current) => prev + current, 0)
);
