#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use database::Database;
use tauri::{generate_context, generate_handler, Builder};

use crate::commands::{
    all_entries_for_day, delete_entry, durations_for_day, edit_entry, end_day, new_entry,
    take_break,
};

mod commands;
mod daily_summary;
mod database;
mod entry;

fn main() {
    Builder::default()
        .manage(Database::default())
        .invoke_handler(generate_handler![
            new_entry,
            edit_entry,
            delete_entry,
            take_break,
            end_day,
            all_entries_for_day,
            durations_for_day
        ])
        .run(generate_context!())
        .expect("Error while running tauri application.");
}
