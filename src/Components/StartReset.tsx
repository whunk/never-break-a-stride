import React, { useEffect, useState, useRef } from 'react';

const StartReset: React.FC<{ started: boolean; resetFlag: boolean }> = ({ started, resetFlag }) => {
    const [time, setTime] = useState(0); // time in seconds
    const intervalRef = useRef<number | null>(null);
    const prevResetRef = useRef(resetFlag);

    // Start/stop the timer
    useEffect(() => {
        if (started) {
            intervalRef.current = setInterval(() => {
                setTime(prev => prev + 1);
            }, 1000);
        } else {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
            }
        } // cleanup
    }, [started]);

    // Reset logic
    useEffect(() => {
        if (prevResetRef.current !== resetFlag) {
            setTime(0);
            prevResetRef.current = resetFlag;
        }
    }, [resetFlag]);

    // Format time (HH:MM:SS)
    const formatTime = () => {
        const hours = Math.floor(time / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <div className="Container">
            <h1>{formatTime()}</h1>
        </div>
    );
};

export default StartReset;