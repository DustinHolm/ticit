use std::vec;

use ticit::{
    daily_summary::{DailySummary, DailySummaryType},
    entry::{ExistingEntry, NewEntry},
};
use time::{Date, Duration, Month, OffsetDateTime, Time};

#[test]
fn returns_empty_on_empty_entries() {
    let summaries = DailySummary::from_entries(&mut vec![]).unwrap();

    assert_eq!(summaries.len(), 0);
}

#[test]
fn returns_empty_on_single_entry() {
    let entry_0 = get_work_entry(0, Some("A".to_string()), None, &offset_date_time(12));

    let summaries = DailySummary::from_entries(&mut vec![entry_0]).unwrap();

    assert_eq!(summaries.len(), 0);
}

#[test]
fn returns_entries_sorted_and_summed_by_name() {
    let entry_0 = get_work_entry(0, Some("A".to_string()), None, &offset_date_time(9));
    let entry_1 = get_work_entry(1, Some("B".to_string()), None, &offset_date_time(11));
    let entry_2 = get_break_entry(2, &offset_date_time(12));
    let entry_3 = get_work_entry(3, Some("A".to_string()), None, &offset_date_time(13));
    let entry_4 = get_end_of_day_entry(4, &offset_date_time(17));

    let summaries =
        DailySummary::from_entries(&mut vec![entry_0, entry_1, entry_2, entry_3, entry_4]).unwrap();

    assert_eq!(summaries.len(), 3);
    assert_eq!(summaries[0].name, None);
    assert_eq!(summaries[0].daily_summary_type, DailySummaryType::Break);
    assert_eq!(summaries[0].duration, Duration::hours(1));
    assert_eq!(summaries[1].name, Some("A".to_string()));
    assert_eq!(summaries[1].daily_summary_type, DailySummaryType::Work);
    assert_eq!(summaries[1].duration, Duration::hours(6));
    assert_eq!(summaries[2].name, Some("B".to_string()));
    assert_eq!(summaries[2].daily_summary_type, DailySummaryType::Work);
    assert_eq!(summaries[2].duration, Duration::hours(1));
}

#[test]
fn combines_descriptions() {
    let entry_0 = get_work_entry(
        0,
        Some("A".to_string()),
        Some("A".to_string()),
        &offset_date_time(9),
    );
    let entry_1 = get_work_entry(
        1,
        Some("B".to_string()),
        Some("A".to_string()),
        &offset_date_time(11),
    );
    let entry_2 = get_break_entry(2, &offset_date_time(12));
    let entry_3 = get_work_entry(
        3,
        Some("A".to_string()),
        Some("A".to_string()),
        &offset_date_time(13),
    );
    let entry_4 = get_end_of_day_entry(4, &offset_date_time(17));

    let summaries =
        DailySummary::from_entries(&mut vec![entry_0, entry_1, entry_2, entry_3, entry_4]).unwrap();

    assert_eq!(summaries[1].name, Some("A".to_string()));
    assert_eq!(summaries[1].description, Some("A; A".to_string()));
    assert_eq!(summaries[2].name, Some("B".to_string()));
    assert_eq!(summaries[2].description, Some("A".to_string()));
}

fn get_work_entry(
    id: u64,
    name: Option<String>,
    description: Option<String>,
    time: &OffsetDateTime,
) -> ExistingEntry {
    ExistingEntry::from_new_entry(NewEntry::new_work(name, description, time), id)
}

fn get_break_entry(id: u64, time: &OffsetDateTime) -> ExistingEntry {
    ExistingEntry::from_new_entry(NewEntry::new_break(time), id)
}

fn get_end_of_day_entry(id: u64, time: &OffsetDateTime) -> ExistingEntry {
    ExistingEntry::from_new_entry(NewEntry::new_end_of_day(time), id)
}

fn offset_date_time(hour: u8) -> OffsetDateTime {
    Date::from_calendar_date(2000, Month::December, 24)
        .unwrap()
        .with_time(Time::from_hms(hour, 0, 0).unwrap())
        .assume_utc()
}
