import PropTypes from 'prop-types';
import { TransactionItem } from './TransactionItem';

/**
 * TransactionList component - Displays list of transactions
 * @param {Object} props
 * @param {Array} props.transactions - Array of transaction objects
 * @param {Function} props.onEdit - Callback when edit button clicked
 * @param {Function} props.onDelete - Callback when delete button clicked
 * @param {boolean} props.loading - Loading state
 */
export const TransactionList = ({ transactions = [], onEdit, onDelete, loading = false }) => {
  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Loading skeleton
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-gray-200 rounded-lg h-24 animate-pulse"
            aria-label="Loading transaction"
          />
        ))}
      </div>
    );
  }

  // Empty state
  if (sortedTransactions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No transactions yet</h3>
        <p className="text-gray-600 mb-6">
          Start tracking your expenses by adding your first transaction
        </p>
      </div>
    );
  }

  // Transaction list
  return (
    <div className="space-y-4">
      {sortedTransactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ),
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
