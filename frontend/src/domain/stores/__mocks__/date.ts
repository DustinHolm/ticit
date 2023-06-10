import { writable } from "svelte/store";
import { newDate } from "../../../util/time";

export const date = writable(newDate());

export type MockDateStore = typeof date;
