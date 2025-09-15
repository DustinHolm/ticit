import { invoke } from "@tauri-apps/api/core";
import { dateAsIsoString, dateTimeAsString, dateTimeFromString, dateWithTime } from "./time";
import type {
    DailySummary,
    ExistingEntry,
    NewEntry,
    TauriDailySummary,
    TauriExistingEntry,
    TauriNewEntry,
} from "../types";
import { check } from "@tauri-apps/plugin-updater";

export const invokeGetAllEntries = async (currentDate: Date): Promise<ExistingEntry[]> => {
    const tauriEntries: TauriExistingEntry[] = await invoke("all_entries_for_day", {
        day: dateAsIsoString(currentDate),
    });

    return tauriEntries.map(parseExistingEntry);
};

export const invokePutNewEntry = (entry: NewEntry, date: Date): Promise<void> =>
    invoke("new_entry", { entry: formatNewEntry(entry, date) });

export const invokePostExistingEntry = (entry: ExistingEntry, date: Date): Promise<void> =>
    invoke("edit_entry", { entry: formatExistingEntry(entry, date) });

export const invokeDeleteExistingEntry = (entry: ExistingEntry, date: Date): Promise<void> =>
    invoke("delete_entry", { entry: formatExistingEntry(entry, date) });

export const invokePutBreak = (date: Date, time: Date): Promise<void> =>
    invoke("take_break", { time: dateTimeAsString(dateWithTime(date, time)) });

export const invokePutEndOfDay = (date: Date, time: Date): Promise<void> =>
    invoke("end_day", { time: dateTimeAsString(dateWithTime(date, time)) });

const formatExistingEntry = (entry: ExistingEntry, date: Date): TauriExistingEntry => {
    return {
        id: entry.id,
        name: entry.name,
        description: entry.description,
        time: dateTimeAsString(dateWithTime(date, entry.time)),
        entry_type: entry.entryType,
    };
};

const formatNewEntry = (entry: NewEntry, date: Date): TauriNewEntry => {
    return {
        name: entry.name,
        description: entry.description,
        time: dateTimeAsString(dateWithTime(date, entry.time)),
        entry_type: entry.entryType,
    };
};

const parseExistingEntry = (entry: TauriExistingEntry): ExistingEntry => {
    return {
        id: entry.id,
        name: entry.name,
        description: entry.description,
        time: dateTimeFromString(entry.time),
        entryType: entry.entry_type,
    };
};

export const invokeGetAllDailySummaries = async (date: Date): Promise<DailySummary[]> => {
    const summaries: TauriDailySummary[] = await invoke("durations_for_day", {
        day: dateAsIsoString(date),
    });

    return summaries.map((summary) => ({
        ...summary,
        dailySummaryType: summary.daily_summary_type,
        duration: Number.parseFloat(summary.duration),
    }));
};

export const checkForUpdates = async (): Promise<boolean> => {
    const result = await check();

    return result !== null;
};
