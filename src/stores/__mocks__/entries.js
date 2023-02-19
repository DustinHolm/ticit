import { derived, writable } from "svelte/store";

const initial = [];

const createEntries = () => {
    const { subscribe, set, update } = writable(initial);

    const setEntry = (entry) => update((old) => [...old.filter((e) => e.id !== entry.id), entry]);

    const reset = () => set(initial);

    return { subscribe, setEntry, reset };
};

export const entries = createEntries();

export const sortedIds = derived(entries, ($entries) =>
    $entries.sort((a, b) => a.time.localeCompare(b.time)).map((e) => e.id)
);
