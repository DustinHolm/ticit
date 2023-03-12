import { invoke } from "@tauri-apps/api";
import { derived, get, writable } from "svelte/store";
import { dateAsIsoString, dateTimeAsString, dateTimeFromString, dateWithTime } from "../util/time";
import { date } from "./date";

const createEntries = () => {
    const internalStore = writable([]);
    let currentDate = get(date);

    const init = async () => {
        const entries = await invoke("all_entries_for_day", { day: dateAsIsoString(currentDate) });
        const parsedEntries = entries.map(parseEntry);
        internalStore.set(parsedEntries);
    };

    const create = async (entry) => {
        const formattedEntry = formatWorkEntry(entry, currentDate);
        await invoke("new_entry", { entry: formattedEntry });
        await init();
    };

    const edit = async (entry) => {
        const formattedEntry = formatWorkEntry(entry, currentDate);
        await invoke("edit_entry", { entry: formattedEntry });
        await init();
    };

    const remove = async (entry) => {
        const formattedEntry = formatWorkEntry(entry, currentDate);
        await invoke("delete_entry", { entry: formattedEntry });
        await init();
    };

    const toggleBreak = async (time) => {
        await invoke("toggle_break", { time: dateTimeAsString(dateWithTime(currentDate, time)) });
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

    return { init, subscribe, create, edit, remove, toggleBreak, endDay };
};

const formatWorkEntry = (entry, date) => {
    const id = entry.id ? entry.id : null;
    const name = entry.name ? entry.name : null;
    const description = entry.description ? entry.description : null;
    const time = date
        ? dateTimeAsString(dateWithTime(date, entry.time))
        : dateTimeAsString(entry.time);
    const entry_type = "Work";

    return { id, name, description, time, entry_type };
};

const parseEntry = (entry) => {
    const id = entry.id ? entry.id : null;
    const name = entry.name ? entry.name : null;
    const description = entry.description ? entry.description : null;
    const time = dateTimeFromString(entry.time);
    const entryType = entry.entry_type;

    return { id, name, description, time, entryType };
};

export const entries = createEntries();

export const entrySumByName = derived(
    [date, entries],
    async ([$date], set) => {
        const result = await invoke("durations_for_day", { day: dateAsIsoString($date) });
        set(result);
    },
    []
);

export const possibleEntryTypes = derived(entries, ($entries) => {
    const isBreak =
        $entries.length > 1 &&
        $entries.at(-1).entryType === "Break" &&
        $entries.at(-2).entryType !== "Break";

    const justFinishedBreak =
        $entries.length > 1 &&
        $entries.at(-1).entryType === "Break" &&
        $entries.at(-2).entryType === "Break";

    if ($entries.length < 1) return ["Work"];
    if (isBreak) return ["Break"];
    if (!isBreak && justFinishedBreak) return ["Work"];
    return ["Break", "EndOfDay", "Work"];
});
