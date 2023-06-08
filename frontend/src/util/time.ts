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

export const dateAsString = (date: Date) => format(date, "dd.MM.yyyy");

export const dateAsIsoString = (date: Date) => format(date, "yyyy-MM-dd");

export const timeAsString = (date: Date) => format(date, "HH:mm");
export const timeFromString = (date: string) => parse(date, "HH:mm", newDate());

export const dateTimeAsString = (date: Date) => format(date, "yyyy-MM-dd HH:mm:00.0 xxx:00");
export const dateTimeFromString = (date: string) =>
    parse(date, "yyyy-MM-dd HH:mm:ss.SSS xxx:00", newDate());

export const dateWithTime = (date: Date, time: Date) =>
    setMinutes(setHours(date, getHours(time)), getMinutes(time));

export const secondsAsDurationString = (seconds: number) => {
    const hours = secondsToHours(seconds);
    const minutes = secondsToMinutes(seconds) % 60;

    return `${hours}h ${minutes}m`;
};
