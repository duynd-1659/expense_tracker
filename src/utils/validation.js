import { VALIDATION_RULES } from '../constants';
import { CATEGORIES } from '../data/categories';

/**
 * Validate transaction data
 * @param {object} data - Transaction data to validate
 * @returns {object} Validation result with isValid flag and errors array
 */
export function validateTransaction(data) {
  const errors = [];

  // Validate amount
  if (!data.amount || data.amount <= 0) {
    errors.push({ field: 'amount', message: 'Amount must be greater than 0' });
  } else if (!VALIDATION_RULES.AMOUNT_PATTERN.test(data.amount.toString())) {
    errors.push({ field: 'amount', message: 'Amount can have maximum 2 decimal places' });
  }

  // Validate type
  if (!data.type || !['income', 'expense'].includes(data.type)) {
    errors.push({ field: 'type', message: 'Type must be either income or expense' });
  }

  // Validate category
  if (!data.category) {
    errors.push({ field: 'category', message: 'Category is required' });
  } else {
    const categoryExists = CATEGORIES.some((cat) => cat.id === data.category);
    if (!categoryExists) {
      errors.push({ field: 'category', message: 'Invalid category selected' });
    } else {
      // Check if category type matches transaction type
      const category = CATEGORIES.find((cat) => cat.id === data.category);
      if (category && category.type !== data.type) {
        errors.push({
          field: 'category',
          message: `Category "${category.name}" is for ${category.type}, but transaction type is ${data.type}`,
        });
      }
    }
  }

  // Validate date
  if (!data.date) {
    errors.push({ field: 'date', message: 'Date is required' });
  } else {
    const dateObj = new Date(data.date);
    if (isNaN(dateObj.getTime())) {
      errors.push({ field: 'date', message: 'Invalid date format' });
    }
    // Optional: Check if date is in the future
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    if (dateObj > today) {
      errors.push({ field: 'date', message: 'Date cannot be in the future' });
    }
  }

  // Validate description (optional field)
  if (data.description && data.description.length > VALIDATION_RULES.DESCRIPTION_MAX_LENGTH) {
    errors.push({
      field: 'description',
      message: `Description must be ${VALIDATION_RULES.DESCRIPTION_MAX_LENGTH} characters or less`,
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Get error message for a specific field
 * @param {array} errors - Array of error objects
 * @param {string} fieldName - Name of the field
 * @returns {string|null} Error message or null
 */
export function getFieldError(errors, fieldName) {
  const error = errors.find((err) => err.field === fieldName);
  return error ? error.message : null;
}
