import PropTypes from 'prop-types';
import { Button } from '../common/Button';

/**
 * Header component - App header with title and action button
 * @param {Object} props
 * @param {Function} props.onAddTransaction - Callback when add button clicked
 */
export const Header = ({ onAddTransaction }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4 md:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        {/* App title */}
        <div className="flex items-center gap-3">
          <div className="text-3xl">💰</div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Expense Tracker</h1>
            <p className="text-sm text-gray-600 hidden md:block">Track your income and expenses</p>
          </div>
        </div>

        {/* Add transaction button - Desktop */}
        <div className="hidden md:block">
          <Button variant="primary" onClick={onAddTransaction} className="flex items-center gap-2">
            <span className="text-xl">+</span>
            Add Transaction
          </Button>
        </div>

        {/* Add transaction button - Mobile (icon only) */}
        <div className="md:hidden">
          <Button
            variant="primary"
            onClick={onAddTransaction}
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl p-0"
            aria-label="Add transaction"
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  onAddTransaction: PropTypes.func.isRequired,
};
