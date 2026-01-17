use tauri::{AppHandle, Manager, State};
use time::{Date, Duration, OffsetDateTime};

use crate::database::Database;
use ticit::entry::{ExistingEntry, NewEntry};
use ticit::simple_time::SimpleTime;
use ticit::{daily_summary::DailySummary, weekly_data::weekly_summary};

#[tauri::command]
pub fn new_entry(entry: NewEntry, app: AppHandle, db: State<Database>) -> Result<(), String> {
    let path = get_path(&app)?;

    db.create(&path, entry)
}

#[tauri::command]
pub fn edit_entry(entry: ExistingEntry, app: AppHandle, db: State<Database>) -> Result<(), String> {
    let path = get_path(&app)?;

    db.update(&path, entry)
}

#[tauri::command]
pub fn delete_entry(
    entry: ExistingEntry,
    app: AppHandle,
    db: State<Database>,
) -> Result<(), String> {
    let path = get_path(&app)?;

    db.delete(&path, entry)
}

#[tauri::command]
pub fn take_break(time: OffsetDateTime, app: AppHandle, db: State<Database>) -> Result<(), String> {
    let path = get_path(&app)?;
    let entry = NewEntry::new_break(&time);

    db.create(&path, entry)
}

#[tauri::command]
pub fn end_day(time: OffsetDateTime, app: AppHandle, db: State<Database>) -> Result<(), String> {
    let path = get_path(&app)?;
    let entry = NewEntry::new_end_of_day(&time);

    db.create(&path, entry)
}

#[tauri::command]
pub fn all_entries_for_day(
    day: Date,
    app: AppHandle,
    db: State<Database>,
) -> Result<Vec<ExistingEntry>, String> {
    let path = get_path(&app)?;

    db.read_all_for_day(&path, &day)
}

#[tauri::command]
pub fn durations_for_day(
    day: Date,
    app: AppHandle,
    db: State<Database>,
) -> Result<Vec<DailySummary>, String> {
    let path = get_path(&app)?;
    let mut entries = db.read_all_for_day(&path, &day)?;

    DailySummary::from_entries(&mut entries)
}

#[tauri::command]
pub fn simple_time_for_day(
    day: Date,
    app: AppHandle,
    db: State<Database>,
) -> Result<SimpleTime, String> {
    let path = get_path(&app)?;
    let mut entries = db.read_all_for_day(&path, &day)?;

    SimpleTime::from_entries(&mut entries)
}

#[tauri::command]
pub fn total_work_in_week(
    day: Date,
    app: AppHandle,
    db: State<Database>,
) -> Result<Duration, String> {
    let path = get_path(&app)?;

    weekly_summary(|d| db.read_all_for_day(&path, &d), day)
}

fn get_path(app: &AppHandle) -> Result<String, String> {
    app.path()
        .app_data_dir()
        .ok()
        .and_then(|it| it.to_str().map(|s| s.to_string()))
        .ok_or("No path given".to_string())
}
