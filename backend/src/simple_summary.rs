use time::OffsetDateTime;

use crate::entry::ExistingEntry;

struct Break {
    start: OffsetDateTime,
    end: OffsetDateTime,
}
pub struct SimpleDailySummary {
    start: Option<OffsetDateTime>,
    end: Option<OffsetDateTime>,
    breaks: Vec<Break>,
}

impl SimpleDailySummary {
    pub fn from_entries(entries: &mut [ExistingEntry]) -> Self {
        entries.sort_unstable_by_key(|x| x.time);

        let start = entries.first().map(|x| x.time);
        let mut breaks: Vec<Breaks> = Vec::new();
        let mut end: Option<OffsetDateTime> = None;

        let mut break_buffer: Option<OffsetDateTime> = None;

        for entry in entries {
            match entry.entry_type {
                crate::entry::EntryType::Break => {
                    if break_buffer.is_none() {
                        break_buffer = Some(entry.time);
                    }
                }
                crate::entry::EntryType::EndOfDay => {
                    if let Some(break_start) = break_buffer {
                        breaks.push(Break {
                            start: break_start,
                            end: entry.time,
                        });
                        break_buffer = None;
                    }

                    end = Some(entry.time);
                }
                crate::entry::EntryType::Work => {
                    if let Some(break_start) = break_buffer {
                        breaks.push(Break {
                            start: break_start,
                            end: entry.time,
                        });
                        break_buffer = None;
                    }
                }
            }
        }

        SimpleDailySummary { start, end, breaks }
    }
}
