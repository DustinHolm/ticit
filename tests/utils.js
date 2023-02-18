export const TestUtils = {
    generate: (number, generator) => Array.from({ length: number }).map((_, i) => generator(i)),

    generateEvent: ({ id = null, name = "name", time = "00:00" }) => ({
        id: id,
        name: name,
        time: time,
    }),
};
