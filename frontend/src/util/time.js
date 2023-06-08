import {
    format,
    getHours,
    getMinutes,
    parse,
    secondsToHours,
    secondsToMinutes,
    setHours,
    setMinutes,
} from "date-fns";

export const newDate = () => new Date();

export const dateAsString = (date) => format(date, "dd.MM.yyyy");

export const dateAsIsoString = (date) => format(date, "yyyy-MM-dd");

export const timeAsString = (date) => format(date, "HH:mm");
export const timeFromString = (date) => parse(date, "HH:mm", newDate());

export const dateTimeAsString = (date) => format(date, "yyyy-MM-dd HH:mm:00.0 xxx:00");
export const dateTimeFromString = (date) =>
    parse(date, "yyyy-MM-dd HH:mm:ss.SSS xxx:00", newDate());

export const dateWithTime = (date, time) =>
    setMinutes(setHours(date, getHours(time)), getMinutes(time));

export const secondsAsDurationString = (seconds) => {
    const hours = secondsToHours(seconds);
    const minutes = secondsToMinutes(seconds) % 60;

    return `${hours}h ${minutes}m`;
};
