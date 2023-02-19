import { derived, writable } from "svelte/store";

const createEntries = () => {
    const { subscribe, update } = writable([]);

    const setEntry = (entry) =>
        update((old) => {
            const oldEntries = [...old.filter((e) => e.id !== entry.id)];
            const newId = Number.isInteger(entry.id)
                ? entry.id
                : Math.max(-1, ...oldEntries.map((e) => e.id)) + 1;
            const newEntry = { ...entry, id: newId };
            return [...old.filter((e) => e.id !== entry.id), newEntry];
        });

    return { subscribe, setEntry };
};

export const entries = createEntries();

export const sortedIds = derived(entries, ($entries) =>
    $entries.sort((a, b) => a.time.localeCompare(b.time)).map((e) => e.id)
);
