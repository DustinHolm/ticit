use time::Weekday::*;
use time::{Date, Duration};

use crate::{entry::ExistingEntry, utils::total_work};

/// Sums based on a week starting on monday
pub fn weekly_summary(
    read_all_for_day: impl Fn(Date) -> Result<Vec<ExistingEntry>, String>,
    day: Date,
) -> Result<Duration, String> {
    let mut day = day;

    while day.weekday() != Monday {
        day = day.previous_day().ok_or("subtracted from MIN day")?;
    }

    let mut total_work_in_week = Duration::ZERO;

    while day.weekday() != Sunday {
        let mut entries = read_all_for_day(day)?;

        total_work_in_week += total_work(&mut entries);

        day = day.next_day().ok_or("added to MAX day")?;
    }

    Ok(total_work_in_week)
}
