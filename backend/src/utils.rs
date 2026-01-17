use time::{Duration, OffsetDateTime};

use crate::entry::{EntryType, ExistingEntry};

pub fn total_work(entries: &mut [ExistingEntry]) -> Duration {
    entries.sort_unstable_by_key(|x| x.time);

    let mut total_work_duration: Duration = Duration::ZERO;
    let mut last_work: Option<OffsetDateTime> = None;

    for entry in entries {
        if let Some(last_work) = last_work {
            total_work_duration += entry.time - last_work;
        }
        if entry.entry_type == EntryType::Work {
            last_work = Some(entry.time);
        } else {
            last_work = None;
        }
    }

    // round to full minutes
    Duration::minutes(total_work_duration.whole_minutes())
}
