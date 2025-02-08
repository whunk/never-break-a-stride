import '../App.css';
import React, { useState, useEffect } from 'react';


const Stopwatch = ( {startStop, reset}) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timerInterval, setTimerInterval] = useState(null);

  useEffect(() => {
    !startStop ? stopStopwatch() : startStopwatch();
}, [startStop]);

useEffect(() => {
    resetStopwatch();
}, [reset]);

  const startStopwatch = () => {
    if (isRunning) return; // Prevent starting multiple intervals
    setIsRunning(true);
    const interval = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 59) {
          setMinutes(prevMinutes => {
            if (prevMinutes === 59) {
              setHours(prevHours => prevHours + 1);
              return 0;
            }
            return prevMinutes + 1;
          });
          return 0;
        }
        return prevSeconds + 1;
      });
    }, 1000);
    setTimerInterval(interval);
  };

  const stopStopwatch = () => {
    clearInterval(timerInterval);
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    clearInterval(timerInterval);
    setIsRunning(false);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  const formatTime = (hours, minutes, seconds) => {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => clearInterval(timerInterval); // Cleanup the interval on unmount
  }, [timerInterval]);

  return (
    <div>
      <h1>Time</h1>
      <h1>{formatTime(hours, minutes, seconds)}</h1>
    </div>
  );
};

export default Stopwatch;