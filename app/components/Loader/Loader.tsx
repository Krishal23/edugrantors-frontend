import React from 'react';

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  const displayMessage = message || "Loading, please wait...";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <div className="flex flex-col items-center space-y-6">
        {/* Fancy Loader Animation */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
          {/* <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-b-blue-500 rounded-full animate-spin-reverse"></div> */}
        </div>

        {/* Loading Text */}
        <p className="text-lg font-medium text-gray-200 animate-pulse">
          {displayMessage}
        </p>
      </div>
    </div>
  );
};

export default Loader;
