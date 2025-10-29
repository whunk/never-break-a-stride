import { useEffect, useRef, useState } from "react";

interface UseDistanceOptions {
    speed: number;
    started: boolean;
    resetFlag: boolean;
}


export function useDistance({ speed, started, resetFlag }: UseDistanceOptions) {
    const [distance, setDistance] = useState<number>(0);
    const lastUpdateRef = useRef<number | null>(null);
    const speedRef = useRef(speed);
    const startedRef = useRef(started);

    useEffect(() => {
        speedRef.current = speed;
    }, [speed]);

    useEffect(() => {
        startedRef.current = started;
    }, [started]);

    useEffect(() => {

    const interval = setInterval(() => {
        if (!startedRef.current) return;
    
        const now = Date.now();
        if (lastUpdateRef.current !== null) {
            const deltaSeconds = (now - lastUpdateRef.current) / 1000;
            setDistance(prev => prev + speedRef.current * deltaSeconds);
        }

        lastUpdateRef.current = now;
    }, 1000);

    return () => clearInterval(interval);
    }, []);

    useEffect(() => {
    setDistance(0);
    lastUpdateRef.current = null;
    }, [resetFlag]);

    return distance;
}