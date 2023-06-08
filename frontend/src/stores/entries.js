import { invoke } from "@tauri-apps/api";
import { derived, get, writable } from "svelte/store";
import { dateAsIsoString, dateTimeAsString, dateTimeFromString, dateWithTime } from "../util/time";
import { date } from "./date";

const createEntries = () => {
    const internalStore = writable([]);
    let currentDate = get(date);

    const subscribe = (run, invalidate) => {
        const unsubscribeEntries = internalStore.subscribe(run, invalidate);
        const unsubscribeDate = date.subscribe((newDate) => {
            if (newDate !== currentDate) {
                currentDate = newDate;
                loadAll();
            }
        });
        return () => {
            unsubscribeEntries();
            unsubscribeDate();
        };
    };

    const loadAll = async () => {
        const entries = await invoke("all_entries_for_day", { day: dateAsIsoString(currentDate) });
        const parsedEntries = entries.map(parseEntry);
        internalStore.set(parsedEntries);
    };

    const create = async (entry) => {
        const formattedEntry = formatEntry(entry, currentDate);
        await invoke("new_entry", { entry: formattedEntry });
        await loadAll();
    };

    const edit = async (entry) => {
        const formattedEntry = formatEntry(entry, currentDate);
        await invoke("edit_entry", { entry: formattedEntry });
        await loadAll();
    };

    const remove = async (entry) => {
        const formattedEntry = formatEntry(entry, currentDate);
        await invoke("delete_entry", { entry: formattedEntry });
        await loadAll();
    };

    const takeBreak = async (time) => {
        await invoke("take_break", { time: dateTimeAsString(dateWithTime(currentDate, time)) });
        await loadAll();
    };

    const endDay = async (time) => {
        await invoke("end_day", { time: dateTimeAsString(dateWithTime(currentDate, time)) });
        await loadAll();
    };

    return { loadAll, subscribe, create, edit, remove, takeBreak, endDay };
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

export const possibleEntryTypes = derived(entries, ($entries) => {
    const isBreak = $entries.length > 0 && $entries.at(-1).entryType === "Break";
    const dayEnded = $entries.length > 0 && $entries.at(-1).entryType === "EndOfDay";

    if ($entries.length < 1) return ["Work"];
    if (dayEnded) return [];
    if (isBreak) return ["Work"];
    return ["Break", "EndOfDay", "Work"];
});
