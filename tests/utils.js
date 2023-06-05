import { dateTimeAsString, timeFromString } from "../src/util/time";

export const TestUtils = {
    generate: (number, generator) => Array.from({ length: number }).map((_, i) => generator(i)),

    generateEntry: (args) => {
        const id = args?.id ?? 0;
        const name = args?.name ?? "name";
        const time = args?.time ?? "00:00";

        return {
            id: id,
            name: name,
            time: dateTimeAsString(timeFromString(time)),
        };
    },
};
