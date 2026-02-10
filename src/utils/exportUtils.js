import { formatDate } from './dateUtils';
import { getCategoryById } from '../data/categories';
import { DATE_FORMATS } from '../constants';

/**
 * Convert transactions to CSV format
 * @param {Array} transactions - Array of transaction objects
 * @returns {string} CSV string
 */
export function transactionsToCSV(transactions) {
  // CSV Header
  const headers = ['Date', 'Type', 'Category', 'Amount', 'Description'];
  const csvRows = [headers.join(',')];

  // Add transaction rows
  transactions.forEach((transaction) => {
    const category = getCategoryById(transaction.category);
    const row = [
      formatDate(new Date(transaction.date), DATE_FORMATS.DISPLAY),
      transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1),
      category?.name || 'Unknown',
      transaction.amount,
      `"${(transaction.description || '').replace(/"/g, '""')}"`, // Escape quotes
    ];
    csvRows.push(row.join(','));
  });

  return csvRows.join('\n');
}

/**
 * Download transactions as CSV file
 * @param {Array} transactions - Array of transaction objects
 * @param {string} filename - Filename for the download
 */
export function downloadTransactionsCSV(transactions, filename = 'transactions.csv') {
  const csv = transactionsToCSV(transactions);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

/**
 * Generate filename with date range
 * @param {string} startDate - Start date (ISO format)
 * @param {string} endDate - End date (ISO format)
 * @returns {string} Filename
 */
export function generateCSVFilename(startDate, endDate) {
  const start = startDate ? formatDate(new Date(startDate), 'yyyy-MM-dd') : 'all';
  const end = endDate ? formatDate(new Date(endDate), 'yyyy-MM-dd') : 'time';
  return `transactions_${start}_to_${end}.csv`;
}
