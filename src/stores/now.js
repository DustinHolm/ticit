import { derived, readable } from "svelte/store";

export const now = readable(new Date(), (set) => {
    const interval = setInterval(() => {
        set(new Date());
    }, 1000);

    return () => clearInterval(interval);
});

export const nowAsTimeString = derived(now, ($date) =>
    $date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })
);
