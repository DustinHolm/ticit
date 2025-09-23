use serde::Serialize;
use time::{Duration, OffsetDateTime};

use crate::entry::{EntryType, ExistingEntry};

#[derive(Debug, Serialize, PartialEq)]
pub struct SimpleTime {
    pub(crate) total_work_duration: Duration,
    pub(crate) start_of_work: Option<OffsetDateTime>,
    pub(crate) start_of_break: Option<OffsetDateTime>,
    pub(crate) end_of_break: Option<OffsetDateTime>,
    pub(crate) end_of_day: Option<OffsetDateTime>,
}

impl SimpleTime {
    pub fn from_entries(entries: &mut [ExistingEntry]) -> Result<Self, String> {
        entries.sort_unstable_by_key(|x| x.time);

        let mut start_of_work: Option<OffsetDateTime> = None;
        let mut total_work_duration: Duration = Duration::ZERO;
        let mut last_work: Option<OffsetDateTime> = None;

        for entry in entries {
            if let Some(last_work) = last_work {
                total_work_duration += entry.time - last_work;
            }
            if entry.entry_type == EntryType::Work {
                last_work = Some(entry.time);
                if start_of_work.is_none() {
                    start_of_work = Some(entry.time);
                }
            } else {
                last_work = None;
            }
        }

        let break_duration = match total_work_duration {
            x if x >= Duration::hours(8) => Duration::minutes(45),
            x if x >= Duration::hours(4) => Duration::minutes(30),
            x if x < Duration::hours(4) => Duration::ZERO,
            _ => Duration::ZERO,
        };

        let start_of_break = start_of_work
            .filter(|_| break_duration > Duration::ZERO)
            .map(|x| x + total_work_duration / 2);
        let end_of_break = start_of_break
            .filter(|_| break_duration > Duration::ZERO)
            .map(|x| x + break_duration);
        let end_of_day = start_of_work.map(|x| x + total_work_duration + break_duration);

        Ok(Self {
            total_work_duration,
            start_of_work,
            start_of_break,
            end_of_break,
            end_of_day,
        })
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use time::macros::datetime;
    use time::Time;

    // Helper function to create an ExistingEntry for testing
    fn create_entry(id: u64, hour: u8, minute: u8, entry_type: EntryType) -> ExistingEntry {
        ExistingEntry {
            id,
            name: None,
            description: None,
            time: datetime!(2025-09-16 00:00:00 +00:00)
                .replace_time(Time::from_hms(hour, minute, 0).unwrap()),
            entry_type,
        }
    }

    #[test]
    fn test_work_only() {
        let mut entries = vec![
            create_entry(1, 9, 0, EntryType::Work),
            create_entry(2, 10, 0, EntryType::Work),
            create_entry(3, 11, 0, EntryType::Work),
        ];

        let simple_time = SimpleTime::from_entries(&mut entries).unwrap();

        assert_eq!(simple_time.total_work_duration, Duration::hours(2));
        assert_eq!(
            simple_time.start_of_work,
            Some(datetime!(2025-09-16 09:00:00 +00:00))
        );
        assert_eq!(simple_time.start_of_break, None);
        assert_eq!(simple_time.end_of_break, None);
        assert_eq!(
            simple_time.end_of_day,
            Some(datetime!(2025-09-16 11:00:00 +00:00))
        );
    }

    #[test]
    fn test_multiple_breaks() {
        let mut entries = vec![
            create_entry(1, 9, 0, EntryType::Work),
            create_entry(2, 11, 0, EntryType::Break),
            create_entry(3, 12, 0, EntryType::Work),
            create_entry(4, 14, 0, EntryType::Break),
            create_entry(5, 15, 0, EntryType::Work),
            create_entry(6, 17, 0, EntryType::EndOfDay),
        ];

        let simple_time = SimpleTime::from_entries(&mut entries).unwrap();

        assert_eq!(simple_time.total_work_duration, Duration::hours(6));
        assert_eq!(
            simple_time.start_of_work,
            Some(datetime!(2025-09-16 09:00:00 +00:00))
        );
        assert_eq!(
            simple_time.start_of_break,
            Some(datetime!(2025-09-16 12:00:00 +00:00))
        );
        assert_eq!(
            simple_time.end_of_break,
            Some(datetime!(2025-09-16 12:30:00 +00:00))
        );
        assert_eq!(
            simple_time.end_of_day,
            Some(datetime!(2025-09-16 15:30:00 +00:00))
        );
    }

    #[test]
    fn test_end_of_day_explicit() {
        let mut entries = vec![
            create_entry(1, 9, 0, EntryType::Work),
            create_entry(2, 10, 0, EntryType::Work),
            create_entry(3, 12, 0, EntryType::Break),
            create_entry(4, 13, 0, EntryType::EndOfDay),
        ];

        let simple_time = SimpleTime::from_entries(&mut entries).unwrap();

        assert_eq!(simple_time.total_work_duration, Duration::hours(3));
        assert_eq!(
            simple_time.start_of_work,
            Some(datetime!(2025-09-16 09:00:00 +00:00))
        );
        assert_eq!(simple_time.start_of_break, None);
        assert_eq!(simple_time.end_of_break, None);
        assert_eq!(
            simple_time.end_of_day,
            Some(datetime!(2025-09-16 12:00:00 +00:00))
        );
    }

    #[test]
    fn test_end_with_break() {
        let mut entries = vec![
            create_entry(1, 9, 0, EntryType::Work),
            create_entry(2, 10, 0, EntryType::Work),
            create_entry(3, 12, 0, EntryType::Break),
            create_entry(4, 12, 30, EntryType::Break),
        ];

        let simple_time = SimpleTime::from_entries(&mut entries).unwrap();

        assert_eq!(simple_time.total_work_duration, Duration::hours(3));
        assert_eq!(
            simple_time.start_of_work,
            Some(datetime!(2025-09-16 09:00:00 +00:00))
        );
        assert_eq!(simple_time.start_of_break, None);
        assert_eq!(simple_time.end_of_break, None);
        assert_eq!(
            simple_time.end_of_day,
            Some(datetime!(2025-09-16 12:00:00 +00:00))
        );
    }

    #[test]
    fn test_no_entries() {
        let mut entries = vec![];
        let result = SimpleTime::from_entries(&mut entries);
        assert!(result.is_ok()); // Should return a default SimpleTime with None for times
        let simple_time = result.unwrap();
        assert_eq!(simple_time.total_work_duration, Duration::ZERO);
        assert_eq!(simple_time.start_of_work, None);
        assert_eq!(simple_time.start_of_break, None);
        assert_eq!(simple_time.end_of_break, None);
        assert_eq!(simple_time.end_of_day, None);
    }

    #[test]
    fn test_only_break_entries() {
        let mut entries = vec![
            create_entry(1, 12, 0, EntryType::Break),
            create_entry(2, 13, 0, EntryType::Break),
        ];

        let simple_time = SimpleTime::from_entries(&mut entries).unwrap();

        assert_eq!(simple_time.total_work_duration, Duration::ZERO);
        assert_eq!(simple_time.start_of_work, None);
        assert_eq!(simple_time.start_of_break, None);
        assert_eq!(simple_time.end_of_break, None);
        assert_eq!(simple_time.end_of_day, None);
    }
}
