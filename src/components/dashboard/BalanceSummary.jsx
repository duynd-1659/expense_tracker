import PropTypes from 'prop-types';
import { formatCurrency } from '../../utils/currencyUtils';
import { TRANSACTION_TYPES } from '../../constants';

/**
 * BalanceSummary - Display total income, expenses, and balance
 */
export function BalanceSummary({ transactions }) {
  const totals = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === TRANSACTION_TYPES.INCOME) {
        acc.income += transaction.amount;
      } else {
        acc.expense += transaction.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const balance = totals.income - totals.expense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Total Income */}
      <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-green-700 font-medium mb-1">Total Income</p>
            <p className="text-2xl font-bold text-green-900">{formatCurrency(totals.income)}</p>
          </div>
          <div className="text-3xl text-green-500">📈</div>
        </div>
      </div>

      {/* Total Expenses */}
      <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-red-700 font-medium mb-1">Total Expenses</p>
            <p className="text-2xl font-bold text-red-900">{formatCurrency(totals.expense)}</p>
          </div>
          <div className="text-3xl text-red-500">📉</div>
        </div>
      </div>

      {/* Balance */}
      <div
        className={`border-l-4 rounded-lg p-4 ${
          balance >= 0 ? 'bg-blue-50 border-blue-500' : 'bg-orange-50 border-orange-500'
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p
              className={`text-sm font-medium mb-1 ${
                balance >= 0 ? 'text-blue-700' : 'text-orange-700'
              }`}
            >
              Balance
            </p>
            <p
              className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-900' : 'text-orange-900'}`}
            >
              {formatCurrency(Math.abs(balance))}
            </p>
          </div>
          <div className={`text-3xl ${balance >= 0 ? 'text-blue-500' : 'text-orange-500'}`}>
            {balance >= 0 ? '💰' : '⚠️'}
          </div>
        </div>
      </div>
    </div>
  );
}

BalanceSummary.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
};
