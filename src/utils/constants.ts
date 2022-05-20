import dayjs from "dayjs";

export const ANDROID_PLATFORM = "Android";
export const DEFAULT_DATE_PERIOD = [dayjs(), dayjs().add(7, "day")];
export const IOS_PLATFORM = "iOS";

export const API_OPTIONS = {
  headers: {
    Authorization: `Bearer ${process.env.VUE_APP_API_KEY}`,
  },
};
