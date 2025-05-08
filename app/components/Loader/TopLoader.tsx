import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface TopLoaderProps {
  isLoading: boolean;
}

const TopLoader: React.FC<TopLoaderProps> = ({ isLoading }) => {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    
    if (isLoading) {
      setVisible(true);
      setProgress(0);
      
      // Start progress animation
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            // Hold at 90% until loading completes
            return 90;
          }
          return prev + (90 - prev) * 0.1;
        });
      }, 100);
    } else {
      // When loading completes
      setProgress(100);
      const timeout = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
      
      return () => clearTimeout(timeout);
    }

    return () => clearInterval(progressInterval);
  }, [isLoading]);

  return (
    <div 
      className={`fixed top-0 left-0 w-full h-1 z-50 transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div 
        className={`h-full ${
          theme === 'dark' ? 'bg-purple-600' : 'bg-indigo-600'
        } transition-all duration-300 ease-out`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default TopLoader;