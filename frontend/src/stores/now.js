import { readable } from "svelte/store";
import { newDate } from "../util/time";

export const now = readable(newDate(), (set) => {
    const interval = setInterval(() => {
        set(newDate());
    }, 1000);

    return () => clearInterval(interval);
});
