import { derived } from "svelte/store";
import { date } from "./date";
import { entries } from "./entries";
import { invokeSimpleTimeForDay } from "../../util/tauri";

export const simpleTime = derived(
    [entries, date],
    async ([, dateValue]) => await invokeSimpleTimeForDay(dateValue),
);
