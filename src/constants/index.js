// LocalStorage keys
export const STORAGE_KEYS = {
  TRANSACTIONS: 'expense_tracker_transactions',
  VERSION: 'expense_tracker_version',
};

// Date formats
export const DATE_FORMATS = {
  ISO: 'yyyy-MM-dd',
  DISPLAY: 'MMM dd, yyyy',
  DISPLAY_LONG: 'MMMM dd, yyyy',
  DISPLAY_SHORT: 'MMM dd',
};

// Validation rules
export const VALIDATION_RULES = {
  AMOUNT_MAX_DECIMALS: 2,
  DESCRIPTION_MAX_LENGTH: 200,
  AMOUNT_PATTERN: /^\d+(\.\d{1,2})?$/,
};

// Time periods
export const TIME_PERIODS = {
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  CUSTOM: 'custom',
};

// Transaction types
export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
};

// App metadata
export const APP_VERSION = '1.0.0';
