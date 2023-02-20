import { writable, derived } from "svelte/store";

const initial = new Date("2000-01-01T00:00:00");

const createNow = () => {
    const { subscribe, set } = writable(initial);

    const reset = () => set(initial);

    return { subscribe, set, reset };
};
export const now = createNow();

export const nowAsTimeString = derived(now, ($date) =>
    $date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })
);
