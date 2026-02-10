import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { getCategoriesByType } from '../../data/categories';
import { TRANSACTION_TYPES } from '../../constants';

/**
 * TransactionForm Component
 * Form for creating and editing transactions
 */
export function TransactionForm({ mode = 'create', initialData, onSubmit, onCancel, isOpen }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialData || {
      amount: '',
      type: TRANSACTION_TYPES.EXPENSE,
      category: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
    },
  });

  const selectedType = watch('type');

  // Reset form when mode or initialData changes
  useEffect(() => {
    if (isOpen) {
      reset(
        initialData || {
          amount: '',
          type: TRANSACTION_TYPES.EXPENSE,
          category: '',
          date: new Date().toISOString().split('T')[0],
          description: '',
        }
      );
    }
  }, [isOpen, initialData, reset]);

  // Get categories based on selected transaction type
  const categoryOptions = getCategoriesByType(selectedType).map((cat) => ({
    value: cat.id,
    label: cat.name,
    icon: cat.icon,
  }));

  const handleFormSubmit = (data) => {
    // Convert amount to number
    const transactionData = {
      ...data,
      amount: parseFloat(data.amount),
    };

    onSubmit(transactionData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {/* Amount */}
      <Input
        label="Amount"
        name="amount"
        type="number"
        step="0.01"
        min="0"
        required
        register={register}
        error={errors.amount?.message}
        placeholder="0.00"
      />

      {/* Transaction Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              value={TRANSACTION_TYPES.EXPENSE}
              {...register('type', { required: true })}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm">Expense</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              value={TRANSACTION_TYPES.INCOME}
              {...register('type', { required: true })}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm">Income</span>
          </label>
        </div>
        {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>}
      </div>

      {/* Category */}
      <Select
        label="Category"
        name="category"
        required
        register={register}
        options={categoryOptions}
        showIcons={true}
        error={errors.category?.message}
      />

      {/* Date */}
      <Input
        label="Date"
        name="date"
        type="date"
        required
        register={register}
        error={errors.date?.message}
        max={new Date().toISOString().split('T')[0]}
      />

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          {...register('description', { maxLength: 200 })}
          rows="3"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Optional notes about this transaction..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse md:flex-row gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel} className="w-full md:w-auto">
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="w-full md:w-auto md:ml-auto"
        >
          {isSubmitting
            ? 'Saving...'
            : mode === 'create'
              ? 'Add Transaction'
              : 'Update Transaction'}
        </Button>
      </div>
    </form>
  );
}
