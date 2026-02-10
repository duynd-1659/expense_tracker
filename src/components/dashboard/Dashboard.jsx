import PropTypes from 'prop-types';
import { BalanceSummary } from './BalanceSummary';
import { SpendingChart } from './SpendingChart';
import { RecentTransactions } from './RecentTransactions';
import { TRANSACTION_TYPES } from '../../constants';

/**
 * Dashboard - Main dashboard view with summary and charts
 */
export function Dashboard({ transactions, onEdit, onDelete }) {
  return (
    <div className="space-y-6">
      {/* Balance Summary Cards */}
      <BalanceSummary transactions={transactions} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendingChart transactions={transactions} type={TRANSACTION_TYPES.EXPENSE} />
        <SpendingChart transactions={transactions} type={TRANSACTION_TYPES.INCOME} />
      </div>

      {/* Recent Transactions */}
      <RecentTransactions
        transactions={transactions}
        onEdit={onEdit}
        onDelete={onDelete}
        limit={5}
      />
    </div>
  );
}

Dashboard.propTypes = {
  transactions: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
