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
      
      // Quickly progress to 30%
      setProgress(30);
      
      // Progress slowly to 90%
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            return 90; // Hold at 90% until loading completes
          }
          // Slow down progress as it gets higher
          const increment = Math.max(0.5, (90 - prev) * 0.1);
          return Math.min(90, prev + increment);
        });
      }, 100);
    } else {
      // When loading completes
      setProgress(100);
      const timeout = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 200); // Quick transition out

      return () => clearTimeout(timeout);
    }

    return () => clearInterval(progressInterval);
  }, [isLoading]);

  return (
    <div 
      className={`fixed top-0 left-0 w-full h-[3px] z-50 transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div 
        className={`h-full ${
          theme === 'dark' ? 'bg-purple-600' : 'bg-indigo-600'
        } transition-all duration-200 ease-out`}
        style={{ 
          width: `${progress}%`,
          boxShadow: '0 0 10px rgba(147, 51, 234, 0.7)'
        }}
      />
    </div>
  );
};

export default TopLoader;