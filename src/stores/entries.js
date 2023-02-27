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

    const deleteEntry = (id) => {
        update((old) => [...old.filter((e) => e.id !== id)]);
    };

    return { subscribe, setEntry, deleteEntry };
};

export const entries = createEntries();

export const entriesSortedByTime = derived(entries, ($entries) =>
    $entries.sort((a, b) => a.time.localeCompare(b.time))
);

export const sortedIds = derived(entriesSortedByTime, ($entries) => $entries.map((e) => e.id));

export const entrySumByName = derived(entriesSortedByTime, ($entries) => {
    const resultMap = new Map();

    for (let i = 0, j = 1; j < $entries.length(); i++, j++) {
        const current = $entries(i);
        const next = $entries(j);
        const instantPre = new Date(current.time).getTime();
        const instantPost = new Date(next.time).getTime();
        const duration = instantPost - instantPre;

        if (resultMap.has(current.name)) {
            const newDescription = [resultMap[current.name].description, current.description]
                .filter((d) => !!d)
                .join("; ");
            const newDuration = resultMap[current.name].duration + duration;

            resultMap.set(current.name, { description: newDescription, duration: newDuration });
        } else {
            resultMap.set(current.name, { description: current.description, duration: duration });
        }
    }

    return resultMap;
});
