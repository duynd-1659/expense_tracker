import PropTypes from 'prop-types';

/**
 * Layout component - Main app layout structure
 * @param {Object} props
 * @param {React.ReactNode} props.header - Header content
 * @param {React.ReactNode} props.children - Main content
 * @param {React.ReactNode} props.footer - Footer content (optional)
 */
export const Layout = ({ header, children, footer }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      {header && <header className="bg-white shadow-sm sticky top-0 z-10">{header}</header>}

      {/* Main content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 md:px-6 lg:px-8">{children}</main>

      {/* Footer */}
      {footer && <footer className="bg-white border-t border-gray-200 mt-auto">{footer}</footer>}
    </div>
  );
};

Layout.propTypes = {
  header: PropTypes.node,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
};
