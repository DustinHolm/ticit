import { derived, writable } from "svelte/store";

const initial = [];

const createEntries = () => {
    const { subscribe, set, update } = writable(initial);

    const setEntry = (entry) =>
        update((old) => {
            const oldEntries = [...old.filter((e) => e.id !== entry.id)];
            const newId = Number.isInteger(entry.id)
                ? entry.id
                : Math.max(-1, ...oldEntries.map((e) => e.id)) + 1;
            const newEntry = { ...entry, id: newId };
            return [...old.filter((e) => e.id !== entry.id), newEntry];
        });

    const deleteEntry = (id) => {
        update((old) => [...old.filter((e) => e.id !== id)]);
    };

    const reset = () => set(initial);

    return { subscribe, setEntry, deleteEntry, reset };
};

export const entries = createEntries();

export const sortedIds = derived(entries, ($entries) =>
    $entries.sort((a, b) => a.time.localeCompare(b.time)).map((e) => e.id)
);
