import PropTypes from 'prop-types';
import { formatCurrency } from '../../utils/currencyUtils';
import { formatDate } from '../../utils/dateUtils';
import { getCategoryById } from '../../data/categories';
import { TRANSACTION_TYPES, DATE_FORMATS } from '../../constants';
import { Button } from '../common/Button';

/**
 * TransactionItem component - Displays a single transaction
 * @param {Object} props
 * @param {Object} props.transaction - Transaction object
 * @param {Function} props.onEdit - Callback when edit button clicked
 * @param {Function} props.onDelete - Callback when delete button clicked
 */
export const TransactionItem = ({ transaction, onEdit, onDelete }) => {
  const { id, amount, type, categoryId, date, description } = transaction;
  const category = getCategoryById(categoryId);

  // Color classes based on transaction type
  const amountColorClass = type === TRANSACTION_TYPES.INCOME ? 'text-green-600' : 'text-red-600';

  const typeSymbol = type === TRANSACTION_TYPES.INCOME ? '+' : '-';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        {/* Left side: Category icon and details */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* Category icon with background color */}
          <div
            className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{ backgroundColor: category?.color || '#6B7280' }}
          >
            {category?.icon || '📌'}
          </div>

          {/* Transaction details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 truncate">
                {category?.name || 'Unknown'}
              </h3>
              <span className="text-xs text-gray-500 flex-shrink-0">
                {formatDate(new Date(date), DATE_FORMATS.DISPLAY)}
              </span>
            </div>
            {description && (
              <p className="text-sm text-gray-600 line-clamp-2 mb-2">{description}</p>
            )}
            <div className={`text-lg font-bold ${amountColorClass}`}>
              {typeSymbol}
              {formatCurrency(amount)}
            </div>
          </div>
        </div>

        {/* Right side: Action buttons */}
        <div className="flex flex-col gap-2 flex-shrink-0">
          <Button
            variant="outline"
            onClick={() => onEdit(transaction)}
            className="min-w-[44px] px-3 py-1 text-sm"
            aria-label={`Edit ${category?.name || 'transaction'}`}
          >
            ✏️
          </Button>
          <Button
            variant="danger"
            onClick={() => onDelete(id)}
            className="min-w-[44px] px-3 py-1 text-sm"
            aria-label={`Delete ${category?.name || 'transaction'}`}
          >
            🗑️
          </Button>
        </div>
      </div>
    </div>
  );
};

TransactionItem.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    type: PropTypes.oneOf([TRANSACTION_TYPES.INCOME, TRANSACTION_TYPES.EXPENSE]).isRequired,
    categoryId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
