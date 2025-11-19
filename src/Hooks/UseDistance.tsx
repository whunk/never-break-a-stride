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
        if (!started) return;

        lastUpdateRef.current = Date.now();

        const interval = setInterval(() => {
            const now = Date.now();
            const delta = (now - lastUpdateRef.current!) / 1000;
            lastUpdateRef.current = now;
            setDistance(prev => prev + delta * speedRef.current);
        }, 1000);

        return () => clearInterval(interval);
    }, [started]);

    useEffect(() => {
        setDistance(0);
        lastUpdateRef.current = null;
    }, [resetFlag]);

    return distance;
}