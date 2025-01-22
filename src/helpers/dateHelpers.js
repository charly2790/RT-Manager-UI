import dayjs from 'dayjs';
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export const TIMEZONES = {
    ARG: 'America/Argentina/Buenos_Aires',
}

export const convertToLocalTime = ( date ) => {
    return dayjs(date).tz(TIMEZONES.ARG);
}

export const convertToUtcTime = ( date ) => {
    return dayjs(date).utc();
}

export const parseDate = ( date ) => {
    return dayjs(date);
}