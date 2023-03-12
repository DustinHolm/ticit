use std::{cmp::Ordering, sync::Mutex};

use bincode::{deserialize, serialize};
use sled::{open, Db};
use time::{format_description::parse, Date};

use crate::entry::{Entry, ExistingEntry, NewEntry};

#[derive(Default)]
pub struct Database {
    db: Mutex<Option<Db>>,
}

impl Database {
    pub fn create(&self, path: &str, entry: NewEntry) {
        self.open(path);
        let lock = self.db.lock().expect("Thread trouble");
        let db = lock.as_ref().expect("Db should be initialized");
        let date = entry.iso_date();
        let generated_key = db.generate_id().expect("Could not generate DB key");
        let key = format!("{date}:{generated_key}");
        let serialized_entry = serialize(&ExistingEntry::from_new_entry(entry, generated_key))
            .expect("Could not serialize.");
        db.insert(key, serialized_entry)
            .expect("Database is not writable.");
    }

    pub fn read_all_for_day(&self, path: &str, day: Date) -> Vec<ExistingEntry> {
        self.open(path);
        let lock = self.db.lock().expect("Thread trouble");
        let db = lock.as_ref().expect("Db should be initialized");
        let format = parse("[year]-[month]-[day]").unwrap();
        let prefix = day.format(&format).expect("What kind of date is this?");

        let mut result = db
            .scan_prefix(&prefix)
            .filter_map(|it| it.ok())
            .map(|(_, val)| deserialize(&val).expect("Could not deserialize."))
            .collect::<Vec<ExistingEntry>>();

        result.sort_by(|a, b| {
            let primary_order = a.time.cmp(&b.time);

            match primary_order {
                Ordering::Equal => a.id.cmp(&b.id),
                _ => primary_order,
            }
        });

        result
    }

    pub fn update(&self, path: &str, entry: ExistingEntry) {
        self.open(path);
        let lock = self.db.lock().expect("Thread trouble");
        let db = lock.as_ref().expect("Db should be initialized");
        let key = entry.get_db_key();
        let serialized_entry = serialize(&entry).expect("Could not serialize.");
        db.insert(key, serialized_entry)
            .expect("Database is not writable.");
    }

    pub fn delete(&self, path: &str, entry: ExistingEntry) {
        self.open(path);
        let lock = self.db.lock().expect("Thread trouble");
        let db = lock.as_ref().expect("Db should be initialized");
        let key = entry.get_db_key();
        db.remove(key).expect("Database is not writable.");
    }

    fn open(&self, path: &str) {
        let mut locked_db = self.db.lock().expect("Thread trouble");
        if locked_db.is_none() {
            *locked_db = Some(open(path).expect("Could not open database."))
        }
    }
}
