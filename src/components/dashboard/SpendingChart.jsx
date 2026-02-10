import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { getCategoryById } from '../../data/categories';
import { formatCurrency } from '../../utils/currencyUtils';
import { TRANSACTION_TYPES } from '../../constants';

/**
 * SpendingChart - Display spending breakdown by category
 */
export function SpendingChart({ transactions, type = TRANSACTION_TYPES.EXPENSE }) {
  // Filter by transaction type
  const filteredTransactions = transactions.filter((t) => t.type === type);

  // Group by category and calculate totals
  const categoryTotals = filteredTransactions.reduce((acc, transaction) => {
    const categoryId = transaction.category;
    if (!acc[categoryId]) {
      acc[categoryId] = 0;
    }
    acc[categoryId] += transaction.amount;
    return acc;
  }, {});

  // Convert to chart data format
  const chartData = Object.entries(categoryTotals).map(([categoryId, amount]) => {
    const category = getCategoryById(categoryId);
    return {
      name: category?.name || 'Unknown',
      value: amount,
      color: category?.color || '#6B7280',
      icon: category?.icon || '📌',
    };
  });

  // Sort by value descending
  chartData.sort((a, b) => b.value - a.value);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{data.payload.icon}</span>
            <p className="font-semibold text-gray-900">{data.name}</p>
          </div>
          <p className="text-lg font-bold" style={{ color: data.payload.color }}>
            {formatCurrency(data.value)}
          </p>
          <p className="text-sm text-gray-600">
            {(
              (data.value / filteredTransactions.reduce((sum, t) => sum + t.amount, 0)) *
              100
            ).toFixed(1)}
            %
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom legend
  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap gap-3 justify-center mt-4">
        {payload.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-sm text-gray-700">
              {entry.payload.icon} {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {type === TRANSACTION_TYPES.EXPENSE ? 'Spending' : 'Income'} by Category
        </h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-2">📊</div>
          <p className="text-gray-600">
            No {type === TRANSACTION_TYPES.EXPENSE ? 'expenses' : 'income'} to display
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {type === TRANSACTION_TYPES.EXPENSE ? 'Spending' : 'Income'} by Category
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Category list */}
      <div className="mt-6 space-y-2">
        {chartData.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
          >
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm font-medium text-gray-700">
                {item.icon} {item.name}
              </span>
            </div>
            <span className="text-sm font-bold" style={{ color: item.color }}>
              {formatCurrency(item.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

SpendingChart.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
  type: PropTypes.oneOf([TRANSACTION_TYPES.INCOME, TRANSACTION_TYPES.EXPENSE]),
};
