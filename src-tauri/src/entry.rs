use serde::{Deserialize, Serialize};
use time::{format_description::parse, OffsetDateTime};

#[derive(Serialize, Deserialize)]
enum EntryType {
    Break,
    EndOfDay,
    Work,
}

#[derive(Serialize, Deserialize)]
pub struct NewEntry {
    name: Option<String>,
    description: Option<String>,
    time: OffsetDateTime,
    entry_type: EntryType,
}

impl NewEntry {
    pub fn new_break(time: &OffsetDateTime) -> Self {
        Self {
            name: None,
            description: None,
            time: time.clone(),
            entry_type: EntryType::Break,
        }
    }

    pub fn new_end_of_day(time: &OffsetDateTime) -> Self {
        Self {
            name: None,
            description: None,
            time: time.clone(),
            entry_type: EntryType::EndOfDay,
        }
    }
}

#[derive(Serialize, Deserialize)]
pub struct ExistingEntry {
    pub id: u64,
    pub name: Option<String>,
    pub description: Option<String>,
    pub time: OffsetDateTime,
    entry_type: EntryType,
}

impl ExistingEntry {
    pub fn from_new_entry(entry: NewEntry, id: u64) -> Self {
        Self {
            id,
            name: entry.name,
            description: entry.description,
            time: entry.time,
            entry_type: entry.entry_type,
        }
    }

    pub fn get_db_key(&self) -> String {
        format!("{}:{}", self.iso_date(), self.id.to_string())
    }
}

pub trait Entry {
    fn iso_date(&self) -> String;
}

impl Entry for NewEntry {
    fn iso_date(&self) -> String {
        let format = parse("[year]-[month]-[day]").unwrap();

        self.time
            .date()
            .format(&format)
            .expect("What kind of date is this?")
    }
}

impl Entry for ExistingEntry {
    fn iso_date(&self) -> String {
        let format = parse("[year]-[month]-[day]").unwrap();

        self.time
            .date()
            .format(&format)
            .expect("What kind of date is this?")
    }
}
