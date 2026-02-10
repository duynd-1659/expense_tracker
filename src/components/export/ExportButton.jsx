import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button } from '../common/Button';
import { downloadTransactionsCSV, generateCSVFilename } from '../../utils/exportUtils';

/**
 * ExportButton - Button to export transactions to CSV
 */
export function ExportButton({ transactions, filters }) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);

    try {
      const filename = generateCSVFilename(filters.startDate, filters.endDate);
      downloadTransactionsCSV(transactions, filename);
    } catch (error) {
      console.error('Error exporting transactions:', error);
      alert('Failed to export transactions. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleExport}
      disabled={isExporting || transactions.length === 0}
      className="flex items-center gap-2"
    >
      <span className="text-lg">📥</span>
      {isExporting ? 'Exporting...' : 'Export CSV'}
    </Button>
  );
}

ExportButton.propTypes = {
  transactions: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
};
