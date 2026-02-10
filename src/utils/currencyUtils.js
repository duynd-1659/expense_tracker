/**
 * Format amount as currency
 * @param {number} amount - Amount to format
 * @param {string} locale - Locale string (defaults to 'vi-VN')
 * @param {string} currency - Currency code (defaults to 'VND')
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount, locale = 'vi-VN', currency = 'VND') {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return `${amount.toLocaleString()} ${currency}`;
  }
}

/**
 * Parse currency string to number
 * @param {string} value - Currency string to parse
 * @returns {number} Parsed number value
 */
export function parseCurrency(value) {
  try {
    // Remove all non-digit characters except decimal point
    const cleaned = value.replace(/[^\d.]/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  } catch (error) {
    console.error('Error parsing currency:', error);
    return 0;
  }
}

/**
 * Format amount with color coding based on type
 * @param {number} amount - Amount to format
 * @param {string} type - Transaction type ('income' or 'expense')
 * @returns {object} Object with formatted amount and color class
 */
export function formatAmountWithType(amount, type) {
  const formatted = formatCurrency(amount);
  const colorClass = type === 'income' ? 'text-green-600' : 'text-red-600';
  const sign = type === 'income' ? '+' : '-';

  return {
    formatted: `${sign}${formatted}`,
    colorClass,
    sign,
  };
}
