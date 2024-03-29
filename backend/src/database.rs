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
    pub fn create(&self, path: &str, entry: NewEntry) -> Result<(), String> {
        self.open(path)?;
        let lock = self.db.lock().map_err(|err| err.to_string())?;
        let db = lock.as_ref().ok_or("Db should be initialized")?;
        let date = entry.iso_date()?;
        let generated_key = db.generate_id().map_err(|err| err.to_string())?;
        let key = format!("{date}:{generated_key}");
        let serialized_entry = serialize(&ExistingEntry::from_new_entry(entry, generated_key))
            .map_err(|err| err.to_string())?;
        db.insert(key, serialized_entry)
            .map_err(|err| err.to_string())?;

        Ok(())
    }

    pub fn read_all_for_day(&self, path: &str, day: &Date) -> Result<Vec<ExistingEntry>, String> {
        self.open(path)?;
        let lock = self.db.lock().map_err(|err| err.to_string())?;
        let db = lock.as_ref().ok_or("Db should be initialized")?;
        let format = parse("[year]-[month]-[day]").map_err(|err| err.to_string())?;
        let prefix = day.format(&format).map_err(|err| err.to_string())?;

        let mut result = db
            .scan_prefix(prefix)
            .filter_map(|it| it.ok())
            .map(|(_, val)| deserialize(&val).map_err(|err| err.to_string()))
            .collect::<Result<Vec<ExistingEntry>, String>>()?;

        result.sort_by(|a, b| {
            let primary_order = a.time.cmp(&b.time);

            match primary_order {
                Ordering::Equal => a.id.cmp(&b.id),
                _ => primary_order,
            }
        });

        Ok(result)
    }

    pub fn update(&self, path: &str, entry: ExistingEntry) -> Result<(), String> {
        self.open(path)?;
        let lock = self.db.lock().map_err(|err| err.to_string())?;
        let db = lock.as_ref().ok_or("Db should be initialized")?;
        let key = entry.get_db_key()?;
        let serialized_entry = serialize(&entry).map_err(|err| err.to_string())?;
        db.insert(key, serialized_entry)
            .map_err(|err| err.to_string())?;

        Ok(())
    }

    pub fn delete(&self, path: &str, entry: ExistingEntry) -> Result<(), String> {
        self.open(path)?;
        let lock = self.db.lock().map_err(|err| err.to_string())?;
        let db = lock.as_ref().ok_or("Db should be initialized")?;
        let key = entry.get_db_key()?;
        db.remove(key).map_err(|err| err.to_string())?;

        Ok(())
    }

    fn open(&self, path: &str) -> Result<(), String> {
        let mut locked_db = self.db.lock().map_err(|err| err.to_string())?;
        if locked_db.is_none() {
            *locked_db = Some(open(path).map_err(|err| err.to_string())?)
        }
        Ok(())
    }
}
