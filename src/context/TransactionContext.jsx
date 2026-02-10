import { createContext, useContext, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { MOCK_TRANSACTIONS } from '../data/mockTransactions';
import { STORAGE_KEYS, TIME_PERIODS } from '../constants';

const TransactionContext = createContext(null);

export function TransactionProvider({ children }) {
  // Load transactions from localStorage with mock data as fallback
  const [transactions, setTransactions] = useLocalStorage(
    STORAGE_KEYS.TRANSACTIONS,
    MOCK_TRANSACTIONS
  );

  // Selected time period for dashboard
  const [selectedPeriod, setSelectedPeriod] = useState({
    type: TIME_PERIODS.MONTH,
  });

  /**
   * Add a new transaction
   * @param {object} transactionData - Transaction data without id, createdAt, updatedAt
   */
  const addTransaction = (transactionData) => {
    const newTransaction = {
      ...transactionData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTransactions([newTransaction, ...transactions]);
  };

  /**
   * Update an existing transaction
   * @param {string} id - Transaction ID
   * @param {object} updates - Fields to update
   */
  const updateTransaction = (id, updates) => {
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === id
          ? {
              ...transaction,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : transaction
      )
    );
  };

  /**
   * Delete a transaction
   * @param {string} id - Transaction ID
   */
  const deleteTransaction = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      setTransactions(transactions.filter((transaction) => transaction.id !== id));
    }
  };

  // Context value
  const value = useMemo(
    () => ({
      transactions,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      selectedPeriod,
      setSelectedPeriod,
    }),
    [transactions, selectedPeriod]
  );

  return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>;
}

/**
 * Hook to use transaction context
 * @throws {Error} If used outside of TransactionProvider
 */
export function useTransactionContext() {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error('useTransactionContext must be used within a TransactionProvider');
  }

  return context;
}
