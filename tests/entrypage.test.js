import { screen, within } from "@testing-library/svelte";
import { render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import EntryPage from "../src/pages/EntryPage";
import { entries } from "../src/stores/entries";
import { now } from "../src/stores/now";
import { TestUtils } from "./utils";

jest.mock("../src/stores/entries");
jest.mock("../src/stores/now");

describe("EntryPage tests", () => {
    beforeEach(() => {
        entries.reset();
        now.reset();
    });

    describe("Initial state", () => {
        test("Contains input field for new entry", () => {
            when.rendered();
            then.newEntryExists();
        });
        test.each([0, 1, 2, 99])("Contains fields for every existing entry: Case %s", (number) => {
            const entries = TestUtils.generate(number, (i) =>
                TestUtils.generateEvent({
                    id: i,
                    name: "entry",
                })
            );

            given.existingEntries(entries);
            when.rendered();
            then.readOnlyEntriesExist(number);
        });
        test("Shows current day by default", () => {
            given.currentDate("2000-12-24");
            when.rendered();
            then.dayIs("24.12.2000");
        });
    });

    describe("User adds new entry", () => {
        test("On confirm, entry gets current time", async () => {
            given.currentTime("04:20");
            when.rendered();
            await when.entry("new").editConfirmed();
            screen.debug();
            then.entry("latest").hasTime("04:20");
        });
        test("On confirm, entry without name is displayed with placeholder name", async () => {
            when.rendered();
            await when.entry("new").editConfirmed();
            then.entry("latest").hasName("<undefined>");
        });
        test("Can set name", async () => {
            when.rendered();
            await when.entry("new").nameEdited("New name");
            await when.entry("new").editConfirmed();
            then.entry("latest").hasName("New name");
        });
        test("On confirm, entry gets added to top", async () => {
            const entries = TestUtils.generate(5, (i) =>
                TestUtils.generateEvent({
                    id: i,
                    name: "other",
                    time: `00:0${i}`,
                })
            );

            given.currentTime("00:10");
            given.existingEntries(entries);
            when.rendered();
            await when.entry("new").nameEdited("relevant");
            await when.entry("new").editConfirmed();
            then.entry("latest").hasName("relevant");
        });
        test("Can set description", async () => {
            when.rendered();
            await when.entry("new").descriptionEdited("nice description");
            await when.entry("new").editConfirmed();
            then.entry("latest").hasDescription("nice description");
        });
    });

    describe("User edits entry", () => {
        test("Can open edit mode via button", () => {});
        test("On confirm, entry can change name", () => {});
        test("On confirm, entry can change description", () => {});
        test("On confirm, entry can change time", () => {});
        test("On confirm with changed time, entry changes position", () => {});
        test("On cancel, changes get reverted", () => {});
        test("On delete, entry disappears", () => {});
    });
});

const given = {
    existingEntries: (given) => {
        given.forEach((e) => {
            entries.setEntry(e);
        });
    },

    currentTime: (given) => {
        now.set(new Date(`2000-01-01T${given}:00`));
    },

    currentDate: (given) => {
        now.set(new Date(`${given}T00:00:00`));
    },
};

const when = {
    rendered: () => {
        render(EntryPage);
    },

    entry: (searchParam) => {
        const selectedEntry = util.getEntry(searchParam);

        return {
            editConfirmed: async () => {
                const button = within(selectedEntry).getByRole("button", {
                    name: "confirm",
                });
                await userEvent.click(button);
            },

            nameEdited: async (edit) => {
                const field = within(selectedEntry).getByRole("textbox", {
                    name: "entry name",
                });
                await userEvent.type(field, edit);
            },

            descriptionEdited: async (edit) => {
                const field = within(selectedEntry).getByRole("textbox", {
                    name: "entry description",
                });
                await userEvent.type(field, edit);
            },
        };
    },
};

const then = {
    newEntryExists: () => {
        expect(screen.getByRole("listitem", { name: "new entry" })).toBeInTheDocument();
    },

    editableEntriesExist: (expected) => {
        expect(screen.queryAllByRole("listitem", { name: "editable entry" })).toHaveLength(
            expected
        );
    },

    readOnlyEntriesExist: (expected) => {
        expect(screen.queryAllByRole("listitem", { name: "entry" })).toHaveLength(expected);
    },

    entry: (searchParam) => {
        const selectedEntry = util.getEntry(searchParam);

        return {
            hasName: (expected) => {
                expect(
                    within(selectedEntry).getByText(expected, {
                        name: "entry name",
                    })
                ).toBeInTheDocument();
            },
            hasDescription: (expected) => {
                expect(
                    within(selectedEntry).getByText(expected, {
                        name: "entry description",
                    })
                ).toBeInTheDocument();
            },
            hasTime: (expected) => {
                expect(
                    within(selectedEntry).getByText(expected, {
                        name: "entry time",
                    })
                ).toBeInTheDocument();
            },
        };
    },
    dayIs: (expected) => {
        expect(screen.getByText(expected)).toBeInTheDocument();
    },
};

const util = {
    getEntry: (searchParam) => {
        if (searchParam === "new") {
            return screen.getByRole("listitem", { name: "new entry" });
        } else if (searchParam === "latest") {
            const all = screen.getAllByRole("listitem");
            return all[all.length - 2]; // -1 due to offset, -1 due to "new entry" being found
        } else if (Number.isInteger(searchParam)) {
            return screen.getAllByRole("listitem")[searchParam];
        }
    },
};
