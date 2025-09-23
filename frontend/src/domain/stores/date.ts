import { derived, writable } from "svelte/store";
import { now } from "./now";
import { add, sub } from "date-fns";
import { getAllDaysOfWeek, newDate } from "../../util/time";

const createDate = () => {
    const { subscribe, update } = writable(newDate());

    const previous = () => {
        update((old) => sub(old, { days: 1 }));
    };

    const next = () => {
        update((old) => add(old, { days: 1 }));
    };

    return { subscribe, next, previous };
};

export const date = createDate();

export const nextDayPossible = derived([now, date], ([nowValue, dateValue]) => {
    return nowValue.getTime() - dateValue.getTime() > 1000 * 60 * 60 * 24;
});

export const daysOfWeek = derived(date, (dateValue) => getAllDaysOfWeek(dateValue));
