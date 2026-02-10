import {
  format,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isAfter,
  isBefore,
  isToday as isTodayFn,
  isThisWeek as isThisWeekFn,
  isThisMonth as isThisMonthFn,
  parseISO,
} from 'date-fns';
import { DATE_FORMATS, TIME_PERIODS } from '../constants';

/**
 * Format a date for display
 * @param {string|Date} date - Date to format
 * @param {string} formatStr - Format string (defaults to DISPLAY format)
 * @returns {string} Formatted date string
 */
export function formatDate(date, formatStr = DATE_FORMATS.DISPLAY) {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatStr);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}

/**
 * Get date range for a time period
 * @param {object} period - Time period configuration
 * @returns {object} Object with startDate and endDate as ISO strings
 */
export function getTimePeriodRange(period) {
  const now = new Date();

  switch (period.type) {
    case TIME_PERIODS.TODAY:
      return {
        startDate: format(startOfDay(now), DATE_FORMATS.ISO),
        endDate: format(endOfDay(now), DATE_FORMATS.ISO),
      };

    case TIME_PERIODS.WEEK:
      return {
        startDate: format(startOfWeek(now), DATE_FORMATS.ISO),
        endDate: format(endOfWeek(now), DATE_FORMATS.ISO),
      };

    case TIME_PERIODS.MONTH:
      return {
        startDate: format(startOfMonth(now), DATE_FORMATS.ISO),
        endDate: format(endOfMonth(now), DATE_FORMATS.ISO),
      };

    case TIME_PERIODS.CUSTOM:
      return {
        startDate: period.startDate || format(startOfMonth(now), DATE_FORMATS.ISO),
        endDate: period.endDate || format(endOfDay(now), DATE_FORMATS.ISO),
      };

    default:
      return {
        startDate: format(startOfMonth(now), DATE_FORMATS.ISO),
        endDate: format(endOfDay(now), DATE_FORMATS.ISO),
      };
  }
}

/**
 * Check if a date is within a date range (inclusive)
 * @param {string} date - ISO date string to check
 * @param {string} startDate - ISO date string for start of range
 * @param {string} endDate - ISO date string for end of range
 * @returns {boolean} True if date is within range
 */
export function isDateInRange(date, startDate, endDate) {
  try {
    const dateObj = parseISO(date);
    const start = parseISO(startDate);
    const end = parseISO(endDate);

    return (
      (isAfter(dateObj, start) || dateObj.getTime() === start.getTime()) &&
      (isBefore(dateObj, end) || dateObj.getTime() === end.getTime())
    );
  } catch (error) {
    console.error('Error checking date range:', error);
    return false;
  }
}

/**
 * Check if a date is today
 * @param {string} date - ISO date string
 * @returns {boolean} True if date is today
 */
export function isToday(date) {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isTodayFn(dateObj);
  } catch (error) {
    console.error('Error checking if date is today:', error);
    return false;
  }
}

/**
 * Check if a date is this week
 * @param {string} date - ISO date string
 * @returns {boolean} True if date is this week
 */
export function isThisWeek(date) {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isThisWeekFn(dateObj);
  } catch (error) {
    console.error('Error checking if date is this week:', error);
    return false;
  }
}

/**
 * Check if a date is this month
 * @param {string} date - ISO date string
 * @returns {boolean} True if date is this month
 */
export function isThisMonth(date) {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isThisMonthFn(dateObj);
  } catch (error) {
    console.error('Error checking if date is this month:', error);
    return false;
  }
}
