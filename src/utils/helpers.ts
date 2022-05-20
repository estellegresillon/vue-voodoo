import dayjs, { Dayjs } from "dayjs";

import { DEFAULT_DATE_PERIOD } from "./constants";
import { Placement } from "@/types/index";

export const formatApiDate = (index: number, date?: Dayjs[]) => {
  if (!date) return DEFAULT_DATE_PERIOD[index];

  return typeof date[index] === "string"
    ? date[index]
    : dayjs(date[index]).format("YYYY-MM-DD");
};

export const parseDate = (date?: string[]): Dayjs[] | null => {
  return date ? [dayjs(date[0]), dayjs(date[1])] : null;
};

export const sumNumbers = (revenues: number[]) => {
  return Math.floor(revenues.reduce((acc, obj) => acc + obj, 0));
};

export const sumRevenues = (revenues: Placement[]) => {
  return Math.floor(revenues.reduce((acc, obj) => acc + obj.revenue, 0));
};
