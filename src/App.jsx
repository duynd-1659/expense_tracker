import { useState } from 'react';
import { TransactionProvider } from './context/TransactionContext';
import { useTransactions } from './hooks/useTransactions';
import { useFilters } from './hooks/useFilters';
import { Layout } from './components/layout/Layout';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import { TransactionList } from './components/transactions/TransactionList';
import { TransactionForm } from './components/transactions/TransactionForm';
import { FilterBar } from './components/transactions/FilterBar';
import { Modal } from './components/common/Modal';

/**
 * AppContent - Main app content (needs to be inside TransactionProvider)
 */
function AppContent() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
  const { filteredTransactions, filters, updateFilters, clearFilters, hasActiveFilters } =
    useFilters(transactions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Handle open modal for adding new transaction
  const handleAddTransaction = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  // Handle open modal for editing transaction
  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  // Handle form submit (add or update)
  const handleSubmit = (data) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, data);
    } else {
      addTransaction(data);
    }
    handleCloseModal();
  };

  // Handle delete transaction
  const handleDeleteTransaction = (id) => {
    deleteTransaction(id);
  };

  return (
    <Layout
      header={
        <Header
          onAddTransaction={handleAddTransaction}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      }
    >
      <div className="max-w-7xl mx-auto">
        {activeTab === 'dashboard' ? (
          <Dashboard
            transactions={filteredTransactions}
            onEdit={handleEditTransaction}
            onDelete={handleDeleteTransaction}
          />
        ) : (
          <>
            <FilterBar
              filters={filters}
              onFilterChange={updateFilters}
              onClearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
              transactions={filteredTransactions}
            />
            <TransactionList
              transactions={filteredTransactions}
              onEdit={handleEditTransaction}
              onDelete={handleDeleteTransaction}
            />
          </>
        )}
      </div>

      {/* Transaction Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
      >
        <TransactionForm
          mode={editingTransaction ? 'edit' : 'create'}
          initialData={editingTransaction}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          isOpen={isModalOpen}
        />
      </Modal>
    </Layout>
  );
}

/**
 * App - Root component with TransactionProvider
 */
function App() {
  return (
    <TransactionProvider>
      <AppContent />
    </TransactionProvider>
  );
}

export default App;
