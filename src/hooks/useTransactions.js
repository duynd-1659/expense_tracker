import { useTransactionContext } from '../context/TransactionContext';

/**
 * Custom hook to access transactions
 * This is a convenience wrapper around useTransactionContext
 * @returns {object} Transaction context value
 */
export function useTransactions() {
  return useTransactionContext();
}
