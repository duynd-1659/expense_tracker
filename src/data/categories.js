export const CATEGORIES = [
  // Expense Categories
  { id: 'food', name: 'Food', type: 'expense', color: '#EF4444', icon: '🍔' },
  {
    id: 'transportation',
    name: 'Transportation',
    type: 'expense',
    color: '#3B82F6',
    icon: '🚗',
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    type: 'expense',
    color: '#A855F7',
    icon: '🎬',
  },
  { id: 'bills', name: 'Bills', type: 'expense', color: '#F59E0B', icon: '📄' },
  { id: 'shopping', name: 'Shopping', type: 'expense', color: '#EC4899', icon: '🛍️' },
  { id: 'health', name: 'Health', type: 'expense', color: '#10B981', icon: '💊' },
  { id: 'other-expense', name: 'Other', type: 'expense', color: '#6B7280', icon: '📌' },

  // Income Categories
  { id: 'salary', name: 'Salary', type: 'income', color: '#22C55E', icon: '💰' },
  { id: 'freelance', name: 'Freelance', type: 'income', color: '#14B8A6', icon: '💼' },
  { id: 'investment', name: 'Investment', type: 'income', color: '#8B5CF6', icon: '📈' },
  { id: 'other-income', name: 'Other', type: 'income', color: '#84CC16', icon: '💵' },
];

// Helper function to get category by ID
export const getCategoryById = (id) => {
  return CATEGORIES.find((cat) => cat.id === id);
};

// Helper function to get categories by type
export const getCategoriesByType = (type) => {
  return CATEGORIES.filter((cat) => cat.type === type);
};
