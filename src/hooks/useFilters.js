import { useState, useMemo } from 'react';
import { isDateInRange } from '../utils/dateUtils';

/**
 * Custom hook for filtering transactions
 * @param {array} transactions - Array of transactions to filter
 * @returns {object} Filter state and filtered transactions
 */
export function useFilters(transactions) {
  const [filters, setFilters] = useState({
    categoryId: null,
    type: null,
    startDate: null,
    endDate: null,
    searchQuery: '',
  });

  /**
   * Update filters (partial update)
   * @param {object} newFilters - Partial filter updates
   */
  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  /**
   * Clear all filters
   */
  const clearFilters = () => {
    setFilters({
      categoryId: null,
      type: null,
      startDate: null,
      endDate: null,
      searchQuery: '',
    });
  };

  /**
   * Check if any filters are active
   */
  const hasActiveFilters = useMemo(() => {
    return (
      filters.categoryId !== null ||
      filters.type !== null ||
      filters.startDate !== null ||
      filters.endDate !== null ||
      filters.searchQuery.trim() !== ''
    );
  }, [filters]);

  /**
   * Apply all filters to transactions
   */
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      // Filter by category
      if (filters.categoryId && transaction.category !== filters.categoryId) {
        return false;
      }

      // Filter by type
      if (filters.type && transaction.type !== filters.type) {
        return false;
      }

      // Filter by date range
      if (filters.startDate && filters.endDate) {
        if (!isDateInRange(transaction.date, filters.startDate, filters.endDate)) {
          return false;
        }
      } else if (filters.startDate) {
        // Only start date provided
        if (transaction.date < filters.startDate) {
          return false;
        }
      } else if (filters.endDate) {
        // Only end date provided
        if (transaction.date > filters.endDate) {
          return false;
        }
      }

      // Search in description (case-insensitive)
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase();
        const description = (transaction.description || '').toLowerCase();
        if (!description.includes(query)) {
          return false;
        }
      }

      return true;
    });
  }, [transactions, filters]);

  return {
    filters,
    updateFilters,
    clearFilters,
    hasActiveFilters,
    filteredTransactions,
  };
}
