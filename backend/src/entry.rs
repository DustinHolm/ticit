use serde::{Deserialize, Serialize};
use time::{format_description::parse, OffsetDateTime};

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub(crate) enum EntryType {
    Break,
    EndOfDay,
    Work,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
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
            time: *time,
            entry_type: EntryType::Break,
        }
    }

    pub fn new_end_of_day(time: &OffsetDateTime) -> Self {
        Self {
            name: None,
            description: None,
            time: *time,
            entry_type: EntryType::EndOfDay,
        }
    }

    pub fn new_work(
        name: Option<String>,
        description: Option<String>,
        time: &OffsetDateTime,
    ) -> Self {
        Self {
            name,
            description,
            time: *time,
            entry_type: EntryType::Work,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct ExistingEntry {
    pub(crate) id: u64,
    pub(crate) name: Option<String>,
    pub(crate) description: Option<String>,
    pub(crate) time: OffsetDateTime,
    pub(crate) entry_type: EntryType,
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

    pub(crate) fn get_db_key(&self) -> Result<String, String> {
        let date = self.iso_date()?;
        Ok(format!("{}:{}", date, self.id))
    }
}

pub(crate) trait Entry {
    fn iso_date(&self) -> Result<String, String>;
}

impl Entry for NewEntry {
    fn iso_date(&self) -> Result<String, String> {
        let format = parse("[year]-[month]-[day]").map_err(|err| err.to_string())?;

        self.time
            .date()
            .format(&format)
            .map_err(|err| err.to_string())
    }
}

impl Entry for ExistingEntry {
    fn iso_date(&self) -> Result<String, String> {
        let format = parse("[year]-[month]-[day]").map_err(|err| err.to_string())?;

        self.time
            .date()
            .format(&format)
            .map_err(|err| err.to_string())
    }
}
