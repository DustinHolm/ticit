import { invoke } from "@tauri-apps/api";
import { derived, get, writable } from "svelte/store";
import { dateAsIsoString, dateTimeAsString, dateTimeFromString, dateWithTime } from "../util/time";
import { date } from "./date";

const createEntries = () => {
    const internalStore = writable([]);
    let currentDate = get(date);

    const init = async () => {
        const entries = await invoke("all_entries_for_day", { day: dateAsIsoString(currentDate) });
        console.log("entries", entries);
        const parsedEntries = entries.map(parseEntry);
        internalStore.set(parsedEntries);
    };

    const create = async (entry) => {
        const formattedEntry = formatEntry(entry, currentDate);
        await invoke("new_entry", { entry: formattedEntry });
        await init();
    };

    const edit = async (entry) => {
        const formattedEntry = formatEntry(entry, currentDate);
        await invoke("edit_entry", { entry: formattedEntry });
        await init();
    };

    const remove = async (entry) => {
        const formattedEntry = formatEntry(entry, currentDate);
        await invoke("delete_entry", { entry: formattedEntry });
        await init();
    };

    const takeBreak = async (time) => {
        await invoke("take_break", { time: dateTimeAsString(dateWithTime(currentDate, time)) });
        await init();
    };

    const endDay = async (time) => {
        await invoke("end_day", { time: dateTimeAsString(dateWithTime(currentDate, time)) });
        await init();
    };

    const unsubscribeDate = date.subscribe((date) => {
        currentDate = date;
        init();
    });

    const subscribe = (run, invalidate) => {
        const unsubscribeEntries = internalStore.subscribe(run, invalidate);
        return () => {
            unsubscribeEntries();
            unsubscribeDate();
        };
    };

    return { init, subscribe, create, edit, remove, takeBreak, endDay };
};

const formatEntry = (entry, date) => {
    const id = entry.id !== undefined ? entry.id : null;
    const name = entry.name !== undefined ? entry.name : null;
    const description = entry.description !== undefined ? entry.description : null;
    const time = date
        ? dateTimeAsString(dateWithTime(date, entry.time))
        : dateTimeAsString(entry.time);
    const entry_type = entry.entryType ? entry.entryType : "Work";

    return { id, name, description, time, entry_type };
};

const parseEntry = (entry) => {
    const id = entry.id !== undefined ? entry.id : null;
    const name = entry.name !== undefined ? entry.name : null;
    const description = entry.description !== undefined ? entry.description : null;
    const time = dateTimeFromString(entry.time);
    const entryType = entry.entry_type;

    return { id, name, description, time, entryType };
};

export const entries = createEntries();

const entriesSummaries = derived(
    [date, entries],
    async ([$date], set) => {
        let result = await invoke("durations_for_day", { day: dateAsIsoString($date) });
        result = result.map((r) => ({ ...r, duration: Number.parseFloat(r.duration) }));
        console.log("summaries", result);
        set(result);
    },
    []
);

export const workEntriesSummaries = derived(entriesSummaries, (summaries) =>
    summaries.filter((s) => s.daily_summary_type === "Work")
);

export const breakEntry = derived(entriesSummaries, (summaries) =>
    summaries.find((s) => s.daily_summary_type === "Break")
);

export const totalTime = derived(workEntriesSummaries, (summaries) =>
    summaries.map((s) => s.duration).reduce((prev, current) => prev + current, 0)
);

export const possibleEntryTypes = derived(entries, ($entries) => {
    const isBreak = $entries.length > 0 && $entries.at(-1).entryType === "Break";
    const dayEnded = $entries.length > 0 && $entries.at(-1).entryType === "EndOfDay";

    if ($entries.length < 1) return ["Work"];
    if (dayEnded) return [];
    if (isBreak) return ["Work"];
    return ["Break", "EndOfDay", "Work"];
});
