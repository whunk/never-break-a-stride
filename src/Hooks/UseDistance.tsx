import { useEffect, useRef, useState } from "react";

interface UseDistanceOptions {
    speed: number;
    started: boolean;
    resetFlag: boolean;
}

export function useDistance({ speed, started, resetFlag}: UseDistanceOptions){
    const [distance, setDistance] = useState<number>(0);
    const lastUpdateRef = useRef<number | null>(null);

    useEffect(() => {
        if(!started) return;

        const interval = setInterval(() => {
            const now = Date.now();

            if (lastUpdateRef.current !== null){
                const deltaSeconds = (now - lastUpdateRef.current) / 1000;
                setDistance(prev => prev + speed * deltaSeconds);
            }
            lastUpdateRef.current = now;
        }, 1000);
        
        return () => clearInterval(interval);
    }, [started, speed]);

    useEffect(() => {
        setDistance(0);
        lastUpdateRef.current = null;
    }, [resetFlag, started === false]);
    return distance;
}