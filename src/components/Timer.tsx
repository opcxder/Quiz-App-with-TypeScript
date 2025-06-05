import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  startTime: number | null;
  isRunning: boolean;
  onTimeUpdate?: (seconds: number) => void;
}

const Timer: React.FC<TimerProps> = ({ startTime, isRunning, onTimeUpdate }) => {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && startTime) {
      interval = setInterval(() => {
        const currentTime = Date.now();
        const elapsed = Math.floor((currentTime - startTime) / 1000);
        setSeconds(elapsed);
        
        // Callback to parent component
        if (onTimeUpdate) {
          onTimeUpdate(elapsed);
        }
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, startTime, onTimeUpdate]);

  // Format time as MM:SS
  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
      <Clock className="w-5 h-5" />
      <span className="font-mono text-lg font-semibold">
        {formatTime(seconds)}
      </span>
    </div>
  );
};

export default Timer;