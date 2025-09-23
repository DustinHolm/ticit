export type EntryType = "Break" | "EndOfDay" | "Work";

type TauriEntryBase = {
    name: string | null;
    description: string | null;
    time: string;
    entry_type: EntryType;
};

export type TauriNewEntry = TauriEntryBase;

export type TauriExistingEntry = TauriEntryBase & {
    id: number;
};

type EntryBase = {
    name: string | null;
    description: string | null;
    time: Date;
    entryType: EntryType;
};

export type NewEntry = EntryBase;

export type ExistingEntry = EntryBase & {
    id: number;
};

export type DailySummaryType = "Break" | "Work";

export type TauriDailySummary = {
    name: string | null;
    description: string | null;
    duration: string;
    daily_summary_type: DailySummaryType;
};

export type DailySummary = {
    name: string | null;
    description: string | null;
    duration: number;
    dailySummaryType: DailySummaryType;
};

export type TauriSimpleTime = {
    total_work_duration: number;
    start_of_work: string | undefined;
    start_of_break: string | undefined;
    end_of_break: string | undefined;
    end_of_day: string | undefined;
};

export type SimpleTime = {
    totalWorkDuration: number;
    startOfWork: Date | undefined;
    startOfBreak: Date | undefined;
    endOfBreak: Date | undefined;
    endOfDay: Date | undefined;
};
