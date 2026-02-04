use std::{cmp::Reverse, collections::HashMap};

use time::ext::NumericalDuration;
use time::Date;

use crate::entry::ExistingEntry;

/// Returns all entry names ordered by usage (weighted towards newer)
pub fn ordered_completions(
    read_all_for_day: impl Fn(Date) -> Result<Vec<ExistingEntry>, String>,
    day: Date,
    lookback_days: u8,
) -> Vec<String> {
    let mut day = day;
    let mut remaining_lookback_days = lookback_days;

    let mut results: HashMap<String, u32> = HashMap::new();

    while remaining_lookback_days > 0 {
        if let Ok(current) = read_all_for_day(day) {
            for result in current {
                if let Some(name) = result.name {
                    let weight = if remaining_lookback_days > lookback_days / 2 {
                        2
                    } else {
                        1
                    };

                    results
                        .entry(name)
                        .and_modify(|count| *count += weight)
                        .or_insert(weight);
                }
            }
        }

        day = day.saturating_sub(1.days());
        remaining_lookback_days -= 1;
    }

    let mut result_list: Vec<(String, u32)> = results.into_iter().collect();

    result_list.sort_by_key(|&(_, count)| Reverse(count));

    result_list
        .into_iter()
        .map(|(completion, _)| completion)
        .collect()
}
