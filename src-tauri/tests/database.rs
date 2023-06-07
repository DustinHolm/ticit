use tempfile::tempdir;
use ticit::{
    database::Database,
    entry::{ExistingEntry, NewEntry},
};
use time::{Date, Month, OffsetDateTime, Time};

#[test]
fn starts_empty() {
    let (path, db, date) = generate_test_input();

    assert_eq!(db.read_all_for_day(&path, &date), Ok(vec![]));
}

#[test]
fn can_create_new_entries() {
    let (path, db, date) = generate_test_input();
    let entry_0 = NewEntry::new_work(None, None, &offset_date_time(&date, 12));
    let entry_1 = NewEntry::new_break(&offset_date_time(&date, 12));
    let entry_2 = NewEntry::new_end_of_day(&offset_date_time(&date, 12));
    let expected_0 = ExistingEntry::from_new_entry(entry_0.clone(), 0);
    let expected_1 = ExistingEntry::from_new_entry(entry_1.clone(), 1);
    let expected_2 = ExistingEntry::from_new_entry(entry_2.clone(), 2);

    db.create(&path, entry_0).unwrap();
    db.create(&path, entry_1).unwrap();
    db.create(&path, entry_2).unwrap();

    assert_eq!(
        db.read_all_for_day(&path, &date),
        Ok(vec![expected_0, expected_1, expected_2])
    );
}

#[test]
fn can_delete_entries() {
    let (path, db, date) = generate_test_input();
    let entry = NewEntry::new_work(None, None, &offset_date_time(&date, 12));
    let expected_0 = ExistingEntry::from_new_entry(entry.clone(), 0);
    let expected_1 = ExistingEntry::from_new_entry(entry.clone(), 1);

    db.create(&path, entry.clone()).unwrap();
    db.create(&path, entry).unwrap();

    db.delete(&path, expected_0).unwrap();

    assert_eq!(db.read_all_for_day(&path, &date), Ok(vec![expected_1]));
}

#[test]
fn handles_all_names_and_descriptions() {
    let (path, db, date) = generate_test_input();

    for (index, naughty_string) in naughty_strings::BLNS.into_iter().enumerate() {
        let entry = NewEntry::new_work(
            Some(naughty_string.to_string()),
            Some(naughty_string.to_string()),
            &offset_date_time(&date, 12),
        );
        let expected = ExistingEntry::from_new_entry(entry.clone(), index as u64);

        db.create(&path, entry).unwrap();

        assert_eq!(
            db.read_all_for_day(&path, &date),
            Ok(vec![expected.clone()])
        );

        db.delete(&path, expected).unwrap();
    }
}

#[test]
fn can_update_entries() {
    let (path, db, date) = generate_test_input();
    let entry = NewEntry::new_work(None, None, &offset_date_time(&date, 12));
    let entry_with_other_name = NewEntry::new_work(
        Some("Other".to_string()),
        None,
        &offset_date_time(&date, 12),
    );
    let expected_0 = ExistingEntry::from_new_entry(entry_with_other_name.clone(), 0);
    let expected_1 = ExistingEntry::from_new_entry(entry.clone(), 1);

    db.create(&path, entry.clone()).unwrap();
    db.create(&path, entry).unwrap();
    db.update(&path, expected_0.clone()).unwrap();

    assert_eq!(
        db.read_all_for_day(&path, &date),
        Ok(vec![expected_0, expected_1])
    );
}

#[test]
fn entries_are_returned_in_chronological_order() {
    let (path, db, date) = generate_test_input();
    let entry_0 = NewEntry::new_work(None, None, &offset_date_time(&date, 12));
    let entry_1 = NewEntry::new_work(None, None, &offset_date_time(&date, 0));
    let entry_2 = NewEntry::new_work(None, None, &offset_date_time(&date, 23));
    let entry_3 = NewEntry::new_work(None, None, &offset_date_time(&date, 5));
    let expected_0 = ExistingEntry::from_new_entry(entry_0.clone(), 0);
    let expected_1 = ExistingEntry::from_new_entry(entry_1.clone(), 1);
    let expected_2 = ExistingEntry::from_new_entry(entry_2.clone(), 2);
    let expected_3 = ExistingEntry::from_new_entry(entry_3.clone(), 3);

    db.create(&path, entry_0).unwrap();
    db.create(&path, entry_1).unwrap();
    db.create(&path, entry_2).unwrap();
    db.create(&path, entry_3).unwrap();

    assert_eq!(
        db.read_all_for_day(&path, &date),
        Ok(vec![expected_1, expected_3, expected_0, expected_2])
    );
}

fn generate_test_input() -> (String, Database, Date) {
    let dir = tempdir().unwrap();
    let path = dir.path().to_str().unwrap().to_string();
    let db = Database::default();
    let date = Date::from_calendar_date(2000, Month::December, 24).unwrap();

    (path, db, date)
}

fn offset_date_time(date: &Date, hour: u8) -> OffsetDateTime {
    date.with_time(Time::from_hms(hour, 0, 0).unwrap())
        .assume_utc()
}
