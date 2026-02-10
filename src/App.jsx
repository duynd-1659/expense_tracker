import { useState } from 'react';
import { TransactionProvider } from './context/TransactionContext';
import { useTransactions } from './hooks/useTransactions';
import { Layout } from './components/layout/Layout';
import { Header } from './components/layout/Header';
import { TransactionList } from './components/transactions/TransactionList';
import { TransactionForm } from './components/transactions/TransactionForm';
import { Modal } from './components/common/Modal';

/**
 * AppContent - Main app content (needs to be inside TransactionProvider)
 */
function AppContent() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

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
    <Layout header={<Header onAddTransaction={handleAddTransaction} />}>
      <div className="max-w-4xl mx-auto">
        <TransactionList
          transactions={transactions}
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
        />
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
