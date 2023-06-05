import { render, screen, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import EntryPage from "../src/pages/EntryPage";
import { entries } from "../src/stores/entries";
import { now } from "../src/stores/now";
import { TestUtils } from "./utils";
import { newDate, timeFromString } from "../src/util/time";
import { invoke } from "@tauri-apps/api";

jest.mock("@tauri-apps/api");
jest.mock("../src/stores/now");
jest.mock("../src/util/time", () => ({
    ...jest.requireActual("../src/util/time"),
    newDate: jest.fn(() => new Date()),
}));

describe("EntryPage tests", () => {
    beforeEach(() => {
        given.existingEntries([]);
        now.reset();
    });

    describe("Initial state", () => {
        test("Contains input field for new entry", async () => {
            await when.rendered();
            then.newEntryExists();
        });

        test.each([0, 1, 2, 99])(
            "Contains fields for every existing entry: Case %s",
            async (number) => {
                const entries = TestUtils.generate(number, (i) =>
                    TestUtils.generateEntry({
                        id: i,
                        name: "entry",
                    })
                );

                given.existingEntries(entries);
                await when.rendered();
                then.readOnlyEntriesExist(number);
            }
        );
    });

    describe("User adds new entry", () => {
        test("Entry gets current time", async () => {
            given.currentTime("04:20");
            await when.rendered();
            await when.entry("new").create();
            then.newEntry.hasTime("04:20");
        });

        test("Entry gets current date", async () => {
            given.currentDate("2023-06-05");
            await when.rendered();
            await when.entry("new").create();
            then.newEntry.hasTime("2023-06-05");
        });

        test("Can set name", async () => {
            await when.rendered();
            await when.entry("new").nameEdited("New name");
            await when.entry("new").create();
            then.newEntry.hasName("New name");
        });

        test("Entry without name uses null instead", async () => {
            await when.rendered();
            await when.entry("new").create();
            then.newEntry.hasName(null);
        });

        test("Can set description", async () => {
            await when.rendered();
            await when.entry("new").descriptionEdited("nice description");
            await when.entry("new").create();
            then.newEntry.hasDescription("nice description");
        });

        test("Entry without description uses null instead", async () => {
            await when.rendered();
            await when.entry("new").create();
            then.newEntry.hasDescription(null);
        });

        test("Existing entry can be started again", async () => {
            const entry0 = TestUtils.generateEntry({ id: 0, name: "Entry 0", time: "01:00" });
            given.existingEntries([entry0]);
            given.currentTime("02:00");
            await when.rendered();
            await when.entry(entry0.name).restarted();
            then.newEntry.hasName("Entry 0");
            then.newEntry.hasTime("02:00");
        });
    });

    describe("User edits entry", () => {
        const entry0 = TestUtils.generateEntry({ id: 0, name: "Entry 0", time: "01:00" });
        const entry1 = TestUtils.generateEntry({ id: 1, name: "Entry 1", time: "02:00" });
        const entry2 = TestUtils.generateEntry({ id: 2, name: "Entry 2", time: "03:00" });

        beforeEach(() => {
            given.existingEntries([entry0, entry1, entry2]);
        });

        test("Can open edit mode via button", async () => {
            await when.rendered();
            await when.entry("latest").startEdit();
            then.editableEntriesExist(1);
        });

        test("Can close edit mode via button", async () => {
            await when.rendered();
            await when.entry("latest").startEdit();
            await when.entry("latest").editConfirmed();
            then.editableEntriesExist(0);
        });

        test("On confirm, entry can change name", async () => {
            await when.rendered();
            await when.entry(0).startEdit();
            await when.entry(0).nameEdited("{Backspace}4");
            await when.entry(0).editConfirmed();
            then.editEntry.hasName("Entry 4");
        });

        test("On confirm, entry can change description", async () => {
            await when.rendered();
            await when.entry(0).startEdit();
            await when.entry(0).descriptionEdited("Dizzy");
            await when.entry(0).editConfirmed();
            then.editEntry.hasDescription("Dizzy");
        });

        test("On confirm, entry can change time", async () => {
            await when.rendered();
            await when.entry(0).startEdit();
            await when.entry(0).timeEdited("{Control>}a{/Control}{Backspace}0123");
            await when.entry(0).editConfirmed();
            then.editEntry.hasTime("01:23");
        });

        test("On cancel, changes get reverted", async () => {
            await when.rendered();
            await when.entry(0).startEdit();
            await when.entry(0).nameEdited("{Backspace}4");
            await when.entry(0).descriptionEdited("Dizzy");
            await when.entry(0).timeEdited("{Control>}a{/Control}{Backspace}230");
            await when.entry(0).editCancelled();
            then.editEntry.isNotCalled();
        });

        test("On delete, entry disappears", async () => {
            await when.rendered();
            await when.entry(0).startEdit();
            await when.entry(0).deleted();
            then.deleteEntry.isCalledWith(entry0.id);
        });
    });

    describe("Other interactions", () => {
        test("User cannot take a break without entries", async () => {
            await when.rendered();
            await when.entry("new").takeBreak();
            then.takeBreak.isNotCalled();
        });

        test("User can take a break with entries", async () => {
            given.existingEntries([TestUtils.generateEntry()]);
            await when.rendered();
            await when.entry("new").takeBreak();
            then.takeBreak.isCalled();
        });

        test("User cannot end the day without entries", async () => {
            await when.rendered();
            await when.entry("new").endDay();
            then.endDay.isNotCalled();
        });

        test("User can end the day with entries", async () => {
            given.existingEntries([TestUtils.generateEntry()]);
            await when.rendered();
            await when.entry("new").endDay();
            then.endDay.isCalled();
        });
    });
});

const given = {
    existingEntries: (given) => {
        invoke.mockImplementation((cmd) => {
            if (cmd === "all_entries_for_day") {
                return Promise.resolve(given);
            }
        });
    },

    currentTime: (given) => {
        now.set(timeFromString(given));
    },

    currentDate: (given) => {
        newDate.mockReturnValue(new Date(`${given}T12:00:00`));
    },
};

const when = {
    rendered: async () => {
        await entries.loadAll();
        render(EntryPage);
    },

    entry: (searchParam) => {
        const selectedEntry = util.getEntry(searchParam);

        return {
            create: async () => {
                const button = within(selectedEntry).getByRole("button", {
                    name: "Create entry",
                });
                await userEvent.click(button);
            },

            startEdit: async () => {
                const button = within(selectedEntry).getByRole("button", {
                    name: "Edit entry",
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
                    name: "Delete entry",
                });
                await userEvent.click(button);
            },

            restarted: async () => {
                const button = within(selectedEntry).getByRole("button", {
                    name: "Restart entry again",
                });
                await userEvent.click(button);
            },

            takeBreak: async () => {
                const button = within(selectedEntry).getByRole("button", {
                    name: "Take break",
                });
                await userEvent.click(button);
            },

            endDay: async () => {
                const button = within(selectedEntry).getByRole("button", {
                    name: "End day",
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
        expect(screen.queryAllByRole("listitem", { name: "readonly entry" })).toHaveLength(
            expected
        );
    },

    newEntry: {
        hasName: (expected) => {
            expect(invoke).toBeCalledWith("new_entry", {
                entry: expect.objectContaining({ name: expected }),
            });
        },

        hasDescription: (expected) => {
            expect(invoke).toBeCalledWith("new_entry", {
                entry: expect.objectContaining({ description: expected }),
            });
        },

        hasTime: (expected) => {
            expect(invoke).toBeCalledWith("new_entry", {
                entry: expect.objectContaining({ time: expect.stringContaining(expected) }),
            });
        },
    },

    editEntry: {
        hasName: (expected) => {
            expect(invoke).toBeCalledWith("edit_entry", {
                entry: expect.objectContaining({ name: expected }),
            });
        },

        hasDescription: (expected) => {
            expect(invoke).toBeCalledWith("edit_entry", {
                entry: expect.objectContaining({ description: expected }),
            });
        },

        hasTime: (expected) => {
            expect(invoke).toBeCalledWith("edit_entry", {
                entry: expect.objectContaining({ time: expect.stringContaining(expected) }),
            });
        },

        isNotCalled: () => {
            expect(invoke).not.toBeCalledWith("edit_entry", expect.anything());
        },
    },

    deleteEntry: {
        isCalledWith: (expected) => {
            expect(invoke).not.toBeCalledWith("delete_entry", expected);
        },
    },

    takeBreak: {
        isCalled: () => expect(invoke).toBeCalledWith("take_break", expect.anything()),
        isNotCalled: () => expect(invoke).not.toBeCalledWith("take_break", expect.anything()),
    },

    endDay: {
        isCalled: () => expect(invoke).toBeCalledWith("end_day", expect.anything()),
        isNotCalled: () => expect(invoke).not.toBeCalledWith("end_day", expect.anything()),
    },
};

const util = {
    getEntry: (searchParam) => {
        if (searchParam === "new") {
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
