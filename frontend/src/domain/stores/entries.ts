import {
    type Subscriber,
    type Unsubscriber,
    derived,
    get,
    writable,
    type Readable,
} from "svelte/store";
import { dateAsIsoString } from "../../util/time";
import { date } from "./date";
import type { EntryType, ExistingEntry, NewEntry } from "../../types";
import {
    invokeDeleteExistingEntry,
    invokeGetAllEntries,
    invokePostExistingEntry,
    invokePutBreak,
    invokePutEndOfDay,
    invokePutNewEntry,
} from "../../util/tauri";

const createEntries = () => {
    const internalStore = writable<ExistingEntry[]>([]);
    let currentDate = get(date);

    const subscribe = (
        run: Subscriber<ExistingEntry[]>,
        invalidate?: (value?: ExistingEntry[]) => void,
    ): Unsubscriber => {
        const unsubscribeEntries = internalStore.subscribe(run, invalidate);
        const unsubscribeDate = date.subscribe((newDate) => {
            if (newDate !== currentDate) {
                currentDate = newDate;
                loadAll().catch(() => {
                    console.error(
                        `Could not fetch entries for day ${dateAsIsoString(currentDate)}.`,
                    );
                });
            }
        });

        return () => {
            unsubscribeEntries();
            unsubscribeDate();
        };
    };

    const loadAll = async () => {
        const entries = await invokeGetAllEntries(currentDate);
        internalStore.set(entries);
    };

    const create = async (entry: NewEntry) => {
        await invokePutNewEntry(entry, currentDate);
        await loadAll();
    };

    const edit = async (entry: ExistingEntry) => {
        await invokePostExistingEntry(entry, currentDate);
        await loadAll();
    };

    const remove = async (entry: ExistingEntry) => {
        await invokeDeleteExistingEntry(entry, currentDate);
        await loadAll();
    };

    const takeBreak = async (time: Date) => {
        await invokePutBreak(currentDate, time);
        await loadAll();
    };

    const endDay = async (time: Date) => {
        await invokePutEndOfDay(currentDate, time);
        await loadAll();
    };

    return { loadAll, subscribe, create, edit, remove, takeBreak, endDay };
};

export const entries = createEntries();

export const possibleEntryTypes: Readable<EntryType[]> = derived(entries, (values) => {
    const isBreak = values.at(-1)?.entryType === "Break";
    const dayEnded = values.at(-1)?.entryType === "EndOfDay";

    if (values.length < 1) return ["Work"] as EntryType[];
    if (dayEnded) return [] as EntryType[];
    if (isBreak) return ["Work"] as EntryType[];
    return ["Break", "EndOfDay", "Work"] as EntryType[];
});
