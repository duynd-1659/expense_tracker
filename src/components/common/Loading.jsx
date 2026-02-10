import PropTypes from 'prop-types';

/**
 * Loading - Loading spinner component
 */
export function Loading({ message = 'Loading...', fullScreen = false }) {
  const containerClass = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-90 z-50'
    : 'flex items-center justify-center p-8';

  return (
    <div className={containerClass}>
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-500 mb-4"></div>
        <p className="text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
}

Loading.propTypes = {
  message: PropTypes.string,
  fullScreen: PropTypes.bool,
};
