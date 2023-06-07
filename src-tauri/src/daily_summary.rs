use serde::Serialize;
use time::Duration;

use crate::entry::{EntryType, ExistingEntry};

#[derive(Debug, Serialize, PartialEq, Eq)]
pub enum DailySummaryType {
    Break,
    Work,
}

#[derive(Serialize)]
pub struct DailySummary {
    pub name: Option<String>,
    pub description: Option<String>,
    pub duration: Duration,
    pub daily_summary_type: DailySummaryType,
}

impl DailySummary {
    pub fn from_entries(entries: &mut [ExistingEntry]) -> Result<Vec<Self>, String> {
        entries.sort_unstable_by_key(|x| x.time);

        let mut results: Vec<DailySummary> = vec![];
        let mut i = 0;
        let mut j = 1;

        while j < entries.len() {
            let new = DailySummary::from_entry_pair(&entries[i], &entries[j]);

            if let Some((i, _)) = results.iter().enumerate().find(|(_, result)| {
                result.name == new.name && result.daily_summary_type == new.daily_summary_type
            }) {
                results
                    .get_mut(i)
                    .ok_or("Failed iteration at DailySummery")?
                    .combine(&new);
            } else {
                results.push(new);
            }

            i += 1;
            j += 1;
        }

        results.sort_unstable_by(|x, y| x.name.cmp(&y.name));

        Ok(results)
    }

    fn combine(&mut self, other: &Self) {
        self.description = match (&self.description, &other.description) {
            (None, None) => None,
            (None, Some(b)) => Some(b.to_string()),
            (Some(a), None) => Some(a.to_string()),
            (Some(a), Some(b)) => Some(a.to_string() + "; " + b),
        };

        self.duration += other.duration;
    }

    fn from_entry_pair(a: &ExistingEntry, b: &ExistingEntry) -> Self {
        Self {
            name: a.name.clone(),
            description: a.description.clone(),
            duration: b.time - a.time,
            daily_summary_type: match a.entry_type {
                EntryType::Break => DailySummaryType::Break,
                _ => DailySummaryType::Work,
            },
        }
    }
}
