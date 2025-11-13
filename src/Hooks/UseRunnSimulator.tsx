import { useEffect, useState } from "react";

export function useRunnSimulator(started: boolean) {

    const [data, setData] = useState<{ speed: number; distance: number }>({
        speed: 0,
        distance: 0,
    });

    useEffect(() => {
        if (!started) return;

        let distance = 0;
        let speed = 4.5;
        let lastTime = Date.now();

        const interval = setInterval(() => {
            const now = Date.now();
            const deltaTime = (now - lastTime) / 1000;
            lastTime = now;

            speed = Math.max(0, Math.min(4, speed));

            distance += speed * deltaTime;

            setData({ speed, distance })
        }, 500)

        return () => clearInterval(interval);
    }, [started]);
    return data;
}