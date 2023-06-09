import type { TauriExistingEntry } from "../src/types";
import { dateTimeAsString, timeFromString } from "../src/util/time";

export const TestUtils = {
    generate: <T>(number: number, generator: (number: number) => T): T[] =>
        Array.from({ length: number }).map((_, i) => generator(i)),

    generateEntry: (args?: { id?: number; name?: string; time?: string }): TauriExistingEntry => {
        const id = args?.id ?? 0;
        const name = args?.name ?? "name";
        const time = args?.time ?? "00:00";

        return {
            id: id,
            name: name,
            description: null,
            time: dateTimeAsString(timeFromString(time)),
            entry_type: "Work",
        };
    },
};
