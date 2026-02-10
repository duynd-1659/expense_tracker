/**
 * Input Component
 * Reusable input field with label and error message support
 */
export function Input({
  label,
  error,
  type = 'text',
  register,
  name,
  className = '',
  required = false,
  ...props
}) {
  const inputClasses = `
    w-full px-4 py-2 border rounded-lg 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    disabled:bg-gray-100 disabled:cursor-not-allowed
    ${error ? 'border-red-500' : 'border-gray-300'}
    ${className}
  `;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={name}
        type={type}
        className={inputClasses}
        {...(register ? register(name) : { name })}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
