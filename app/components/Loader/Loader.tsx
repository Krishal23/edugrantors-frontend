import React from 'react';
import { useTheme } from 'next-themes';

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  const { theme } = useTheme();
  const displayMessage = message || "Loading, please wait...";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-white dark:bg-gray-900 opacity-90"></div>
      <div className="relative flex flex-col items-center space-y-6">
        {/* Single Circle Spinner */}
        <div className={`w-16 h-16 border-4 border-t-purple-600 dark:border-t-indigo-500 border-opacity-30 rounded-full animate-spin`}></div>

        {/* Message */}
        <p className={`text-lg font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} animate-pulse`}>
          {displayMessage}
        </p>
      </div>
    </div>
  );
};

export default Loader;
