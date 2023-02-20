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
        const entry0 = TestUtils.generateEvent({ id: 0, name: "Entry 0", time: "01:00" });
        const entry1 = TestUtils.generateEvent({ id: 1, name: "Entry 1", time: "02:00" });
        const entry2 = TestUtils.generateEvent({ id: 2, name: "Entry 2", time: "03:00" });

        beforeEach(() => {
            given.existingEntries([entry0, entry1, entry2]);
        });

        test("Can open edit mode via button", async () => {
            when.rendered();
            await when.entry("latest").startEdit();
            then.editableEntriesExist(1);
        });
        test("Can close edit mode via button", async () => {
            when.rendered();
            await when.entry("latest").startEdit();
            await when.entry("latest").editConfirmed();
            then.editableEntriesExist(0);
        });
        test("On confirm, entry can change name", async () => {
            when.rendered();
            const entry = util.getEntry(entry0.name);
            await when.entry(entry).startEdit();
            await when.entry(entry).nameEdited("{Backspace}4");
            await when.entry(entry).editConfirmed();
            then.entry(entry).hasName("Entry 4");
        });
        test("On confirm, entry can change description", async () => {
            when.rendered();
            const entry = util.getEntry(entry0.name);
            await when.entry(entry).startEdit();
            await when.entry(entry).descriptionEdited("Dizzy");
            await when.entry(entry).editConfirmed();
            then.entry(entry).hasDescription("Dizzy");
        });
        test("On confirm, entry can change time", async () => {
            when.rendered();
            const entry = util.getEntry(entry0.name);
            await when.entry(entry).startEdit();
            await when.entry(entry).timeEdited("{Control>}a{/Control}{Backspace}420");
            await when.entry(entry).editConfirmed();
            then.entry(entry).hasTime("04:20");
        });
        test("On confirm with changed time, entry changes position", async () => {
            when.rendered();
            const entry = util.getEntry(entry0.name);
            await when.entry(entry).startEdit();
            await when.entry(entry).timeEdited("{Control>}a{/Control}{Backspace}230");
            await when.entry(entry).editConfirmed();
            then.entry(0).hasName("Entry 1");
            then.entry(1).hasName("Entry 2");
            then.entry(2).hasName("Entry 0");
        });
        test("On cancel, changes get reverted", async () => {
            when.rendered();
            const entry = util.getEntry(entry0.name);
            await when.entry(entry).startEdit();
            await when.entry(entry).nameEdited("{Backspace}4");
            await when.entry(entry).descriptionEdited("Dizzy");
            await when.entry(entry).timeEdited("{Control>}a{/Control}{Backspace}230");
            await when.entry(entry).editCancelled();
            then.entry(entry).hasName("Entry 0");
            then.entry(entry).hasDescription("Entry 0");
            then.entry(entry).hasName("Entry 0");
        });
        test("On delete, entry disappears", async () => {
            when.rendered();
            const entry = util.getEntry(entry0.name);
            await when.entry(entry).startEdit();
            await when.entry(entry).deleted();
            then.totalEntriesExist(3);
        });
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
            startEdit: async () => {
                const button = within(selectedEntry).getByRole("button", {
                    name: "Edit",
                });
                await userEvent.click(button);
            },

            editConfirmed: async () => {
                const button = within(selectedEntry).getByRole("button", {
                    name: "Confirm",
                });
                await userEvent.click(button);
            },

            editCancelled: async () => {
                const button = within(selectedEntry).getByRole("button", {
                    name: "Cancel",
                });
                await userEvent.click(button);
            },

            nameEdited: async (edit) => {
                const field = within(selectedEntry).getByRole("textbox", {
                    name: "Name",
                });
                await userEvent.type(field, edit);
            },

            descriptionEdited: async (edit) => {
                const field = within(selectedEntry).getByRole("textbox", {
                    name: "Description",
                });
                await userEvent.type(field, edit);
            },

            timeEdited: async (edit) => {
                const field = within(selectedEntry).getByRole("textbox", {
                    name: "Time",
                });
                await userEvent.type(field, edit);
            },

            deleted: async () => {
                const button = within(selectedEntry).getByRole("button", {
                    name: "Delete",
                });
                await userEvent.click(button);
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

    totalEntriesExist: (expected) => {
        expect(screen.queryAllByRole("listitem")).toHaveLength(expected);
    },

    entry: (searchParam) => {
        const selectedEntry = util.getEntry(searchParam);

        return {
            hasName: (expected) => {
                expect(
                    within(selectedEntry).getByText(expected, {
                        name: "Name",
                    })
                ).toBeInTheDocument();
            },
            hasDescription: (expected) => {
                expect(
                    within(selectedEntry).getByText(expected, {
                        name: "Description",
                    })
                ).toBeInTheDocument();
            },
            hasTime: (expected) => {
                expect(
                    within(selectedEntry).getByText(expected, {
                        name: "Time",
                    })
                ).toBeInTheDocument();
            },
            hasNoDescription: () => {
                // eslint-disable-next-line jest-dom/prefer-to-have-text-content
                expect(within(selectedEntry).getByLabelText("Description").textContent).toBe("");
            },
        };
    },
    dayIs: (expected) => {
        expect(screen.getByText(expected)).toBeInTheDocument();
    },
};

const util = {
    getEntry: (searchParam) => {
        if (typeof searchParam === "object") {
            return searchParam;
        } else if (searchParam === "new") {
            return screen.getByRole("listitem", { name: "new entry" });
        } else if (searchParam === "latest") {
            const all = screen.getAllByRole("listitem");
            return all[all.length - 2]; // -1 due to offset, -1 due to "new entry" being found
        } else if (typeof searchParam === "number") {
            return screen.getAllByRole("listitem")[searchParam];
        } else {
            const all = screen.getAllByRole("listitem");
            return all.find((element) => element.textContent.includes(searchParam));
        }
    },
};
