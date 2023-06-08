import { writable } from "svelte/store";

const initial = new Date("2000-01-01T00:00:00");

const createNow = () => {
    const { subscribe, set } = writable(initial);

    const reset = () => set(initial);

    return { subscribe, set, reset };
};

export const now = createNow();

export type MockNowStore = typeof now;
