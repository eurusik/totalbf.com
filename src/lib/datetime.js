/**
 * Utility functions for formatting dates
 */

/**
 * Format a date string to a localized format (DD.MM.YYYY)
 * @param {string} dateString - The date string to format
 * @returns {string} Formatted date string or empty string if on server
 */
export function formatDate(dateString) {
  // Return empty string during server-side rendering to prevent hydration mismatch
  if (typeof window === 'undefined') {
    return '';
  }

  const date = new Date(dateString);
  return date.toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Format a date string to a full format with time
 * @param {string} dateString - The date string to format
 * @returns {string} Formatted date and time string or empty string if on server
 */
export function formatDateTime(dateString) {
  // Return empty string during server-side rendering to prevent hydration mismatch
  if (typeof window === 'undefined') {
    return '';
  }

  const date = new Date(dateString);
  return date.toLocaleString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format a date to a relative time (e.g., "2 days ago")
 * @param {string} dateString - The date string to format
 * @param {Object} translations - Object with translation functions
 * @returns {string} Relative time string
 */
export function formatRelativeTime(dateString, translations) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());

  // Calculate time differences
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

  // Special cases
  if (days === 0 && hours === 0 && minutes === 0 && seconds < 5) {
    return translations.justNow;
  }

  if (days === 1) {
    return translations.yesterday;
  }

  // Format based on the most significant time unit
  if (days >= 30) {
    return formatDate(dateString);
  }

  if (days > 0) {
    return formatTimeWithUnit(days, 'day', translations);
  }

  if (hours > 0) {
    return formatTimeWithUnit(hours, 'hour', translations);
  }

  if (minutes > 0) {
    return formatTimeWithUnit(minutes, 'minute', translations);
  }

  return formatTimeWithUnit(seconds, 'second', translations);
}

/**
 * Helper function to format time with the appropriate unit
 * @param {number} value - The numeric value
 * @param {string} unit - The time unit (day, hour, minute, second)
 * @param {Object} translations - Object with translation functions
 * @returns {string} Formatted time string
 */
function formatTimeWithUnit(value, unit, translations) {
  let form;

  switch (unit) {
    case 'day':
      form = getWordForm(
        value,
        translations.day,
        translations.days,
        translations.manyDays
      );
      break;
    case 'hour':
      form = getWordForm(
        value,
        translations.hour,
        translations.hours,
        translations.manyHours
      );
      break;
    case 'minute':
      form = getWordForm(
        value,
        translations.minute,
        translations.minutes,
        translations.manyMinutes
      );
      break;
    case 'second':
      form = getWordForm(
        value,
        translations.second,
        translations.seconds,
        translations.manySeconds
      );
      break;
    default:
      form = '';
  }

  return `${value} ${form} ${translations.ago}`;
}

/**
 * Helper function to get the correct form of a word based on number in Ukrainian/Russian grammar
 * @param {number} number - The number to determine the word form
 * @param {string} form1 - Form for 1 (e.g., день)
 * @param {string} form2 - Form for 2-4 (e.g., дні)
 * @param {string} form5 - Form for 5+ (e.g., днів)
 * @returns {string} Correct form of the word
 */
function getWordForm(number, form1, form2, form5) {
  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return form1;
  } else if (
    [2, 3, 4].includes(lastDigit) &&
    ![12, 13, 14].includes(lastTwoDigits)
  ) {
    return form2;
  } else {
    return form5;
  }
}

/**
 * sortObjectsByDate
 */
export function sortObjectsByDate(array, { key = 'date' } = {}) {
  return array.sort((a, b) => new Date(b[key]) - new Date(a[key]));
}
