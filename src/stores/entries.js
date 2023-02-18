import { derived, writable } from "svelte/store";

const createEntries = () => {
    const { subscribe, update } = writable([]);

    const setEntry = (entry) => update((old) => [...old.filter((e) => e.id !== entry.id), entry]);

    return { subscribe, setEntry };
};

export const entries = createEntries();

export const sortedIds = derived(entries, ($entries) =>
    $entries.sort((a, b) => a.time.localeCompare(b.time)).map((e) => e.id)
);
