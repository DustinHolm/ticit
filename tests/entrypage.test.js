import { screen } from "@testing-library/svelte";
import { render } from "@testing-library/svelte";
import EntryPage from "../src/pages/EntryPage";
import { entries } from "../src/stores/entries";
import { TestUtils } from "./utils";

jest.mock("../src/stores/entries");

describe("EntryPage tests", () => {
    describe("Initial state", () => {
        test("Contains input field for new entry", () => {
            whenRendered();
            thenInputsExist(1);
        });
        test.each([0, 1, 2, 99])("Contains fields for every existing entry: Case %s", (number) => {
            const entries = TestUtils.generate(number, (i) =>
                TestUtils.generateEvent({
                    id: i,
                    name: "entry",
                })
            );

            givenExistingEntries(entries);
            whenRendered();
            thenEntriesExist(number);
        });
        test("Shows selected day", () => {});
    });

    describe("User adds new entry", () => {
        test("On confirm, entry gets current time", () => {});
        test("On confirm, entry gets added to top", () => {});
        test("On confirm, entry without name is displayed with placeholder name", () => {});
        test("Can set name", () => {});
        test("Can set description", () => {});
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

const givenExistingEntries = (given) => {
    given.forEach((e) => {
        entries.setEntry(e);
    });
};

const whenRendered = () => {
    render(EntryPage);
};

const thenInputsExist = (expected) => {
    expect(screen.getAllByRole("textbox")).toHaveLength(expected);
};

const thenEntriesExist = (expected) => {
    expect(screen.getAllByText("entry")).toHaveLength(expected);
};
