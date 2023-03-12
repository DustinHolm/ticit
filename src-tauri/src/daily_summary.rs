use serde::Serialize;
use time::Duration;

use crate::entry::ExistingEntry;

#[derive(Serialize)]
pub struct DailySummary {
    name: Option<String>,
    description: Option<String>,
    duration: Duration,
}

impl DailySummary {
    pub fn from_entries(entries: &mut [ExistingEntry]) -> Result<Vec<Self>, String> {
        entries.sort_unstable_by_key(|x| x.time);

        let mut results: Vec<DailySummary> = vec![];
        let mut i = 0;
        let mut j = 1;

        while j < entries.len() {
            let new = DailySummary::from_entry_pair(&entries[i], &entries[j]);

            if let Some((i, _)) = results
                .iter()
                .enumerate()
                .find(|(_, result)| result.name == new.name)
            {
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
        }
    }
}
