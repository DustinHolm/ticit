#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use database::Database;
use tauri::{generate_context, generate_handler, Builder};
use ticit::database;

use crate::commands::{
    all_entries_for_day, delete_entry, durations_for_day, edit_entry, end_day, new_entry,
    simple_time_for_day, take_break,
};

mod commands;

fn main() {
    Builder::default()
        .manage(Database::new())
        .invoke_handler(generate_handler![
            new_entry,
            edit_entry,
            delete_entry,
            take_break,
            end_day,
            all_entries_for_day,
            durations_for_day,
            simple_time_for_day
        ])
        .run(generate_context!())
        .expect("Error while running tauri application.");
}
