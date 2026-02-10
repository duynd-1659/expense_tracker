import PropTypes from 'prop-types';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { ExportButton } from '../export/ExportButton';
import { CATEGORIES } from '../../data/categories';
import { TRANSACTION_TYPES, TIME_PERIODS } from '../../constants';
import { getTimePeriodRange } from '../../utils/dateUtils';

/**
 * FilterBar - Filters for transactions
 */
export function FilterBar({
  filters,
  onFilterChange,
  onClearFilters,
  hasActiveFilters,
  transactions,
}) {
  const handleTimePeriodChange = (period) => {
    if (period === 'custom') {
      return; // User will use date inputs
    }

    const { startDate, endDate } = getTimePeriodRange(period);
    onFilterChange({
      startDate: startDate || null,
      endDate: endDate || null,
    });
  };

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...CATEGORIES.map((cat) => ({
      value: cat.id,
      label: cat.name,
      icon: cat.icon,
    })),
  ];

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: TRANSACTION_TYPES.INCOME, label: 'Income' },
    { value: TRANSACTION_TYPES.EXPENSE, label: 'Expense' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <div className="flex gap-2">
          <ExportButton transactions={transactions} filters={filters} />
          {hasActiveFilters && (
            <Button variant="outline" onClick={onClearFilters} className="text-sm">
              Clear All
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            id="search"
            type="text"
            value={filters.searchQuery || ''}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Search description..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <Select
          label="Category"
          name="category"
          value={filters.category || ''}
          onChange={(e) => onFilterChange({ category: e.target.value || null })}
          options={categoryOptions}
          showIcons={true}
        />

        {/* Type Filter */}
        <Select
          label="Type"
          name="type"
          value={filters.type || ''}
          onChange={(e) => onFilterChange({ type: e.target.value || null })}
          options={typeOptions}
        />

        {/* Time Period Quick Select */}
        <div>
          <label htmlFor="period" className="block text-sm font-medium text-gray-700 mb-1">
            Period
          </label>
          <select
            id="period"
            onChange={(e) => handleTimePeriodChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Time</option>
            <option value={TIME_PERIODS.TODAY}>Today</option>
            <option value={TIME_PERIODS.THIS_WEEK}>This Week</option>
            <option value={TIME_PERIODS.THIS_MONTH}>This Month</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
      </div>

      {/* Custom Date Range */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            value={filters.startDate || ''}
            onChange={(e) => onFilterChange({ startDate: e.target.value || null })}
            max={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            id="endDate"
            type="date"
            value={filters.endDate || ''}
            onChange={(e) => onFilterChange({ endDate: e.target.value || null })}
            max={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing filtered results
            {filters.category &&
              ` • Category: ${CATEGORIES.find((c) => c.id === filters.category)?.name}`}
            {filters.type && ` • Type: ${filters.type}`}
            {filters.searchQuery && ` • Search: "${filters.searchQuery}"`}
          </p>
        </div>
      )}
    </div>
  );
}

FilterBar.propTypes = {
  filters: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    searchQuery: PropTypes.string,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired,
  hasActiveFilters: PropTypes.bool.isRequired,
  transactions: PropTypes.array.isRequired,
};
